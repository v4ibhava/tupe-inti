import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaSearch,
  FaArrowLeft,
  FaProjectDiagram,
  FaCheckCircle,
  FaExclamationCircle,
} from 'react-icons/fa';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { AdminManagementSkeleton } from '../../components/SkeletonLoaders';

const emptyForm = {
  title: '',
  category: 'Residential',
  image: '',
  description: '',
};

const CATEGORIES = ['All', 'Residential', 'Commercial', 'Kitchen & Dining', 'Master Suite', 'Spa & Bathrooms', 'Architectural Build', 'Luxury'];

const isVideoUrl = (url) => /\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(url || '');

const MediaPreview = ({ url, title, className }) => {
  if (!url) return null;
  return isVideoUrl(url) ? (
    <video src={url} title={title} controls className={className} />
  ) : (
    <img src={url} alt={title} className={className} />
  );
};

const PortfolioManagement = () => {
  const { admin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!authLoading && !admin) {
      navigate('/admin/login');
      return;
    }
    if (admin) {
      fetchProjects();
    }
  }, [admin, authLoading, navigate]);

  const showToast = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await API.get('/portfolio');
      setProjects(res.data?.data || []);
    } catch (error) {
      console.error('Failed to load portfolio:', error);
      showToast('error', 'Failed to load portfolio items.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.image.trim()) {
      showToast('error', 'Please provide a title and image URL.');
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        await API.put(`/portfolio/${editingId}`, form);
        showToast('success', 'Project updated successfully!');
      } else {
        await API.post('/portfolio', form);
        showToast('success', 'New project published to portfolio!');
      }
      resetForm();
      fetchProjects();
    } catch (error) {
      showToast('error', error.response?.data?.message || 'Unable to save portfolio item');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setForm({
      title: project.title,
      category: project.category,
      image: project.image,
      description: project.description || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this portfolio project?')) return;

    try {
      await API.delete(`/portfolio/${id}`);
      showToast('success', 'Portfolio project deleted.');
      if (editingId === id) resetForm();
      fetchProjects();
    } catch (error) {
      showToast('error', error.response?.data?.message || 'Unable to delete portfolio item');
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      project.title?.toLowerCase().includes(searchLower) ||
      project.category?.toLowerCase().includes(searchLower) ||
      project.description?.toLowerCase().includes(searchLower);
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
              <p className="text-xs uppercase tracking-[0.2em] text-[#C6A15B] font-bold">Showcase Studio</p>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">Portfolio Management</h1>
            <p className="text-gray-500 text-sm mt-1">Add, edit, and organize completed residential and commercial projects</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="inline-flex items-center gap-2 bg-white border border-[#eadfce] text-[#2B1E16] px-4 py-2.5 rounded-full text-xs font-bold hover:bg-[#F8F1E6] transition shadow-sm cursor-pointer"
            >
              <FaArrowLeft className="text-[10px]" /> Dashboard
            </button>
          </div>
        </div>

        {/* 2-Column Grid: Form + Projects List */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Form Card (4 cols) */}
          <div className="xl:col-span-4 bg-white p-6 sm:p-7 rounded-3xl border border-[#eadfce] shadow-sm h-fit">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 rounded-2xl bg-[#F7EEDC] text-[#C6A15B] flex items-center justify-center text-lg">
                <FaProjectDiagram />
              </span>
              <div>
                <h2 className="text-lg font-bold">{editingId ? 'Edit Project' : 'Add New Work'}</h2>
                <p className="text-xs text-gray-400">Published to public showcase</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Project Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Marble Island Atelier"
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
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Kitchen & Dining">Kitchen & Dining</option>
                  <option value="Master Suite">Master Suite</option>
                  <option value="Spa & Bathrooms">Spa & Bathrooms</option>
                  <option value="Architectural Build">Architectural Build</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Media URL (Image or MP4) *
                </label>
                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none text-sm transition"
                />
              </div>

              {form.image && (
                <div className="mt-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Media Preview</p>
                  <MediaPreview
                    url={form.image}
                    title="Preview"
                    className="w-full h-40 rounded-2xl object-cover border border-gray-200"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Project Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the architectural concept, materials, and spatial layout..."
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none text-sm transition resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-[#C6A15B] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#b08d4a] transition-all duration-300 shadow-md disabled:opacity-70 cursor-pointer"
                >
                  {submitting ? 'Saving...' : editingId ? 'Update Project' : 'Publish Project'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-5 py-3.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition text-sm font-semibold"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Projects Grid (8 cols) */}
          <div className="xl:col-span-8 bg-white p-6 sm:p-7 rounded-3xl border border-[#eadfce] shadow-sm">
            
            {/* Search & Category Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-xs">
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search projects..."
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

            {filteredProjects.length === 0 ? (
              <div className="border border-dashed border-[#eadfce] rounded-2xl p-12 text-center">
                <FaProjectDiagram className="text-4xl text-neutral-300 mx-auto mb-3" />
                <h3 className="font-bold text-neutral-600">No portfolio projects found</h3>
                <p className="text-xs text-neutral-400 mt-1">Publish projects using the form on the left.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project._id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="border border-[#eadfce] rounded-2xl overflow-hidden bg-[#FCF9F7] flex flex-col justify-between"
                  >
                    <MediaPreview url={project.image} title={project.title} className="w-full h-48 object-cover bg-neutral-200" />
                    
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <span className="text-[10px] uppercase tracking-wider text-[#C6A15B] font-extrabold bg-[#F7EEDC] px-2.5 py-0.5 rounded-full">
                            {project.category}
                          </span>
                          <span className="text-[10px] text-gray-400">
                            {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : ''}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-[#1a1410] line-clamp-1">{project.title}</h3>
                        <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                          {project.description || 'No description provided.'}
                        </p>
                      </div>

                      <div className="flex gap-2 mt-4 pt-3 border-t border-[#f0ebe4]">
                        <button
                          onClick={() => handleEdit(project)}
                          className="flex-1 bg-[#F7EEDC] text-[#1a1410] py-2 rounded-xl text-xs font-bold hover:bg-[#F0E1BA] transition flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <FaEdit className="text-[10px]" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="flex-1 bg-red-50 text-red-600 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <FaTrash className="text-[10px]" /> Delete
                        </button>
                      </div>
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

export default PortfolioManagement;

