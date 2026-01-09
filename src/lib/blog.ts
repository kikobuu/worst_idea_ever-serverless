import fs from 'fs';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'content/blog');
const projectsDirectory = path.join(process.cwd(), 'content/projects/extracted');

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  coverImage?: string;
  content: string; // Markdown content
};

export type BlogMeta = {
  title: { [key: string]: string };
  description: { [key: string]: string };
  date: string;
  tags: string[];
  coverImage?: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  type: string;
  tags: string[];
  demoLicense: string;
  projectLicense: string;
  videoUrl?: string;
  allowDownloadDemo: boolean;
  allowRequestProject: boolean;
  previewImage?: string;
};

export type ProjectMeta = {
  title: { [key: string]: string };
  description: { [key: string]: string };
  type: string;
  tags: string[];
  demoLicense: string;
  projectLicense: string;
  videoUrl?: string;
  allowDownloadDemo: boolean;
  allowRequestProject: boolean;
  previewImage?: string;
};

export type ProjectCategory = {
  title: { [key: string]: string };
  description: { [key: string]: string };
  hasMultipleVersions: boolean;
  versions: { [key: string]: string };
  contentType: string;
  supportedLocales: string[];
};

export type ProjectContent = {
  title: { [key: string]: string };
  description: { [key: string]: string };
  contentType: string;
  version: string;
  assets: string[];
  supportedLocales: string[];
  content: string; // Markdown content
};

export function getPostSlugs() {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }
  return fs.readdirSync(contentDirectory).filter((file) => {
    return fs.statSync(path.join(contentDirectory, file)).isDirectory();
  });
}

export function getPostBySlug(slug: string, locale: string = 'en'): BlogPost | null {
  const realSlug = slug.replace(/\.md$/, '');
  const directory = path.join(contentDirectory, realSlug);
  const metaPath = path.join(directory, 'meta.json');
  const contentPath = path.join(directory, `${locale}.md`);

  if (!fs.existsSync(metaPath) || !fs.existsSync(contentPath)) {
    // Fallback to English if specific locale doesn't exist? 
    // Or return null. For now, let's try fallback to 'en.md' if locale not found.
    if (fs.existsSync(metaPath) && fs.existsSync(path.join(directory, 'en.md'))) {
        // Fallback content, but keep requested locale for meta if possible? 
        // Actually simpler to just return null or let it fail if missing.
        // Let's fallback content to EN if ZH missing.
        if (fs.existsSync(metaPath) && !fs.existsSync(contentPath)) {
             const fallbackContentPath = path.join(directory, 'en.md');
             const fileContents = fs.readFileSync(fallbackContentPath, 'utf8');
             const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8')) as BlogMeta;
             return {
                slug: realSlug,
                title: meta.title[locale] || meta.title['en'],
                description: meta.description[locale] || meta.description['en'],
                date: meta.date,
                tags: meta.tags,
                coverImage: meta.coverImage,
                content: fileContents,
              };
        }
    }
    return null;
  }

  const fileContents = fs.readFileSync(contentPath, 'utf8');
  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8')) as BlogMeta;

  return {
    slug: realSlug,
    title: meta.title[locale] || meta.title['en'],
    description: meta.description[locale] || meta.description['en'],
    date: meta.date,
    tags: meta.tags,
    coverImage: meta.coverImage,
    content: fileContents,
  };
}

export function getAllPosts(locale: string = 'en'): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, locale))
    .filter((post): post is BlogPost => post !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

// Project-related functions
export function getProjectSlugs() {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }
  return fs.readdirSync(projectsDirectory).filter((file) => {
    return fs.statSync(path.join(projectsDirectory, file)).isDirectory();
  });
}

export function getProjectBySlug(slug: string, locale: string = 'en'): Project | null {
  const directory = path.join(projectsDirectory, slug);
  const metaPath = path.join(directory, 'pmeta.json');

  if (!fs.existsSync(metaPath)) {
    return null;
  }

  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8')) as ProjectMeta;

  return {
    slug,
    title: meta.title[locale] || meta.title['en'],
    description: meta.description[locale] || meta.description['en'],
    type: meta.type,
    tags: meta.tags,
    demoLicense: meta.demoLicense,
    projectLicense: meta.projectLicense,
    videoUrl: meta.videoUrl,
    allowDownloadDemo: meta.allowDownloadDemo,
    allowRequestProject: meta.allowRequestProject,
    previewImage: meta.previewImage,
  };
}

export function getProjectCategories(slug: string) {
  const projectDirectory = path.join(projectsDirectory, slug);
  if (!fs.existsSync(projectDirectory)) {
    return [];
  }

  return fs.readdirSync(projectDirectory).filter((file) => {
    const fullPath = path.join(projectDirectory, file);
    return fs.statSync(fullPath).isDirectory() && fs.existsSync(path.join(fullPath, 'cmeta.json'));
  });
}

export function getProjectCategory(slug: string, category: string): ProjectCategory | null {
  const categoryPath = path.join(projectsDirectory, slug, category);
  const cmetaPath = path.join(categoryPath, 'cmeta.json');

  if (!fs.existsSync(cmetaPath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(cmetaPath, 'utf8')) as ProjectCategory;
}

export function getProjectContent(slug: string, category: string, version: string, locale: string = 'en'): ProjectContent | null {
  const contentPath = path.join(projectsDirectory, slug, category, version, `${locale}.md`);
  const cmetaPath = path.join(projectsDirectory, slug, category, version, 'cmeta.json');

  if (!fs.existsSync(contentPath) || !fs.existsSync(cmetaPath)) {
    // Fallback to English if specific locale doesn't exist
    if (locale !== 'en' && fs.existsSync(path.join(projectsDirectory, slug, category, version, 'en.md'))) {
      return getProjectContent(slug, category, version, 'en');
    }
    return null;
  }

  const cmeta = JSON.parse(fs.readFileSync(cmetaPath, 'utf8'));
  const content = fs.readFileSync(contentPath, 'utf8');

  return {
    ...cmeta,
    content,
  };
}

export function getAllProjects(locale: string = 'en'): Project[] {
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => getProjectBySlug(slug, locale))
    .filter((project): project is Project => project !== null);
  return projects;
}
