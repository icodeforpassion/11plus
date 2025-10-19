import fs from 'fs';
import path from 'path';

export interface BlogPostMeta {
  slug: string;
  title: string;
  summary: string;
  date: string;
}

const blogDir = path.join(process.cwd(), 'content', 'blog');

function parseFrontmatter(content: string) {
  const match = /^---\n([\s\S]+?)\n---/m.exec(content);
  if (!match) return {} as Record<string, string>;
  const lines = match[1].split('\n');
  const data: Record<string, string> = {};
  for (const line of lines) {
    const [key, ...rest] = line.split(':');
    if (!key) continue;
    data[key.trim()] = rest.join(':').trim();
  }
  return data;
}

export function getBlogPosts(): BlogPostMeta[] {
  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith('.md'));
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
      const data = parseFrontmatter(content);
      return {
        slug,
        title: data.title || slug,
        summary: data.summary || '',
        date: data.date || new Date().toISOString()
      } satisfies BlogPostMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string) {
  const filePath = path.join(blogDir, `${slug}.md`);
  const content = fs.readFileSync(filePath, 'utf-8');
  const data = parseFrontmatter(content);
  const body = content.replace(/^---[\s\S]+?---\n/, '');
  return {
    ...data,
    slug,
    body
  };
}
