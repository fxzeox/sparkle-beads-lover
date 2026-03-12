'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ProductForm from '@/components/ProductForm';
import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [adminToken, setAdminToken] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    setAdminToken(token);
    fetchProducts();
  }, [router]);

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

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await axios.delete(`/api/products?id=${id}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  if (!adminToken) {
    return null; // Loading state when checking auth
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-blue-50/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-white/90 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <h1 className="text-base font-bold bg-gradient-to-r from-blue-700 to-amber-500 bg-clip-text text-transparent truncate">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link
              href="/"
              className="flex-1 sm:flex-none text-center px-3 py-1.5 rounded-full border border-amber-200 text-amber-700 text-xs font-semibold transition-all hover:bg-amber-50"
            >
              View Store
            </Link>
            <button
              onClick={handleLogout}
              className="flex-1 sm:flex-none px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-700 to-amber-500 text-white text-xs font-semibold transition-all hover:shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-amber-500 bg-clip-text text-transparent">Product Management</h2>
            <p className="text-gray-400 text-xs mt-1">Add, edit, and delete your bracelets</p>
          </div>
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
            className="w-full sm:w-auto px-4 py-2 rounded-full bg-gradient-to-r from-blue-700 to-amber-500 text-white text-xs font-semibold transition-all hover:shadow-md hover:scale-105"
          >
            + Add New Bracelet
          </button>
        </div>

        {/* Product Form Modal */}
        {showForm && (
          <ProductForm
            adminToken={adminToken}
            onSuccess={() => {
              setShowForm(false);
              setEditingProduct(null);
              fetchProducts();
            }}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
            initialData={editingProduct}
          />
        )}

        {/* Products List */}
        {loading ? (
          <div className="flex items-center justify-center min-h-96">
            <div className="animate-spin">
              <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-500 rounded-full" />
            </div>
          </div>
        ) : error ? (
          <div className="rounded-lg bg-red-50 p-6 text-red-800">
            <p className="font-semibold">Error loading products</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-lg bg-amber-50 p-6 sm:p-12 text-center text-amber-800">
            <p className="text-lg font-semibold">No products yet</p>
            <p className="text-sm mt-2">Create your first bracelet to get started</p>
            <button
              onClick={() => {
                setEditingProduct(null);
                setShowForm(true);
              }}
              className="mt-4 px-6 py-2 rounded-lg bg-amber-600 text-white font-semibold transition-all hover:bg-amber-700"
            >
              Add First Product
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full min-w-[680px] bg-white">
              <thead className="bg-gradient-to-r from-blue-700 to-amber-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold">Image</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold">Price</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold">TikTok</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-50">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-amber-50/60 transition-colors">
                    <td className="px-4 py-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-gray-800">{product.name}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-bold text-amber-500">Rs {product.price}</p>
                    </td>
                    <td className="px-4 py-3">
                      {product.whatsapp?.startsWith('http') ? (
                        <a
                          href={product.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-amber-700 hover:text-amber-800"
                        >
                          Open Link
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">Not set</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingProduct({
                              _id: product._id,
                              name: product.name,
                              price: product.price.toString(),
                              description: product.description || '',
                              image: product.image,
                              whatsapp: product.whatsapp,
                            });
                            setShowForm(true);
                          }}
                          className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-semibold text-xs transition-all hover:bg-amber-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="px-3 py-1 rounded-full bg-red-50 text-red-500 font-semibold text-xs transition-all hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
