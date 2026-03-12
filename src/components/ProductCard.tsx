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
      : 'https://www.tiktok.com/@sparklebeat';
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
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-amber-100/80">
      {/* Image Container */}
      <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-gray-100 cursor-zoom-in" onClick={() => setShowModal(true)}>
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
      <div className="space-y-2.5 p-4 sm:p-5">
        {/* Product Name */}
        <h3 className="line-clamp-2 text-sm sm:text-base font-bold text-gray-800 group-hover:text-amber-600 transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="line-clamp-2 text-xs sm:text-sm text-gray-500">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="pt-1">
          <span className="text-base sm:text-lg font-bold text-amber-500">
            Rs {product.price.toLocaleString()}
          </span>
        </div>

        {/* TikTok Button */}
        <Link
          href={tiktokLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-full bg-gradient-to-r from-blue-700 to-amber-500 py-2.5 px-4 text-center font-semibold text-white text-xs transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95 mt-3"
        >
          <span className="flex items-center justify-center gap-2">
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.445 0-2.816-.356-4.038-1.03L2.504 3.87l1.143 3.776C2.596 9.267 2.154 10.703 2.154 12.133c0 3.663 2.905 6.648 6.477 6.648 1.735 0 3.367-.675 4.589-1.897 1.222-1.223 1.894-2.854 1.894-4.589 0-3.573-2.905-6.648-6.477-6.648" />
            </svg>
            See More on TikTok
          </span>
        </Link>
        <p className="text-[11px] text-center text-gray-500">
          For more detail of this item, click on TikTok.
        </p>
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
