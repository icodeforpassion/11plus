import { MetadataRoute } from 'next';
import { getBlogPosts } from './lib/blog';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://elevenspark.example.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '/',
    '/pricing',
    '/faq',
    '/blog',
    '/signup',
    '/login',
    '/dashboard/student',
    '/dashboard/parent',
    '/practice/maths',
    '/practice/english',
    '/mock',
    '/mock/maths',
    '/mock/english',
    '/vocab',
    '/admin',
    '/privacy',
    '/terms',
    '/accessibility',
    '/11-plus',
    '/11-plus/maths',
    '/11-plus/maths/fractions',
    '/11-plus/english',
    '/11-plus/english/vocabulary'
  ];

  const blogRoutes = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : undefined,
    changeFrequency: 'monthly' as const
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      changeFrequency: 'weekly' as const,
      priority: route === '/' ? 1 : 0.6
    })),
    ...blogRoutes
  ];
}
