'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import axios from 'axios';

const DESCRIPTION_WORD_LIMIT = 12;

interface ProductFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  initialData?: {
    _id: string;
    name: string;
    price: string;
    description: string;
    image: string;
    whatsapp: string;
  };
  adminToken: string;
}

export default function ProductForm({ onSuccess, onCancel, initialData, adminToken }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    price: initialData?.price || '',
    description: initialData?.description || '',
    whatsapp: initialData?.whatsapp || 'https://www.tiktok.com/@sparklebeads35?_r=1&_t=ZS-94Hlo4aMPEw',
    image: initialData?.image || '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const descriptionWordCount = formData.description
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'description') {
      const nextWordCount = value.trim().split(/\s+/).filter(Boolean).length;

      if (nextWordCount > DESCRIPTION_WORD_LIMIT) {
        return;
      }

      setFormData((prev) => ({ ...prev, description: value }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      setError('Cloudinary config missing in .env');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formDataForUpload = new FormData();
      formDataForUpload.append('file', file);
      formDataForUpload.append('upload_preset', uploadPreset);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formDataForUpload
      );

      const imageUrl = response.data.secure_url;
      setFormData((prev) => ({ ...prev, image: imageUrl }));
      setImagePreview(imageUrl);
    } catch (err: any) {
      setError('Upload failed. Check your internet or Cloudinary settings.');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.name || !formData.price || !formData.image || !formData.whatsapp) {
        throw new Error('Please fill in all required fields');
      }

      if (descriptionWordCount > DESCRIPTION_WORD_LIMIT) {
        throw new Error(`Description must be ${DESCRIPTION_WORD_LIMIT} words or fewer`);
      }

      const payload = {
        name: formData.name,
        price: parseInt(formData.price),
        description: formData.description.trim(),
        image: formData.image,
        whatsapp: formData.whatsapp.trim(),
      };

      const config = { headers: { Authorization: `Bearer ${adminToken}` } };

      if (initialData?._id) {
        await axios.put(`/api/products?id=${initialData._id}`, payload, config);
      } else {
        await axios.post('/api/products', payload, config);
      }

      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-5 bg-gradient-to-r from-blue-700 to-amber-500 bg-clip-text text-xl font-bold text-transparent">
          {initialData ? 'Edit Product' : 'Add New Product'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800 border border-red-100">{error}</div>}

          {/* Image Upload Preview */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Product Image *</label>
            <div
              onClick={() => !uploading && fileInputRef.current?.click()}
              className="relative h-44 w-full cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-amber-200 bg-amber-50/50 transition-all hover:bg-amber-50"
            >
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  unoptimized={true} // FIX: Prevents local timeout error
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2">
                  <svg className="h-8 w-8 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm font-medium text-amber-500">Click to upload image</p>
                </div>
              )}
              
              {uploading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80">
                  <div className="h-7 w-7 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"></div>
                  <p className="mt-2 text-xs font-semibold text-amber-700">Uploading...</p>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} disabled={uploading} className="hidden" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="name" className="block text-xs font-semibold text-gray-600">Product Name *</label>
              <input id="name" type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100" />
            </div>

            <div className="space-y-1">
              <label htmlFor="price" className="block text-xs font-semibold text-gray-600">Price (Rs) *</label>
              <input id="price" type="number" name="price" required value={formData.price} onChange={handleInputChange} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100" />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="whatsapp" className="block text-xs font-semibold text-gray-600">TikTok Link *</label>
            <input id="whatsapp" type="url" name="whatsapp" required placeholder="https://www.tiktok.com/@yourpage" value={formData.whatsapp} onChange={handleInputChange} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100" />
          </div>

          <div className="space-y-1">
            <label htmlFor="description" className="block text-xs font-semibold text-gray-600">Description</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows={3} placeholder="Short description for mobile cards" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100" />
            <p className="text-[11px] text-gray-500">
              Keep it short for mobile: {descriptionWordCount}/{DESCRIPTION_WORD_LIMIT} words, about 2 lines
            </p>
          </div>

          <div className="flex gap-3 pt-3 border-t border-amber-50">
            <button type="submit" disabled={loading || uploading} className="flex-1 rounded-full bg-gradient-to-r from-blue-700 to-amber-500 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Saving...' : initialData ? 'Update Product' : 'Add Product'}
            </button>
            <button type="button" onClick={onCancel} className="flex-1 rounded-full border border-amber-200 py-2.5 text-sm font-semibold text-amber-700 hover:bg-amber-50">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}