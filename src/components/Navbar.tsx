'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-white/40 bg-[linear-gradient(180deg,rgba(255,253,248,0.92),rgba(255,249,239,0.78))] backdrop-blur-xl">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-[78px]">
            <Link href="/" className="flex min-w-0 flex-shrink-0 items-center gap-2.5 transition hover:opacity-90 sm:gap-3.5">
            <Image
              src="/brand-images/logo"
              alt="Sparkle Beads Lover logo"
              width={54}
              height={54}
              className="h-12 w-12 object-contain sm:h-[58px] sm:w-[58px]"
              priority
              unoptimized
            />
            <h1 className="font-display max-w-[220px] truncate text-2xl font-semibold leading-none tracking-[0.04em] text-slate-900 sm:max-w-none sm:text-[2rem]">
              Sparkle Beads Lover
            </h1>
            </Link>

            <div className="hidden items-center gap-2 md:flex">
              <Link href="#home" className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/85 hover:text-slate-900 hover:shadow-[0_10px_24px_rgba(25,48,78,0.08)]">
              Home
              </Link>
              <Link href="#products" className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/85 hover:text-slate-900 hover:shadow-[0_10px_24px_rgba(25,48,78,0.08)]">
              Products
              </Link>
              <Link href="#about" className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/85 hover:text-slate-900 hover:shadow-[0_10px_24px_rgba(25,48,78,0.08)]">
              About
              </Link>
              <Link href="#contact" className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/85 hover:text-slate-900 hover:shadow-[0_10px_24px_rgba(25,48,78,0.08)]">
              Contact
              </Link>
            </div>

            <div className="hidden md:block">
              <Link
                href="/admin/login"
                className="rounded-full bg-[linear-gradient(135deg,#284f82,#d6b25a)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(31,79,136,0.18)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_28px_rgba(31,79,136,0.24)] active:scale-95"
              >
                Admin
              </Link>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col gap-1.5 p-2 md:hidden"
            >
              <span
                className={`h-0.5 w-6 bg-slate-700 transition-all ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
              />
              <span
                className={`h-0.5 w-6 bg-slate-700 transition-all ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
              />
              <span
                className={`h-0.5 w-6 bg-slate-700 transition-all ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
            </button>
        </div>

        {isMenuOpen && (
          <div className="pb-4 md:hidden">
              <div className="border-t border-slate-200/70 bg-white/55 px-1 pt-3 backdrop-blur">
                <Link
                  href="#home"
                  className="block rounded-full px-4 py-3 text-sm font-medium text-slate-700 transition-all duration-300 hover:bg-white/85 hover:text-slate-900 hover:shadow-[0_10px_24px_rgba(25,48,78,0.08)]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="#products"
                  className="block rounded-full px-4 py-3 text-sm font-medium text-slate-700 transition-all duration-300 hover:bg-white/85 hover:text-slate-900 hover:shadow-[0_10px_24px_rgba(25,48,78,0.08)]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link
                  href="#about"
                  className="block rounded-full px-4 py-3 text-sm font-medium text-slate-700 transition-all duration-300 hover:bg-white/85 hover:text-slate-900 hover:shadow-[0_10px_24px_rgba(25,48,78,0.08)]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="#contact"
                  className="block rounded-full px-4 py-3 text-sm font-medium text-slate-700 transition-all duration-300 hover:bg-white/85 hover:text-slate-900 hover:shadow-[0_10px_24px_rgba(25,48,78,0.08)]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/admin/login"
                  className="mt-3 block rounded-full bg-[linear-gradient(135deg,#284f82,#d6b25a)] px-6 py-3 text-center text-sm font-semibold text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              </div>
          </div>
        )}
      </div>
    </nav>
  );
}
