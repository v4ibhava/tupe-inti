import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { AdminManagementSkeleton } from '../../components/SkeletonLoaders';
import {
  FaSlidersH,
  FaArrowLeft,
  FaCheckCircle,
  FaExclamationTriangle,
  FaBuilding,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaShieldAlt,
  FaSave,
} from 'react-icons/fa';

const defaultContent = {
  companyName: 'Tupe Brothers',
  tagline: 'Architectural Excellence & Haute Living Interiors since 2014.',
  footer: {
    companyName: 'Tupe Brothers',
    tagline: 'Architectural Excellence & Haute Living Interiors since 2014.',
    contact: {
      phone: '+91 98765 43210',
      email: 'info@tupebrothers.in',
      address: 'Skyline Atrium, Level 14, Mumbai, India',
    },
    hours: ['Mon - Fri: 9:00 AM - 8:00 PM', 'Saturday: 10:00 AM - 6:00 PM', 'Sunday: Closed'],
    copyright: '© 2026 Tupe Brothers Atelier. All rights reserved.',
  },
};

const SettingsPage = () => {
  const { admin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [content, setContent] = useState(defaultContent);
  const [stats, setStats] = useState({ unreadMessages: 0, totalPortfolios: 0 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

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
      fetchSettings();
    }
  }, [admin, authLoading, navigate]);

  const fetchSettings = async () => {
    try {
      const [landingRes, statsRes] = await Promise.all([
        API.get('/landing/content'),
        API.get('/admin/stats'),
      ]);

      const landingData = landingRes.data?.data || defaultContent;
      setContent({
        companyName: landingData.footer?.companyName || landingData.companyName || 'Tupe Brothers',
        tagline: landingData.footer?.tagline || landingData.tagline || defaultContent.tagline,
        footer: {
          ...defaultContent.footer,
          ...(landingData.footer || {}),
          contact: {
            ...defaultContent.footer.contact,
            ...((landingData.footer && landingData.footer.contact) || {}),
          },
          hours: landingData.footer?.hours || defaultContent.footer.hours,
          copyright: landingData.footer?.copyright || defaultContent.footer.copyright,
        },
      });

      setStats({
        unreadMessages: statsRes.data?.data?.unreadMessages || 0,
        totalPortfolios: statsRes.data?.data?.totalPortfolios || 0,
      });
    } catch (error) {
      console.error('Failed to load settings:', error);
      setContent(defaultContent);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...defaultContent,
        companyName: content.companyName,
        tagline: content.tagline,
        footer: {
          ...content.footer,
          companyName: content.companyName,
          tagline: content.tagline,
        },
      };

      await API.put('/landing/content', payload);
      showToast('Brand configuration saved successfully.');
    } catch (error) {
      showToast(error.response?.data?.message || 'Unable to save brand settings', 'error');
    } finally {
      setSaving(false);
    }
  };

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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-[#E8E1D9] pb-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex p-2.5 rounded-xl bg-[#C6A15B]/10 border border-[#C6A15B]/30 text-[#C6A15B]">
              <FaSlidersH className="text-lg" />
            </span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif tracking-tight text-[#2B1E16]">
                Studio & Brand Settings
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5 font-light">
                Configure brand identity, studio contact details, and client intake parameters.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E8E1D9] text-[#2B1E16] hover:bg-[#F3EDE7] shadow-sm transition text-xs font-medium"
          >
            <FaArrowLeft className="text-xs" /> Back to Dashboard
          </button>
        </div>

        {/* Studio Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white border border-[#E8E1D9] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">
                Logged In Operator
              </span>
              <FaShieldAlt className="text-[#C6A15B] text-sm" />
            </div>
            <h3 className="text-base font-serif text-[#2B1E16] mt-2 truncate">
              {admin?.email || 'admin@tupebrothers.in'}
            </h3>
            <p className="text-[11px] text-emerald-600 font-mono mt-1">● Master Admin Privileges Active</p>
          </div>

          <div className="bg-white border border-[#E8E1D9] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">
                Brand Identity
              </span>
              <FaBuilding className="text-[#C6A15B] text-sm" />
            </div>
            <h3 className="text-base font-serif text-[#916E2E] mt-2">{content.companyName}</h3>
            <p className="text-[11px] text-stone-500 mt-1">Live on Website & Inquiries</p>
          </div>

          <div className="bg-white border border-[#E8E1D9] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">
                Pending Inquiries
              </span>
              <span className="w-2 h-2 rounded-full bg-[#C6A15B] animate-ping"></span>
            </div>
            <h3 className="text-2xl font-serif text-[#2B1E16] mt-2">{stats.unreadMessages}</h3>
            <p className="text-[11px] text-stone-500 mt-1">Unread VIP consultation requests</p>
          </div>
        </div>

        {/* Configuration Form */}
        <form
          onSubmit={handleSave}
          className="bg-white border border-[#E8E1D9] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6"
        >
          {/* Section: Brand Identity */}
          <div>
            <h2 className="text-base font-serif text-[#2B1E16] flex items-center gap-2 mb-4 border-b border-[#E8E1D9] pb-3">
              <FaBuilding className="text-[#C6A15B] text-sm" /> Brand Identity & Presence
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1.5">
                  Company / Atelier Name
                </label>
                <input
                  type="text"
                  value={content.companyName}
                  onChange={(e) =>
                    setContent((prev) => ({ ...prev, companyName: e.target.value }))
                  }
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF9F7] border border-[#E8E1D9] text-[#2B1E16] placeholder-stone-400 focus:outline-none focus:border-[#C6A15B] text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1.5">
                  Copyright Statement
                </label>
                <input
                  type="text"
                  value={content.footer.copyright}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      footer: { ...prev.footer, copyright: e.target.value },
                    }))
                  }
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF9F7] border border-[#E8E1D9] text-[#2B1E16] placeholder-stone-400 focus:outline-none focus:border-[#C6A15B] text-xs sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-stone-700 mb-1.5">
                  Studio Tagline / Philosophy
                </label>
                <textarea
                  rows="2"
                  value={content.tagline}
                  onChange={(e) => setContent((prev) => ({ ...prev, tagline: e.target.value }))}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF9F7] border border-[#E8E1D9] text-[#2B1E16] placeholder-stone-400 focus:outline-none focus:border-[#C6A15B] text-xs sm:text-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section: Public Studio Contacts */}
          <div>
            <h2 className="text-base font-serif text-[#2B1E16] flex items-center gap-2 mb-4 border-b border-[#E8E1D9] pb-3">
              <FaPhoneAlt className="text-[#C6A15B] text-sm" /> Public Studio Contacts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1.5">
                  Phone / WhatsApp Line
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={content.footer.contact.phone}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        footer: {
                          ...prev.footer,
                          contact: { ...prev.footer.contact, phone: e.target.value },
                        },
                      }))
                    }
                    required
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#FCF9F7] border border-[#E8E1D9] text-[#2B1E16] placeholder-stone-400 focus:outline-none focus:border-[#C6A15B] text-xs sm:text-sm"
                  />
                  <FaPhoneAlt className="absolute left-3 top-3 text-stone-400 text-xs" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1.5">
                  Official Inquiries Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={content.footer.contact.email}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        footer: {
                          ...prev.footer,
                          contact: { ...prev.footer.contact, email: e.target.value },
                        },
                      }))
                    }
                    required
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#FCF9F7] border border-[#E8E1D9] text-[#2B1E16] placeholder-stone-400 focus:outline-none focus:border-[#C6A15B] text-xs sm:text-sm"
                  />
                  <FaEnvelope className="absolute left-3 top-3 text-stone-400 text-xs" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-stone-700 mb-1.5">
                  Studio Physical Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={content.footer.contact.address}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        footer: {
                          ...prev.footer,
                          contact: { ...prev.footer.contact, address: e.target.value },
                        },
                      }))
                    }
                    required
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#FCF9F7] border border-[#E8E1D9] text-[#2B1E16] placeholder-stone-400 focus:outline-none focus:border-[#C6A15B] text-xs sm:text-sm"
                  />
                  <FaMapMarkerAlt className="absolute left-3 top-3 text-stone-400 text-xs" />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Consultation Hours */}
          <div>
            <h2 className="text-base font-serif text-[#2B1E16] flex items-center gap-2 mb-4 border-b border-[#E8E1D9] pb-3">
              <FaClock className="text-[#C6A15B] text-sm" /> Client Consultation Hours
            </h2>
            <div className="space-y-3">
              {(content.footer.hours || []).map((hour, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={hour}
                  onChange={(e) => {
                    const newHours = [...content.footer.hours];
                    newHours[idx] = e.target.value;
                    setContent((prev) => ({
                      ...prev,
                      footer: { ...prev.footer, hours: newHours },
                    }));
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF9F7] border border-[#E8E1D9] text-[#2B1E16] placeholder-stone-400 focus:outline-none focus:border-[#C6A15B] text-xs sm:text-sm"
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[#E8E1D9] flex justify-end gap-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#C6A15B] to-[#b08d4a] text-white font-semibold text-xs tracking-wide uppercase hover:opacity-95 transition shadow-md disabled:opacity-50"
            >
              <FaSave className="text-xs" /> {saving ? 'Saving...' : 'Save Studio Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
