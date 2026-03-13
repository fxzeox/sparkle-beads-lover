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

  useEffect(() => {
    if (currentSlide >= slides.length) {
      setCurrentSlide(0);
    }
  }, [currentSlide, slides.length]);

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
      <div className="relative h-52 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-amber-100 via-white to-blue-100 shadow-xl sm:h-72 md:h-[360px] lg:h-[420px]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-300 border-t-amber-500" />
        </div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="relative h-52 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-amber-700 shadow-xl sm:h-72 md:h-[360px] lg:h-[420px]">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <h3 className="text-xl font-bold sm:text-2xl">Featured Bracelets</h3>
          <p className="mt-2 max-w-md text-sm text-white/80 sm:text-base">
            Add product images and they will appear here automatically.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-52 sm:h-72 md:h-[360px] lg:h-[420px] rounded-2xl overflow-hidden bg-black shadow-xl">
      {/* Slides */}
      <div className="relative w-full h-full">
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
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to gradient if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/30 p-2 transition-all duration-300 backdrop-blur-sm hover:bg-white/50 md:p-3"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/30 p-2 transition-all duration-300 backdrop-blur-sm hover:bg-white/50 md:p-3"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-8 h-2.5'
                  : 'bg-white/50 hover:bg-white/75 w-2.5 h-2.5'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

    </div>
  );
}
