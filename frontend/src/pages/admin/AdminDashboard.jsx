// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaArrowRight,
  FaBell,
  FaCog,
  FaEnvelope,
  FaImages,
  FaProjectDiagram,
  FaUsers,
  FaCamera,
  FaSignOutAlt,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaClock,
} from 'react-icons/fa';
import API from '../../api/axios';
import { AdminDashboardSkeleton } from '../../components/SkeletonLoaders';

const AdminDashboard = () => {
  const { admin, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    portfolioItems: 0,
    unreadMessages: 0,
    totalPosts: 0,
    totalGallery: 0,
    settings: 1,
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !admin) {
      navigate('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [statsRes, enquiriesRes] = await Promise.allSettled([
          API.get('/admin/stats'),
          API.get('/enquiry/all'),
        ]);

        if (statsRes.status === 'fulfilled') {
          setStats((prev) => ({
            ...prev,
            ...(statsRes.value.data?.data || {}),
          }));
        }

        if (enquiriesRes.status === 'fulfilled') {
          const allEnquiries = enquiriesRes.value.data?.data || [];
          setRecentEnquiries(allEnquiries.slice(0, 5));
        }
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (admin) {
      fetchData();
    }
  }, [admin, authLoading, navigate]);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  if (authLoading || loading) {
    return <AdminDashboardSkeleton />;
  }

  return (
    <div className="pt-20 lg:pt-6 min-h-screen bg-[#FCF9F7] text-[#2B1E16] pb-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        
        {/* Top Atelier Bar */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 bg-white p-6 rounded-3xl border border-[#eadfce] shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C6A15B] animate-pulse" />
              <p className="text-[#C6A15B] text-xs uppercase tracking-[0.22em] font-bold">
                {currentDate}
              </p>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              Welcome back, {admin?.name || 'Director'}.
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
              Elevatura Atelier Command Center • All systems live
            </p>
          </div>
        </header>

        {/* 5-Card Analytics Grid */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { label: 'Client Enquiries', value: stats.totalEnquiries, icon: FaUsers, accent: 'bg-[#F7EEDC] text-[#C6A15B]', link: '/admin/enquiries' },
            { label: 'Portfolio Works', value: stats.portfolioItems, icon: FaProjectDiagram, accent: 'bg-[#E8EEE7] text-emerald-700', link: '/admin/portfolio' },
            { label: 'Gallery Archive', value: stats.totalGallery || 6, icon: FaCamera, accent: 'bg-[#E9E5E1] text-[#2B1E16]', link: '/admin/gallery' },
            { label: 'Journal Articles', value: stats.totalPosts || 3, icon: FaImages, accent: 'bg-[#F3E2DB] text-[#bc5c45]', link: '/admin/blog' },
            { label: 'Pending Follow-ups', value: stats.unreadMessages || stats.totalEnquiries, icon: FaEnvelope, accent: 'bg-yellow-100 text-yellow-800', link: '/admin/enquiries' },
          ].map(({ label, value, icon: Icon, accent, link }) => (
            <Link
              key={label}
              to={link}
              className="bg-white rounded-3xl p-5 border border-[#eadfce] shadow-sm hover:border-[#C6A15B]/60 transition-all group"
            >
              <div className="flex items-center justify-between gap-3">
                <span className={`w-11 h-11 rounded-2xl ${accent} flex items-center justify-center text-lg group-hover:scale-110 transition-transform`}>
                  <Icon />
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold">{value}</span>
              </div>
              <p className="text-gray-500 text-xs font-semibold mt-4">{label}</p>
            </Link>
          ))}
        </section>

        {/* Middle Section: Studio Pulse Hero + Quick Action Matrix */}
        <section className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6 mt-6">
          
          {/* Studio Pulse Banner */}
          <div className="bg-[#2B1E16] rounded-3xl p-6 sm:p-8 text-white min-h-[260px] flex flex-col justify-between overflow-hidden relative shadow-lg">
            <div className="relative z-10">
              <span className="text-[#C6A15B] text-xs uppercase tracking-[0.2em] font-bold bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Atelier Pulse
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-4 max-w-md">
                Turn today’s client briefs into bespoke architectural spaces.
              </h2>
              <p className="text-white/70 mt-3 max-w-md text-xs sm:text-sm leading-relaxed">
                Review fresh consultation requests, update high-res photography, and synchronize editorial journal insights.
              </p>
            </div>
            
            <div className="relative z-10 flex flex-wrap items-center gap-4 mt-8">
              <Link
                to="/admin/enquiries"
                className="inline-flex items-center gap-2 bg-[#C6A15B] text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#b08d4a] transition shadow-md"
              >
                Review Inquiries ({stats.totalEnquiries}) <FaArrowRight className="text-[10px]" />
              </Link>
              <Link
                to="/admin/front-ui"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-white/20 transition border border-white/10"
              >
                Customize Front UI
              </Link>
            </div>

            <div className="absolute -right-10 -bottom-20 w-64 h-64 rounded-full border-[28px] border-[#C6A15B]/15 pointer-events-none" />
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#eadfce] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#C6A15B] font-bold">Shortcuts</p>
                <h2 className="text-xl font-bold mt-0.5">Quick Actions</h2>
              </div>
              <span className="w-8 h-8 rounded-full bg-[#FCF9F7] text-[#C6A15B] flex items-center justify-center text-xs border border-[#eadfce]">
                ⚡
              </span>
            </div>

            <div className="space-y-2.5">
              {[
                ['Publish Portfolio Project', '/admin/portfolio', FaProjectDiagram, 'Add residential or commercial works'],
                ['Upload Gallery Photo', '/admin/gallery', FaCamera, 'Expand visual photography archive'],
                ['Write Journal Editorial', '/admin/blog', FaImages, 'Publish design trends & articles'],
                ['Live Front UI Editor', '/admin/front-ui', FaCog, 'Adjust hero headline & badges'],
              ].map(([label, href, Icon, subtext]) => (
                <Link
                  key={label}
                  to={href}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#FCF9F7] hover:bg-[#F8F1E6] border border-transparent hover:border-[#C6A15B]/30 transition group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-white text-[#C6A15B] flex items-center justify-center shadow-sm text-sm border border-[#eadfce]">
                      <Icon />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-[#2B1E16]">{label}</p>
                      <p className="text-[10px] text-gray-400">{subtext}</p>
                    </div>
                  </div>
                  <FaArrowRight className="text-xs text-[#C6A15B] group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Client Enquiries Feed */}
        <section className="mt-6 bg-white rounded-3xl p-6 sm:p-7 border border-[#eadfce] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#C6A15B] font-bold">Client Stream</p>
              <h2 className="text-xl font-bold mt-0.5">Recent Enquiries</h2>
            </div>
            <Link
              to="/admin/enquiries"
              className="text-xs font-bold text-[#C6A15B] hover:underline inline-flex items-center gap-1.5"
            >
              View all enquiries ({stats.totalEnquiries}) <FaArrowRight className="text-[10px]" />
            </Link>
          </div>

          {recentEnquiries.length === 0 ? (
            <div className="border border-dashed border-[#eadfce] rounded-2xl p-8 text-center text-gray-400 text-xs">
              No customer inquiries logged yet. They will appear here in real-time as visitors submit quote forms.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead>
                  <tr className="border-b border-[#f0ebe4] text-gray-400 font-bold uppercase tracking-wider">
                    <th className="pb-3 pl-2">Client</th>
                    <th className="pb-3">Contact</th>
                    <th className="pb-3">Brief / Message</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3 text-right pr-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f7f2eb]">
                  {recentEnquiries.map((enquiry) => (
                    <tr key={enquiry._id} className="hover:bg-[#FCF9F7] transition">
                      <td className="py-3 pl-2 font-bold text-[#2B1E16]">{enquiry.name}</td>
                      <td className="py-3 text-gray-500">
                        <div>{enquiry.email}</div>
                        <div className="text-[10px] text-gray-400">{enquiry.phone}</div>
                      </td>
                      <td className="py-3 max-w-xs text-gray-600 truncate">{enquiry.message}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          enquiry.status === 'Contacted'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {enquiry.status === 'Contacted' ? <FaCheckCircle className="text-[8px]" /> : <FaClock className="text-[8px]" />}
                          {enquiry.status || 'Pending'}
                        </span>
                      </td>
                      <td className="py-3 text-gray-400">
                        {enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recent'}
                      </td>
                      <td className="py-3 text-right pr-2">
                        <Link
                          to="/admin/enquiries"
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#F7EEDC] text-[#2B1E16] font-bold hover:bg-[#F0E1BA] transition"
                        >
                          Manage
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default AdminDashboard;