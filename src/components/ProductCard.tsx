'use client';

import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const tiktokLink =
    product.whatsapp?.startsWith('http')
      ? product.whatsapp
      : 'https://www.tiktok.com/@sparklebeads35?_r=1&_t=ZS-94Hlo4aMPEw';
  const [showModal, setShowModal] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [modalImageLoaded, setModalImageLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Prevent background scroll to avoid visual jump/flicker when modal opens.
    if (!showModal) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showModal]);

  useEffect(() => {
    if (showModal) {
      setModalImageLoaded(false);
    }
  }, [showModal]);

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-amber-100/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image Container */}
      <div className="relative h-32 sm:h-36 w-full overflow-hidden bg-gray-100 cursor-zoom-in" onClick={() => setShowModal(true)}>
        {!imageError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">💎</div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Sale Badge */}
        <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-2.5 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          New
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:p-4">
        {/* Product Name */}
        <h3 className="line-clamp-2 text-sm sm:text-base font-bold leading-tight text-gray-800 transition-colors group-hover:text-amber-600">
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="line-clamp-2 text-[11px] sm:text-sm leading-snug text-gray-500">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div>
          <span className="text-base font-bold text-amber-500 sm:text-lg">
            Rs {product.price.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-center gap-1 pt-0.5">
          <p className="text-center text-[10px] leading-tight text-gray-500 sm:text-[11px]">
            More details on TikTok
          </p>
          <Link
            href={tiktokLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open TikTok"
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] bg-[#101010] shadow-sm transition-transform duration-200 hover:scale-105"
          >
            <svg className="h-3 w-3" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#25F4EE" d="M14.4 5.1v8.4a2.3 2.3 0 1 1-1.7-2.2V9.2a4.7 4.7 0 1 0 3.9 4.6V8.7a6.6 6.6 0 0 0 3.4 1V7.5a4.1 4.1 0 0 1-2.6-1.1 4.6 4.6 0 0 1-1-1.3h-2Z"/>
              <path fill="#FE2C55" d="M13.8 4.5v8.4a2.3 2.3 0 1 1-1.7-2.2V8.6a4.7 4.7 0 1 0 3.9 4.6V8.1a6.6 6.6 0 0 0 3.4 1V6.9a4.1 4.1 0 0 1-2.6-1.1 4.6 4.6 0 0 1-1-1.3h-2Z"/>
              <path fill="#fff" d="M14.1 4.8v8.4a2.3 2.3 0 1 1-1.7-2.2V8.9a4.7 4.7 0 1 0 3.9 4.6V8.4a6.6 6.6 0 0 0 3.4 1V7.2a4.1 4.1 0 0 1-2.6-1.1 4.6 4.6 0 0 1-1-1.3h-2Z"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* Image Modal */}
      {isMounted &&
        showModal &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/85 z-[100] flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <div
              className="relative flex items-center justify-center max-w-4xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {!modalImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-200 border-t-amber-500" />
                </div>
              )}
              <img
                src={product.image}
                alt={product.name}
                draggable={false}
                className={`max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl cursor-zoom-out select-none transition-opacity duration-200 ${
                  modalImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setModalImageLoaded(true)}
                onError={() => {
                  setImageError(true);
                  setModalImageLoaded(true);
                }}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(false);
                }}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2.5 bg-white hover:bg-gray-200 rounded-full transition-all shadow-lg"
                title="Close"
                aria-label="Close image"
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
