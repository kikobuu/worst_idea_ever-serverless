import fs from 'fs';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'content/blog');

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
