import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { AdminManagementSkeleton } from '../../components/SkeletonLoaders';
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaArrowLeft,
  FaSearch,
  FaNewspaper,
  FaImage,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaMagic,
  FaTimes,
  FaTag,
} from 'react-icons/fa';

const CATEGORIES = [
  'All',
  'Trends & Styling',
  'Spatial Planning',
  'Color Theory',
  'Materials & Craft',
  'Architectural Design',
  'Lighting & Ambience',
  'Sustainable Luxury',
];

const emptyForm = {
  title: '',
  slug: '',
  category: 'Trends & Styling',
  description: '',
  content: '',
  featuredImage: '',
};

const BlogManagement = () => {
  const { admin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [toast, setToast] = useState(null);
  const [autoSlug, setAutoSlug] = useState(true);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    if (!authLoading && !admin) {
      navigate('/admin/login');
      return;
    }

    if (admin) {
      fetchPosts();
    }
  }, [admin, authLoading, navigate]);

  const fetchPosts = async () => {
    try {
      const res = await API.get('/posts');
      setPosts(res.data?.data || []);
    } catch (error) {
      console.error('Failed to load posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title' && autoSlug && !editingId) {
      setForm((prev) => ({
        ...prev,
        title: value,
        slug: generateSlug(value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setAutoSlug(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingId) {
        await API.put(`/posts/${editingId}`, form);
        showToast('Editorial article updated successfully.');
      } else {
        await API.post('/posts', form);
        showToast('New article published to Journal.');
      }
      resetForm();
      fetchPosts();
    } catch (error) {
      showToast(error.response?.data?.message || 'Unable to save blog post', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (post) => {
    setEditingId(post._id);
    setAutoSlug(false);
    setForm({
      title: post.title,
      slug: post.slug,
      category: post.category,
      description: post.description,
      content: post.content,
      featuredImage: post.featuredImage,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deletePost = async (id, title) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${title}"?`)) return;

    try {
      await API.delete(`/posts/${id}`);
      if (editingId === id) resetForm();
      showToast('Article removed from publication.');
      fetchPosts();
    } catch (error) {
      showToast(error.response?.data?.message || 'Unable to delete blog post', 'error');
    }
  };

  // Filter logic
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (authLoading || loading) {
    return <AdminManagementSkeleton />;
  }

  return (
    <div className="pt-20 lg:pt-6 bg-[#FCF9F7] min-h-screen text-[#2B1E16] font-sans pb-24">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-md border animate-bounce ${
            toast.type === 'error'
              ? 'bg-rose-50 text-rose-800 border-rose-200'
              : 'bg-white text-[#2B1E16] border-[#C6A15B]/50'
          }`}
        >
          {toast.type === 'error' ? (
            <FaExclamationTriangle className="text-rose-500" />
          ) : (
            <FaCheckCircle className="text-[#C6A15B]" />
          )}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-[#E8E1D9] pb-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex p-2.5 rounded-xl bg-[#C6A15B]/10 border border-[#C6A15B]/30 text-[#C6A15B]">
                <FaNewspaper className="text-lg" />
              </span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif tracking-tight text-[#2B1E16]">
                  Journal & Editorial CMS
                </h1>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5 font-light">
                  Publish design insights, trend forecasts, and architectural stories.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E8E1D9] text-[#2B1E16] hover:bg-[#F3EDE7] shadow-sm transition text-xs font-medium"
            >
              <FaArrowLeft className="text-xs" /> Back to Dashboard
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E8E1D9] rounded-2xl p-6 shadow-sm relative">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E8E1D9]">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#C6A15B]"></span>
                  <h2 className="text-lg font-serif tracking-wide text-[#2B1E16]">
                    {editingId ? 'Edit Journal Article' : 'Draft New Article'}
                  </h2>
                </div>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-xs text-stone-500 hover:text-[#2B1E16] flex items-center gap-1 bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-200"
                  >
                    <FaTimes /> Cancel
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                {/* Title */}
                <div>
                  <label className="block text-stone-700 font-medium mb-1.5">Article Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. The Alchemy of Textures: 2026 Interior Forecasts"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF9F7] border border-[#E8E1D9] text-[#2B1E16] placeholder-stone-400 focus:outline-none focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B] transition"
                  />
                </div>

                {/* Slug */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-stone-700 font-medium">URL Slug *</label>
                    <button
                      type="button"
                      onClick={() => {
                        setAutoSlug(true);
                        setForm((prev) => ({ ...prev, slug: generateSlug(prev.title) }));
                      }}
                      className="text-[11px] text-[#C6A15B] hover:underline inline-flex items-center gap-1"
                    >
                      <FaMagic className="text-[10px]" /> Auto-generate
                    </button>
                  </div>
                  <div className="flex rounded-xl bg-[#FCF9F7] border border-[#E8E1D9] overflow-hidden focus-within:border-[#C6A15B]">
                    <span className="px-3 py-2.5 bg-stone-100 text-stone-500 text-xs border-r border-[#E8E1D9]">
                      /blog/
                    </span>
                    <input
                      type="text"
                      name="slug"
                      value={form.slug}
                      onChange={(e) => {
                        setAutoSlug(false);
                        setForm({ ...form, slug: e.target.value });
                      }}
                      placeholder="the-alchemy-of-textures"
                      required
                      className="w-full px-3 py-2.5 bg-transparent text-[#2B1E16] placeholder-stone-400 focus:outline-none text-xs"
                    />
                  </div>
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-stone-700 font-medium mb-1.5">Category *</label>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, category: cat }))}
                        className={`px-2.5 py-1.5 rounded-lg text-left text-xs transition border truncate ${
                          form.category === cat
                            ? 'bg-[#C6A15B]/15 border-[#C6A15B] text-[#916E2E] font-medium'
                            : 'bg-stone-50 border-stone-200 text-stone-600 hover:text-[#2B1E16] hover:border-stone-300'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Or type custom category..."
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FCF9F7] border border-[#E8E1D9] text-[#2B1E16] placeholder-stone-400 focus:outline-none focus:border-[#C6A15B] text-xs"
                  />
                </div>

                {/* Short Excerpt */}
                <div>
                  <label className="block text-stone-700 font-medium mb-1.5">
                    Short Description / Excerpt *
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="2"
                    placeholder="A brief 1-2 sentence hook for the preview card..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF9F7] border border-[#E8E1D9] text-[#2B1E16] placeholder-stone-400 focus:outline-none focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B] transition resize-none text-xs"
                  />
                </div>

                {/* Full Content */}
                <div>
                  <label className="block text-stone-700 font-medium mb-1.5">
                    Article Body (Paragraphs or Markdown) *
                  </label>
                  <textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Write the full editorial story here..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF9F7] border border-[#E8E1D9] text-[#2B1E16] placeholder-stone-400 focus:outline-none focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B] transition resize-none text-xs font-serif leading-relaxed"
                  />
                </div>

                {/* Featured Image */}
                <div>
                  <label className="block text-stone-700 font-medium mb-1.5">Featured Image URL *</label>
                  <div className="relative">
                    <input
                      type="url"
                      name="featuredImage"
                      value={form.featuredImage}
                      onChange={handleChange}
                      placeholder="https://images.unsplash.com/photo-..."
                      required
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#FCF9F7] border border-[#E8E1D9] text-[#2B1E16] placeholder-stone-400 focus:outline-none focus:border-[#C6A15B] text-xs"
                    />
                    <FaImage className="absolute left-3 top-3 text-stone-400 text-xs" />
                  </div>
                </div>

                {/* Image Live Preview */}
                {form.featuredImage && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-[#E8E1D9] relative h-32 bg-stone-100">
                    <img
                      src={form.featuredImage}
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] text-white">
                      Cover Preview
                    </span>
                  </div>
                )}

                {/* Submit Buttons */}
                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#C6A15B] to-[#b08d4a] text-white font-semibold text-xs tracking-wide uppercase hover:opacity-95 transition shadow-md disabled:opacity-50"
                  >
                    {submitting ? 'Publishing...' : editingId ? 'Update Article' : 'Publish Article'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-3 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 text-xs transition"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Published Articles List (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Filter Bar */}
            <div className="bg-white border border-[#E8E1D9] rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="relative w-full sm:w-72">
                <FaSearch className="absolute left-3.5 top-3 text-stone-400 text-xs" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-9 pr-4 py-2 bg-[#FCF9F7] border border-[#E8E1D9] rounded-xl text-xs text-[#2B1E16] placeholder-stone-400 focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div className="text-xs text-stone-500 self-end sm:self-center">
                Showing <strong className="text-[#C6A15B]">{filteredPosts.length}</strong> of{' '}
                {posts.length} articles
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition border ${
                    activeCategory === cat
                      ? 'bg-[#C6A15B] border-[#C6A15B] text-white font-medium shadow-sm'
                      : 'bg-white border-[#E8E1D9] text-stone-600 hover:text-[#2B1E16] hover:border-stone-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Articles Grid */}
            {filteredPosts.length === 0 ? (
              <div className="bg-white border border-dashed border-[#E8E1D9] rounded-2xl p-12 text-center">
                <FaNewspaper className="mx-auto text-3xl text-stone-300 mb-3" />
                <p className="text-[#2B1E16] font-serif text-lg">No Articles Found</p>
                <p className="text-stone-500 text-xs mt-1">
                  {searchQuery || activeCategory !== 'All'
                    ? 'Try clearing your search query or category filter.'
                    : 'Use the drafting panel on the left to write your first journal story.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredPosts.map((post) => (
                  <div
                    key={post._id}
                    className="bg-white border border-[#E8E1D9] hover:border-[#C6A15B]/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
                  >
                    {/* Image Header */}
                    <div className="relative h-44 bg-stone-100 overflow-hidden">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-stone-200 text-[10px] uppercase tracking-wider text-[#916E2E] font-semibold">
                        {post.category || 'Editorial'}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mb-2">
                          <FaTag className="text-[9px] text-[#C6A15B]" />
                          <span className="font-mono text-[10px] text-stone-500">
                            /blog/{post.slug}
                          </span>
                        </div>
                        <h3 className="font-serif text-base text-[#2B1E16] group-hover:text-[#C6A15B] transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-xs text-stone-500 mt-2 line-clamp-2 font-light leading-relaxed">
                          {post.description}
                        </p>
                      </div>

                      {/* Action Bar */}
                      <div className="pt-4 mt-4 border-t border-[#E8E1D9] flex items-center justify-between gap-2">
                        <Link
                          to={`/blog/${post.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1.5 text-[11px] text-stone-500 hover:text-[#C6A15B] transition"
                        >
                          <FaExternalLinkAlt className="text-[10px]" /> Live View
                        </Link>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(post)}
                            className="p-2 rounded-lg bg-stone-100 hover:bg-[#C6A15B] text-stone-600 hover:text-white transition"
                            title="Edit Article"
                          >
                            <FaEdit className="text-xs" />
                          </button>
                          <button
                            onClick={() => deletePost(post._id, post.title)}
                            className="p-2 rounded-lg bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white border border-rose-200 hover:border-rose-500 transition"
                            title="Delete Article"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogManagement;
