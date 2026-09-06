import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  FaChartLine,
  FaCog,
  FaEnvelope,
  FaHome,
  FaImages,
  FaProjectDiagram,
  FaCamera,
  FaExternalLinkAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaShieldAlt,
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const links = [
  { label: 'Overview', to: '/admin/dashboard', icon: FaHome },
  { label: 'Portfolio CMS', to: '/admin/portfolio', icon: FaProjectDiagram },
  { label: 'Gallery CMS', to: '/admin/gallery', icon: FaCamera },
  { label: 'Journal CMS', to: '/admin/blog', icon: FaImages },
  { label: 'Client CRM', to: '/admin/enquiries', icon: FaEnvelope },
  { label: 'Front UI Design', to: '/admin/front-ui', icon: FaChartLine },
];

const AdminSidebar = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Sign out of Admin Studio?')) {
      logout();
      navigate('/admin/login');
    }
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
      isActive
        ? 'bg-[#C6A15B] text-black shadow-md shadow-[#C6A15B]/20 font-bold'
        : 'text-stone-300 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <>
      {/* ─── DESKTOP FULL-HEIGHT SIDEBAR (top-0 flush, no gaps) ─── */}
      <aside className="fixed top-0 bottom-0 left-0 z-40 hidden w-64 bg-[#2B1E16] text-white lg:flex lg:flex-col border-r border-stone-800/60 shadow-2xl">
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C6A15B] shadow-[0_0_10px_#C6A15B]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C6A15B]">
              Tupe Brothers
            </span>
          </div>
          <h2 className="text-xl font-serif font-bold text-white mt-1 tracking-wide">
            Atelier Studio
          </h2>
          <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-stone-300 font-mono">
            <FaShieldAlt className="text-[#C6A15B]" /> Master Admin
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-5 space-y-1.5 overflow-y-auto scrollbar-thin">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-stone-400">
            Navigation
          </p>
          {links.map(({ label, to, icon: Icon }) => (
            <NavLink key={to} to={to} className={linkClass}>
              <Icon className="text-sm shrink-0" />
              <span className="truncate">{label}</span>
            </NavLink>
          ))}

          <p className="px-3 pt-4 pb-2 text-[10px] font-bold uppercase tracking-widest text-stone-400">
            System
          </p>
          <NavLink to="/admin/settings" className={linkClass}>
            <FaCog className="text-sm shrink-0" />
            <span className="truncate">Studio Settings</span>
          </NavLink>
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-stone-400 hover:text-white hover:bg-white/10 transition"
          >
            <FaExternalLinkAlt className="text-xs shrink-0" />
            <span className="truncate">Live Website</span>
          </Link>
        </nav>

        {/* Bottom User Card */}
        <div className="p-4 border-t border-white/10 bg-black/20">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-white truncate">
                {admin?.email || 'admin@tupebrothers.in'}
              </p>
              <p className="text-[10px] text-[#C6A15B] font-mono">Operator Active</p>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-rose-900/60 text-stone-400 hover:text-rose-200 border border-white/10 transition"
            >
              <FaSignOutAlt className="text-xs" />
            </button>
          </div>
        </div>
      </aside>

      {/* ─── MOBILE TOP BAR (Flush at top-0, zero gap) ─── */}
      <header className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between bg-[#2B1E16] px-4 text-white border-b border-white/10 shadow-lg lg:hidden">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C6A15B] shadow-[0_0_8px_#C6A15B]" />
          <div>
            <span className="text-[9px] uppercase tracking-widest text-[#C6A15B] font-bold block">
              Tupe Brothers
            </span>
            <span className="text-base font-serif font-bold text-white">Atelier Admin</span>
          </div>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
        </button>
      </header>

      {/* ─── MOBILE SLIDE-OUT DRAWER ─── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-72 max-w-[85vw] bg-[#2B1E16] h-full flex flex-col z-10 shadow-2xl p-6 text-white border-r border-white/10">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C6A15B]" />
                <span className="font-serif text-lg font-bold">Admin Studio</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg bg-white/10 text-stone-300 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>

            <nav className="flex-1 py-4 space-y-1.5 overflow-y-auto">
              {links.map(({ label, to, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={linkClass}
                >
                  <Icon className="text-sm shrink-0" />
                  <span>{label}</span>
                </NavLink>
              ))}

              <div className="pt-4 border-t border-white/10 mt-4 space-y-1.5">
                <NavLink
                  to="/admin/settings"
                  onClick={() => setMobileOpen(false)}
                  className={linkClass}
                >
                  <FaCog className="text-sm shrink-0" />
                  <span>Studio Settings</span>
                </NavLink>
                <Link
                  to="/"
                  target="_blank"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-stone-400 hover:text-white hover:bg-white/10 transition"
                >
                  <FaExternalLinkAlt className="text-xs shrink-0" />
                  <span>Live Website</span>
                </Link>
              </div>
            </nav>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-stone-400 truncate">
                {admin?.email || 'admin@tupebrothers.in'}
              </span>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg bg-rose-950/60 text-rose-300 border border-rose-800/50"
              >
                <FaSignOutAlt />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
