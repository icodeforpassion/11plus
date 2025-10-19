'use client';

import Link from 'next/link';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/11-plus', label: '11+ Guide' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' }
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-semibold text-primary" aria-label="ElevenSpark home">
          ElevenSpark
        </Link>
        <button
          className="md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <span className="sr-only">Toggle navigation</span>
          ☰
        </button>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-text hover:text-primary">
              {link.label}
            </Link>
          ))}
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Start Free for 7 Days
          </Link>
        </nav>
      </div>
      {open && (
        <nav id="mobile-nav" className="space-y-2 border-t border-slate-100 bg-white px-4 py-3 md:hidden" aria-label="Mobile">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="block text-sm font-medium text-text">
              {link.label}
            </Link>
          ))}
          <Link
            href="/signup"
            className="block w-full rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-white hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Start Free for 7 Days
          </Link>
        </nav>
      )}
    </header>
  );
}
