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
