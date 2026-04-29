"use client";

import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50/40 to-blue-50/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-700 to-amber-500 bg-clip-text text-transparent">
            About Sparkle Beads Lover
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
            Artisan craftsmanship meets modern design in every bracelet
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl bg-gray-100 overflow-hidden shadow-md">
              <Image
                src="/brand-images/full"
                alt="Sparkle Beads Lover full showcase"
                fill
                className="object-cover"
                sizes="320px"
                unoptimized
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-5 sm:space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Our Story</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Sparkle Beads Lover was founded with a passion for creating beautiful, high-quality bracelets that bring joy to people's lives. Every piece is handcrafted with attention to detail and love.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Why Choose Us</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-sm font-bold text-amber-400 flex-shrink-0">✓</span>
                  <span className="text-gray-600 text-sm sm:text-base">Handcrafted with premium materials</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sm font-bold text-amber-400 flex-shrink-0">✓</span>
                  <span className="text-gray-600 text-sm sm:text-base">Unique designs created with care</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sm font-bold text-amber-400 flex-shrink-0">✓</span>
                  <span className="text-gray-600 text-sm sm:text-base">Fast and reliable delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sm font-bold text-amber-400 flex-shrink-0">✓</span>
                  <span className="text-gray-600 text-sm sm:text-base">Excellent customer service</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/923016555942"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 sm:px-8 py-2.5 rounded-full bg-gradient-to-r from-blue-700 to-amber-500 text-white text-sm font-semibold transition-all hover:shadow-md hover:scale-105 active:scale-95"
              >
                Contact Us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
