import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { AdminManagementSkeleton } from '../../components/SkeletonLoaders';

const emptyContent = {
  hero: {
    badge: '',
    title: '',
    subtitle: '',
    backgroundImage: '',
    buttonText: '',
    trustBadges: [],
  },
  stats: [],
  features: [],
  portfolio: [],
  testimonials: [],
  footer: {
    companyName: '',
    tagline: '',
    quickLinks: [],
    contact: {
      phone: '',
      whatsapp: '',
      email: '',
      address: '',
    },
    hours: [],
    copyright: '',
  },
};

const FrontUIDesign = () => {
  const navigate = useNavigate();
  const { admin } = useAuth();
  const [content, setContent] = useState(emptyContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }

    const fetchContent = async () => {
      try {
        setLoading(true);
        const res = await API.get('/landing/content');
        if (res.data?.success && res.data.data) {
          setContent(res.data.data);
        }
      } catch (err) {
        setError('Failed to load landing page content.');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [admin, navigate]);

  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setContent((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [name]: value,
      },
    }));
  };

  const handleFooterChange = (e) => {
    const { name, value } = e.target;
    setContent((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        contact: {
          ...prev.footer.contact,
          [name]: value,
        },
      },
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      const payload = {
        ...content,
        hero: {
          ...content.hero,
          trustBadges: content.hero?.trustBadges || [],
        },
        footer: {
          ...content.footer,
          contact: {
            ...content.footer?.contact,
          },
        },
      };

      const res = await API.put('/landing/content', payload);
      if (res.data?.success) {
        setSuccess('Landing page updated successfully.');
      } else {
        setError(res.data?.message || 'Could not save design settings.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong while saving.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <AdminManagementSkeleton />;
  }

  return (
    <div className="pt-20 lg:pt-6 min-h-screen bg-[#FCF9F7] px-4 sm:px-6 pb-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-lg p-6 sm:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-[#C6A15B] uppercase tracking-[0.2em] text-xs font-semibold">Admin Tools</p>
              <h1 className="text-3xl font-bold text-[#1a1410] mt-2">Front UI Design</h1>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#C6A15B] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#b08d4a] transition disabled:opacity-70"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          {error && <div className="mt-6 bg-red-100 text-red-700 p-3 rounded-xl text-sm">{error}</div>}
          {success && <div className="mt-6 bg-emerald-100 text-emerald-700 p-3 rounded-xl text-sm">{success}</div>}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-2xl p-5">
                <h2 className="text-xl font-bold text-[#1a1410] mb-4">Hero Section</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="badge"
                    value={content.hero?.badge || ''}
                    onChange={handleHeroChange}
                    placeholder="Badge text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none"
                  />
                  <input
                    type="text"
                    name="title"
                    value={content.hero?.title || ''}
                    onChange={handleHeroChange}
                    placeholder="Hero title"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none"
                  />
                  <textarea
                    name="subtitle"
                    value={content.hero?.subtitle || ''}
                    onChange={handleHeroChange}
                    placeholder="Hero subtitle"
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none resize-none"
                  />
                  <input
                    type="text"
                    name="buttonText"
                    value={content.hero?.buttonText || ''}
                    onChange={handleHeroChange}
                    placeholder="Button text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none"
                  />
                  <input
                    type="url"
                    name="backgroundImage"
                    value={content.hero?.backgroundImage || ''}
                    onChange={handleHeroChange}
                    placeholder="Background image URL"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none"
                  />
                </div>
              </div>

              <div className="border border-gray-200 rounded-2xl p-5">
                <h2 className="text-xl font-bold text-[#1a1410] mb-4">Footer Details</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="companyName"
                    value={content.footer?.companyName || ''}
                    onChange={(e) => setContent((prev) => ({ ...prev, footer: { ...prev.footer, companyName: e.target.value } }))}
                    placeholder="Company name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none"
                  />
                  <textarea
                    name="tagline"
                    value={content.footer?.tagline || ''}
                    onChange={(e) => setContent((prev) => ({ ...prev, footer: { ...prev.footer, tagline: e.target.value } }))}
                    placeholder="Footer tagline"
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none resize-none"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={content.footer?.contact?.phone || ''}
                    onChange={handleFooterChange}
                    placeholder="Phone"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none"
                  />
                  <input
                    type="text"
                    name="whatsapp"
                    value={content.footer?.contact?.whatsapp || content.footer?.contact?.phone || ''}
                    onChange={handleFooterChange}
                    placeholder="WhatsApp number"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    value={content.footer?.contact?.email || ''}
                    onChange={handleFooterChange}
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none"
                  />
                  <input
                    type="text"
                    name="address"
                    value={content.footer?.contact?.address || ''}
                    onChange={handleFooterChange}
                    placeholder="Address"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border border-gray-200 rounded-2xl p-5">
                <h2 className="text-xl font-bold text-[#1a1410] mb-4">Trust Badges</h2>
                <div className="space-y-3">
                  {(content.hero?.trustBadges || []).map((badge, index) => (
                    <div key={index} className="flex gap-3 items-center">
                      <input
                        type="text"
                        value={badge.text || ''}
                        onChange={(e) => {
                          const updated = [...(content.hero?.trustBadges || [])];
                          updated[index] = { ...updated[index], text: e.target.value };
                          setContent((prev) => ({ ...prev, hero: { ...prev.hero, trustBadges: updated } }));
                        }}
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setContent((prev) => ({
                        ...prev,
                        hero: {
                          ...prev.hero,
                          trustBadges: [...(prev.hero?.trustBadges || []), { icon: 'check', text: 'New trust badge' }],
                        },
                      }));
                    }}
                    className="text-[#C6A15B] font-medium"
                  >
                    + Add trust badge
                  </button>
                </div>
              </div>

              <div className="border border-gray-200 rounded-2xl p-5">
                <h2 className="text-xl font-bold text-[#1a1410] mb-4">Preview</h2>
                <div className="rounded-2xl overflow-hidden border border-gray-200">
                  <div
                    className="relative h-56 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${content.hero?.backgroundImage || 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80'})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
                    <div className="absolute inset-0 p-6 text-white flex flex-col justify-center">
                      <span className="text-[#C6A15B] text-sm font-semibold">{content.hero?.badge || 'Hero badge'}</span>
                      <h3 className="text-3xl font-bold mt-3">{content.hero?.title || 'Your headline'}</h3>
                      <p className="mt-3 text-sm text-gray-200 max-w-md">{content.hero?.subtitle || 'Your subtitle will appear here.'}</p>
                      <button className="mt-5 bg-[#C6A15B] px-5 py-2.5 rounded-full w-max">{content.hero?.buttonText || 'Get Free Quote'}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FrontUIDesign;
