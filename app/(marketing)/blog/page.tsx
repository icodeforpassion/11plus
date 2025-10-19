import Link from 'next/link';
import { Metadata } from 'next';
import { Navigation } from '../../../components/Navigation';
import { Footer } from '../../../components/Footer';
import { getBlogPosts } from '../../../lib/blog';

export const metadata: Metadata = {
  title: 'Blog | ElevenSpark',
  description: 'Tips on 11+ maths, vocabulary, and building confident study habits.',
  alternates: {
    canonical: 'https://elevenspark.example.com/blog'
  }
};

export default function BlogPage() {
  const posts = getBlogPosts();
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-4xl font-heading font-semibold text-text">Latest guidance for confident 11+ prep</h1>
        <div className="mt-8 space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-slate-500">{new Date(post.date).toLocaleDateString('en-GB')}</p>
              <h2 className="mt-2 text-2xl font-semibold text-text">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm text-slate-600">{post.summary}</p>
              <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-medium text-primary">
                Read article →
              </Link>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
