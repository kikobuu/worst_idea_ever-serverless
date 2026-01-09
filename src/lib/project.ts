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
  title: { [key: string]: string };
  description: { [key: string]: string };
  hasMultipleVersions: boolean;
  versions: { [key: string]: string };
};

export type ContentDoc = {
  name: string;
  meta: ContentMeta;
  versions: { version: string; filePath: string; content: string; date: string }[];
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

    const contentDocs = getProjectContentDocs(realSlug, locale) ?? undefined;

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

export function getProjectContentDocs(slug: string, locale: string = 'en'): ContentDoc[] | null {
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
          
          const versions: { version: string; filePath: string; content: string; date: string }[] = [];
          
          // Check for version subdirectories (new structure)
          const versionDirs = files.filter(file => {
            const subDirPath = path.join(itemPath, file);
            return fs.statSync(subDirPath).isDirectory() && file.startsWith('v');
          });
          
          if (versionDirs.length > 0) {
            // New structure: versions are in subdirectories
            for (const versionDir of versionDirs) {
              const version = versionDir.replace(/^v/, ''); // Remove 'v' prefix
              const versionKey = `VER ${version}`;
              const versionPath = path.join(itemPath, versionDir);
              
              if (meta.versions[versionKey]) {
                // Find markdown file in the version directory for the requested locale
                const versionFiles = fs.readdirSync(versionPath);
                
                // Try to find the file for the requested locale first
                let mdFile = versionFiles.find(file => 
                  file === `${locale}.md` && !file.endsWith('.refused.md')
                );
                
                // If the requested locale doesn't exist, fall back to English
                if (!mdFile) {
                  mdFile = versionFiles.find(file => 
                    file === 'en.md' && !file.endsWith('.refused.md')
                  );
                }
                
                // If English doesn't exist either, try any other Markdown file
                if (!mdFile) {
                  mdFile = versionFiles.find(file => 
                    file.endsWith('.md') && !file.endsWith('.refused.md')
                  );
                }
                
                if (mdFile) {
                  const mdFilePath = path.join(versionPath, mdFile);
                  const stat = fs.statSync(mdFilePath);
                  const date = new Date(stat.birthtime).toISOString().split('T')[0];
                  
                  versions.push({
                    version,
                    filePath: mdFilePath,
                    content: fs.readFileSync(mdFilePath, 'utf8'),
                    date
                  });
                } else {
                  console.warn(`No markdown file found in version directory ${versionPath}`);
                }
              } else {
                console.warn(`Version ${version} not defined in cmeta.json for ${item}`);
              }
            }
          } else {
            // Fallback to old structure for backward compatibility
            const mdFiles = files.filter(file => file.endsWith('.md') && !file.endsWith('.refused.md'));
            
            for (const mdFile of mdFiles) {
              const versionMatch = mdFile.match(/_v(.+)\.md$/);
              
              if (versionMatch) {
                const version = versionMatch[1];
                const versionKey = `VER ${version}`;
                const mdFilePath = path.join(itemPath, mdFile);
                const stat = fs.statSync(mdFilePath);
                const date = new Date(stat.birthtime).toISOString().split('T')[0];
                
                if (meta.versions[versionKey]) {
                  versions.push({
                    version,
                    filePath: mdFilePath,
                    content: fs.readFileSync(mdFilePath, 'utf8'),
                    date
                  });
                } else {
                  console.warn(`Version ${version} not defined in cmeta.json for ${item}`);
                  const refusedPath = path.join(itemPath, `${mdFile}.refused`);
                  fs.renameSync(mdFilePath, refusedPath);
                }
              } else if (!meta.hasMultipleVersions && mdFiles.length === 1) {
                const mdFilePath = path.join(itemPath, mdFile);
                const stat = fs.statSync(mdFilePath);
                const date = new Date(stat.birthtime).toISOString().split('T')[0];
                
                versions.push({
                  version: '1.0',
                  filePath: mdFilePath,
                  content: fs.readFileSync(mdFilePath, 'utf8'),
                  date
                });
              } else {
                console.warn(`Invalid markdown file name format: ${mdFile} in ${item}`);
                const refusedPath = path.join(itemPath, `${mdFile}.refused`);
                fs.renameSync(path.join(itemPath, mdFile), refusedPath);
              }
            }
          }

          if (versions.length > 0) {
            // Sort versions in descending order (newest first)
            versions.sort((a, b) => {
              const aParts = a.version.split('.').map(Number);
              const bParts = b.version.split('.').map(Number);
              
              for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
                const aPart = aParts[i] || 0;
                const bPart = bParts[i] || 0;
                
                if (aPart > bPart) return -1;
                if (aPart < bPart) return 1;
              }
              
              return 0;
            });
            
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
