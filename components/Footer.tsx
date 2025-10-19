import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <p>&copy; {new Date().getFullYear()} ElevenSpark. All rights reserved.</p>
        <nav className="flex flex-wrap gap-4" aria-label="Footer">
          <Link href="/privacy" className="hover:text-primary">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-primary">
            Terms
          </Link>
          <Link href="/accessibility" className="hover:text-primary">
            Accessibility
          </Link>
          <Link href="/faq" className="hover:text-primary">
            FAQ
          </Link>
        </nav>
      </div>
    </footer>
  );
}
