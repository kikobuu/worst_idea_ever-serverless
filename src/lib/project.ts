import fs from 'fs';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'content/projects/extracted');

export type ProjectMeta = {
  title: { [key: string]: string };
  type: string;
  description: { [key: string]: string };
  tags: string[];
  demoLicense: string;
  projectLicense: string;
  videoUrl?: string;
  allowDownloadDemo: boolean;
  allowRequestProject: boolean;
  previewImage?: string;
};

export type ContentMeta = {
  title: string;
  description: string;
  hasMultipleVersions: boolean;
  versions: { [key: string]: string };
};

export type ContentDoc = {
  name: string;
  meta: ContentMeta;
  versions: { version: string; filePath: string; content: string }[];
};

export type Project = {
  slug: string;
  title: string;
  type: string;
  description: string;
  tags: string[];
  demoLicense: string;
  projectLicense: string;
  videoUrl?: string;
  allowDownloadDemo: boolean;
  allowRequestProject: boolean;
  previewImage?: string;
  content?: string;
  contentDocs?: ContentDoc[];
};

export function getProjectSlugs() {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }
  return fs.readdirSync(contentDirectory).filter((file) => {
    return fs.statSync(path.join(contentDirectory, file)).isDirectory();
  });
}

export function getProjectBySlug(slug: string, locale: string = 'en'): Project | null {
  const realSlug = slug.replace(/\.md$/, '');
  const directory = path.join(contentDirectory, realSlug);
  const metaPath = path.join(directory, 'pmeta.json');

  if (!fs.existsSync(metaPath)) {
    return null;
  }

  try {
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8')) as ProjectMeta;
    const contentPath = path.join(directory, `${locale}.md`);
    let content = '';

    if (fs.existsSync(contentPath)) {
      content = fs.readFileSync(contentPath, 'utf8');
    }

    const contentDocs = getProjectContentDocs(realSlug) ?? undefined;

    return {
      slug: realSlug,
      title: meta.title[locale] || meta.title['en'],
      type: meta.type,
      description: meta.description[locale] || meta.description['en'],
      tags: meta.tags,
      demoLicense: meta.demoLicense,
      projectLicense: meta.projectLicense,
      videoUrl: meta.videoUrl,
      allowDownloadDemo: meta.allowDownloadDemo,
      allowRequestProject: meta.allowRequestProject,
      previewImage: meta.previewImage,
      content,
      contentDocs
    };
  } catch (error) {
    console.error('Error parsing project meta:', error);
    return null;
  }
}

export function getAllProjects(locale: string = 'en'): Project[] {
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => getProjectBySlug(slug, locale))
    .filter((project): project is Project => project !== null);
  return projects;
}

export function getProjectContentDocs(slug: string): ContentDoc[] | null {
  const realSlug = slug.replace(/\.md$/, '');
  const directory = path.join(contentDirectory, realSlug);

  if (!fs.existsSync(directory)) {
    return null;
  }

  try {
    const items = fs.readdirSync(directory);
    const contentDocs: ContentDoc[] = [];

    for (const item of items) {
      const itemPath = path.join(directory, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        const cmetaPath = path.join(itemPath, 'cmeta.json');
        
        if (fs.existsSync(cmetaPath)) {
          const meta = JSON.parse(fs.readFileSync(cmetaPath, 'utf8')) as ContentMeta;
          const files = fs.readdirSync(itemPath);
          const mdFiles = files.filter(file => file.endsWith('.md') && !file.endsWith('.refused.md'));
          
          const versions: { version: string; filePath: string; content: string }[] = [];
          
          for (const mdFile of mdFiles) {
            const versionMatch = mdFile.match(/_v(.+)\.md$/);
            
            if (versionMatch) {
              const version = versionMatch[1];
              const versionKey = `VER ${version}`;
              
              if (meta.versions[versionKey]) {
                versions.push({
                  version,
                  filePath: path.join(itemPath, mdFile),
                  content: fs.readFileSync(path.join(itemPath, mdFile), 'utf8')
                });
              } else {
                console.warn(`Version ${version} not defined in cmeta.json for ${item}`);
                const refusedPath = path.join(itemPath, `${mdFile}.refused`);
                fs.renameSync(path.join(itemPath, mdFile), refusedPath);
              }
            } else if (!meta.hasMultipleVersions && mdFiles.length === 1) {
              versions.push({
                version: '1.0',
                filePath: path.join(itemPath, mdFile),
                content: fs.readFileSync(path.join(itemPath, mdFile), 'utf8')
              });
            } else {
              console.warn(`Invalid markdown file name format: ${mdFile} in ${item}`);
              const refusedPath = path.join(itemPath, `${mdFile}.refused`);
              fs.renameSync(path.join(itemPath, mdFile), refusedPath);
            }
          }

          if (versions.length > 0) {
            contentDocs.push({
              name: item,
              meta,
              versions
            });
          }
        }
      }
    }

    return contentDocs;
  } catch (error) {
    console.error('Error parsing project content docs:', error);
    return null;
  }
}
