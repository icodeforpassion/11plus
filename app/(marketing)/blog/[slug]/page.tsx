import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Navigation } from '../../../../components/Navigation';
import { Footer } from '../../../../components/Footer';
import { getBlogPost, getBlogPosts } from '../../../../lib/blog';
import Markdown from 'markdown-to-jsx';

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  try {
    const post = getBlogPost(params.slug);
    return {
      title: `${post.title} | ElevenSpark Blog`,
      description: post.summary || '11+ preparation tips',
      alternates: {
        canonical: `https://elevenspark.example.com/blog/${params.slug}`
      }
    };
  } catch (error) {
    return {};
  }
}

export default function BlogPostPage({ params }: Props) {
  try {
    const post = getBlogPost(params.slug);
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="mx-auto max-w-3xl px-4 py-16">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            {new Date(post.date ?? Date.now()).toLocaleDateString('en-GB')}
          </p>
          <h1 className="mt-2 text-4xl font-heading font-semibold text-text">{post.title}</h1>
          <article className="prose prose-slate mt-6 max-w-none">
            <Markdown>{post.body}</Markdown>
          </article>
          <p className="mt-8 text-sm text-slate-500">
            ElevenSpark supports confident learning — no pass guarantees, just steady progress.
          </p>
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
