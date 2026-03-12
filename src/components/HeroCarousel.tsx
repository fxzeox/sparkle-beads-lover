'use client';

import { useState, useEffect } from 'react';

interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  description: string;
}

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Default carousel images - users can easily replace these URLs
  const slides: CarouselSlide[] = [
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&h=600&fit=crop',
      title: 'Premium Bracelet Collection',
      description: 'Handcrafted with love and care'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&h=600&fit=crop',
      title: 'Elegant Designs',
      description: 'Perfect for any occasion'
    },

    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=1200&h=600&fit=crop',
      title: 'Luxury Details',
      description: 'Crafted for a premium look'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1200&h=600&fit=crop',
      title: 'Everyday Glamour',
      description: 'Beautiful styles for daily wear'
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000); // Change slide every 5 seconds

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
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-white/30 hover:bg-white/50 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-white/30 hover:bg-white/50 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'bg-white w-8 h-2.5'
                : 'bg-white/50 hover:bg-white/75 w-2.5 h-2.5'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
}
