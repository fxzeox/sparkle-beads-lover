'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import { Product } from '@/types';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection products={products} loading={loading} />

      {/* Products Section */}
      <section id="products" className="py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50/35 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-700 to-amber-500 bg-clip-text text-transparent">
              Featured Collection
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
              Discover our handcrafted bracelets, each piece designed with elegance and care
            </p>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex items-center justify-center min-h-96">
              <div className="animate-spin">
                <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-500 rounded-full" />
              </div>
            </div>
          ) : error ? (
            <div className="rounded-lg bg-red-50 p-6 text-center text-red-800">
              <p className="font-semibold">Unable to load products</p>
              <p className="text-sm mt-2">{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-lg bg-amber-50 p-6 text-center text-amber-800">
              <p className="font-semibold">No products available yet</p>
              <p className="text-sm mt-2">Check back soon for new bracelets!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
              {products.map((product) => (
                <div key={product._id} className="animate-slide-up">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <AboutSection />
      <Footer />

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out;
        }
      `}</style>
    </main>
  );
}
