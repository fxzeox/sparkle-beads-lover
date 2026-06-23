'use client';

import HeroCarousel from './HeroCarousel';
import { Product } from '@/types';

interface HeroSectionProps {
  products: Product[];
  loading: boolean;
}

export default function HeroSection({ products, loading }: HeroSectionProps) {
  const featuredCount = loading ? 'Fresh arrivals' : `${Math.max(products.length, 6)}+ unique styles`;

  return (
    <section id="home" className="relative isolate overflow-hidden px-4 pb-16 pt-6 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24 lg:pt-8">
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(circle_at_20%_20%,rgba(108,166,221,0.26),transparent_26%),radial-gradient(circle_at_80%_0%,rgba(216,177,91,0.2),transparent_22%),linear-gradient(180deg,rgba(255,253,248,0.98),rgba(255,249,239,0.82)_42%,rgba(243,247,251,0.42)_100%)]" />
      <div className="absolute left-[8%] top-24 -z-10 h-24 w-24 rounded-full bg-white/45 blur-3xl" />
      <div className="absolute right-[10%] top-16 -z-10 h-40 w-40 rounded-full bg-[#d8b15b]/20 blur-3xl" />

      <div className="mx-auto grid max-w-[1380px] items-center gap-10 lg:min-h-[calc(100vh-7rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(520px,0.95fr)] lg:gap-12">
        <div className="max-w-2xl animate-fade-up">
          <div className="mb-5 inline-flex items-center rounded-full bg-white/80 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.36em] text-slate-600 shadow-[0_12px_30px_rgba(25,48,78,0.08)] backdrop-blur">
            Handcrafted Luxury
          </div>

          <h2 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl xl:text-[5.6rem]">
            Bracelets that feel soft, polished, and unforgettable.
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            Artisan-crafted jewelry designed for those who appreciate quality, style, and uniqueness. Each bracelet tells a story.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/923016555942"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#1f4f88,#d8b15b)] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_18px_38px_rgba(31,79,136,0.22)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(31,79,136,0.3)] active:scale-95"
            >
              Shop on WhatsApp
            </a>
            <a
              href="#products"
              className="inline-flex items-center justify-center rounded-full bg-white/80 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-slate-800 shadow-[0_14px_32px_rgba(25,48,78,0.1)] backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white"
            >
              Explore Collection
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-[28px] bg-white/80 px-5 py-4 shadow-[0_18px_40px_rgba(25,48,78,0.09)] backdrop-blur">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-slate-500">Collection</p>
              <p className="mt-2 font-display text-2xl font-semibold text-slate-900">{featuredCount}</p>
            </div>
            <div className="rounded-[28px] bg-white/80 px-5 py-4 shadow-[0_18px_40px_rgba(25,48,78,0.09)] backdrop-blur">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-slate-500">Crafted</p>
              <p className="mt-2 font-display text-2xl font-semibold text-slate-900">By hand</p>
            </div>
            <div className="rounded-[28px] bg-white/80 px-5 py-4 shadow-[0_18px_40px_rgba(25,48,78,0.09)] backdrop-blur">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-slate-500">Style</p>
              <p className="mt-2 font-display text-2xl font-semibold text-slate-900">Blue & Gold</p>
            </div>
          </div>
        </div>

        <div className="relative animate-fade-up lg:pl-4" style={{ animationDelay: '120ms' }}>
          <div className="absolute -left-6 top-10 hidden h-24 w-24 rounded-full bg-white/70 blur-2xl lg:block" />
          <div className="absolute -right-4 bottom-10 hidden h-28 w-28 rounded-full bg-[#6ca6dd]/20 blur-3xl lg:block" />
          <HeroCarousel products={products} loading={loading} />

          <div className="animate-float-gentle absolute -bottom-5 left-4 rounded-[26px] bg-white/82 px-5 py-4 shadow-[0_18px_40px_rgba(25,48,78,0.12)] backdrop-blur sm:left-8">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-slate-500">Signature Mood</p>
            <p className="mt-2 font-display text-2xl font-semibold text-slate-900">Sparkle with grace</p>
          </div>
        </div>
      </div>
    </section>
  );
}
