'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';

interface CarouselSlide {
  id: string;
  image: string;
  title: string;
  description: string;
}

interface HeroCarouselProps {
  products: Product[];
  loading: boolean;
}

export default function HeroCarousel({ products, loading }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: CarouselSlide[] = products.slice(0, 6).map((product) => ({
    id: product._id,
    image: product.image,
    title: product.name,
    description: product.description || 'Handcrafted bracelet collection',
  }));
  const activeSlide = slides.length > 0 ? currentSlide % slides.length : 0;

  // Auto-play carousel
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (loading) {
    return (
      <div className="relative h-[320px] w-full overflow-hidden bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(242,248,255,0.88),rgba(252,245,231,0.88))] shadow-[0_24px_60px_rgba(25,48,78,0.16)] sm:h-[420px] lg:h-[620px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(108,166,221,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(216,177,91,0.24),transparent_22%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#d8b15b]/25 border-t-[#d8b15b]" />
          </div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="relative h-[320px] w-full overflow-hidden bg-[linear-gradient(145deg,#1d3558,#2b5c8b,#d8b15b)] shadow-[0_24px_60px_rgba(25,48,78,0.16)] sm:h-[420px] lg:h-[620px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_30%)]" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
            <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.42em] text-white/70">Coming Soon</p>
            <h3 className="font-display text-4xl font-semibold sm:text-5xl">Featured Bracelets</h3>
            <p className="mt-3 max-w-md text-sm leading-7 text-white/78 sm:text-base">
              Add product images and they will appear here automatically.
            </p>
          </div>
      </div>
    );
  }

  return (
    <div className="relative h-[320px] w-full overflow-hidden bg-slate-950 shadow-[0_24px_60px_rgba(25,48,78,0.16)] sm:h-[420px] lg:h-[620px]">
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="animate-slow-zoom h-full w-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,19,35,0.1),rgba(9,19,35,0.22)_38%,rgba(9,19,35,0.56)_100%)]" />
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7">
        <div className="max-w-2xl rounded-[24px] bg-white/12 px-5 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-md sm:px-6 sm:py-5">
          <h3 className="font-display text-2xl font-semibold leading-tight text-white sm:text-4xl">
            {slides[activeSlide]?.title}
          </h3>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/18 p-3 text-white shadow-[0_16px_36px_rgba(0,0,0,0.18)] transition-all duration-300 backdrop-blur-md hover:bg-white/28 sm:left-6 md:p-4"
            aria-label="Previous slide"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/18 p-3 text-white shadow-[0_16px_36px_rgba(0,0,0,0.18)] transition-all duration-300 backdrop-blur-md hover:bg-white/28 sm:right-6 md:p-4"
            aria-label="Next slide"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {slides.length > 1 && (
        <div className="absolute bottom-5 right-5 z-20 flex gap-2 sm:bottom-7 sm:right-7">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === activeSlide
                  ? 'h-2.5 w-8 bg-white'
                  : 'h-2.5 w-2.5 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
