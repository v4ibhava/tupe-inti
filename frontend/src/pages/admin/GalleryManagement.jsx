import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPlus,
  FaTrash,
  FaImage,
  FaSearch,
  FaArrowLeft,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaExclamationCircle,
} from 'react-icons/fa';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { AdminManagementSkeleton } from '../../components/SkeletonLoaders';

const emptyForm = {
  title: '',
  category: 'Living Room',
  imageUrl: '',
};

const CATEGORIES = ['All', 'Living Room', 'Kitchen', 'Bedroom', 'Bathroom', 'Commercial', 'Outdoor', 'Architectural'];

const GalleryManagement = () => {
  const { admin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!authLoading && !admin) {
      navigate('/admin/login');
      return;
    }
    if (admin) {
      fetchGallery();
    }
  }, [admin, authLoading, navigate]);

  const showToast = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await API.get('/gallery');
      setItems(res.data?.data || []);
    } catch (error) {
      console.error('Failed to load gallery:', error);
      showToast('error', 'Failed to load gallery items.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.imageUrl.trim() || !form.title.trim()) {
      showToast('error', 'Please provide a title and image URL.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await API.post('/gallery', form);
      if (res.data?.success) {
        showToast('success', 'Image added to gallery!');
        setForm(emptyForm);
        fetchGallery();
      }
    } catch (error) {
      showToast('error', error.response?.data?.message || 'Unable to add image.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return;

    try {
      const res = await API.delete(`/gallery/${id}`);
      if (res.data?.success) {
        showToast('success', 'Gallery item deleted.');
        setItems((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      showToast('error', error.response?.data?.message || 'Unable to delete image.');
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (authLoading || loading) {
    return <AdminManagementSkeleton />;
  }

  return (
    <div className="pt-20 lg:pt-6 bg-[#FCF9F7] min-h-screen text-[#2B1E16] pb-16">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-24 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-semibold border ${
              notification.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-red-50 text-red-800 border-red-200'
            }`}
          >
            {notification.type === 'success' ? <FaCheckCircle className="text-emerald-600 text-lg" /> : <FaExclamationCircle className="text-red-600 text-lg" />}
            <span>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C6A15B]" />
              <p className="text-xs uppercase tracking-[0.2em] text-[#C6A15B] font-bold">Spatial Media Studio</p>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">Gallery Management</h1>
            <p className="text-gray-500 text-sm mt-1">Upload and categorize high-resolution architectural photography</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="inline-flex items-center gap-2 bg-white border border-[#eadfce] text-[#2B1E16] px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-[#F8F1E6] transition shadow-sm"
            >
              <FaArrowLeft className="text-xs" /> Dashboard
            </button>
          </div>
        </div>

        {/* Main Grid: Upload Form + Gallery Items Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Upload Card (4 cols) */}
          <div className="xl:col-span-4 bg-white p-6 sm:p-7 rounded-3xl border border-[#eadfce] shadow-sm h-fit">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 rounded-2xl bg-[#F7EEDC] text-[#C6A15B] flex items-center justify-center text-lg">
                <FaImage />
              </span>
              <div>
                <h2 className="text-lg font-bold">Add New Photo</h2>
                <p className="text-xs text-gray-400">Publish to public gallery</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Photo Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Master Bedroom Fluted Headboard"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none text-sm transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Category *
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none text-sm bg-white transition"
                >
                  <option value="Living Room">Living Room</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="Bathroom">Bathroom</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Outdoor">Outdoor</option>
                  <option value="Architectural">Architectural</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  High-Res Image URL *
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none text-sm transition"
                />
              </div>

              {/* Live Image Preview */}
              {form.imageUrl && (
                <div className="mt-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Live Preview</p>
                  <div className="relative h-44 rounded-2xl overflow-hidden border border-gray-200 bg-neutral-100">
                    <img
                      src={form.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-[#C6A15B] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                      {form.category}
                    </span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-2 bg-[#C6A15B] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#b08d4a] transition-all duration-300 shadow-md flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
              >
                {submitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <FaPlus className="text-xs" /> Add To Gallery
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Gallery Items Grid (8 cols) */}
          <div className="xl:col-span-8 bg-white p-6 sm:p-7 rounded-3xl border border-[#eadfce] shadow-sm">
            
            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-xs">
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search gallery..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none text-xs"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                      activeCategory === cat
                        ? 'bg-[#C6A15B] text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Grid */}
            {filteredItems.length === 0 ? (
              <div className="border border-dashed border-[#eadfce] rounded-2xl p-12 text-center">
                <FaImage className="text-4xl text-neutral-300 mx-auto mb-3" />
                <h3 className="font-bold text-neutral-600">No gallery images found</h3>
                <p className="text-xs text-neutral-400 mt-1">Use the upload panel on the left to add your first photo.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="border border-[#eadfce] rounded-2xl overflow-hidden bg-[#FCF9F7] group flex flex-col justify-between"
                  >
                    <div className="relative h-44 overflow-hidden bg-neutral-200">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-[#C6A15B] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-3.5 flex items-center justify-between gap-2">
                      <p className="font-bold text-xs truncate text-[#2B1E16]" title={item.title}>
                        {item.title}
                      </p>
                      <button
                        onClick={() => handleDelete(item._id)}
                        aria-label="Delete image"
                        className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center text-xs transition flex-shrink-0 cursor-pointer"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default GalleryManagement;
