// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiHome, FiCompass, FiGrid, FiMail } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const NotFoundPage = () => {
  const { isNightMode } = useTheme();
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen pt-24 pb-16 flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${
      isNightMode ? 'bg-[#0B0C0E] text-white' : 'bg-[#FCF9F7] text-[#111111]'
    }`}>
      
      {/* Ambient Architectural Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Architectural Blueprint Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle, ${isNightMode ? '#C6A15B' : '#2B1E16'} 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Ambient Light Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#C6A15B]/20 blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#F5A623]/15 blur-[120px]"
        />

        {/* Giant Watermark 404 */}
        <div className="absolute inset-0 flex items-center justify-center select-none opacity-[0.03] dark:opacity-[0.04]">
          <span className="text-[28vw] font-extrabold tracking-tighter leading-none font-serif">
            404
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C6A15B]/30 bg-[#C6A15B]/10 text-[#C6A15B] text-xs font-bold uppercase tracking-[0.25em] mb-6"
        >
          <FiCompass className="animate-spin text-sm" style={{ animationDuration: '12s' }} />
          <span>Spatial Coordinate Missing</span>
        </motion.div>

        {/* Architectural 404 Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative inline-block mb-4"
        >
          <h1 className="text-7xl sm:text-9xl font-extrabold tracking-tight font-sans">
            4<span className="text-[#C6A15B]">0</span>4
          </h1>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-[#C6A15B]" />
        </motion.div>

        {/* Headline & Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4 max-w-xl mx-auto mt-6"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            This room has not been designed yet.
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${
            isNightMode ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            The architectural blueprint or page URL you are attempting to reach does not exist, has been relocated, or is currently undergoing renovation.
          </p>
        </motion.div>

        {/* Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
        >
          <button
            onClick={() => navigate(-1)}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border transition-all duration-300 ${
              isNightMode
                ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                : 'bg-white border-neutral-200 hover:bg-neutral-100 text-neutral-800 shadow-sm'
            }`}
          >
            <FiArrowLeft /> Go Back
          </button>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold bg-[#C6A15B] text-white hover:bg-[#b08d4a] transition-all duration-300 shadow-lg hover:shadow-[#C6A15B]/30 hover:scale-[1.02]"
          >
            <FiHome /> Grand Foyer (Home)
          </Link>
        </motion.div>

        {/* Spatial Quick Links Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`mt-14 p-6 sm:p-8 rounded-3xl border backdrop-blur-md text-left ${
            isNightMode
              ? 'bg-[#15171C]/70 border-white/10 shadow-2xl'
              : 'bg-white/80 border-neutral-200 shadow-xl'
          }`}
        >
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#C6A15B] mb-4">
            Where would you like to explore next?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/portfolio"
              className={`p-4 rounded-2xl border transition-all duration-200 group flex items-start gap-3.5 ${
                isNightMode
                  ? 'bg-white/5 border-white/5 hover:border-[#C6A15B]/40 hover:bg-white/10'
                  : 'bg-neutral-50 border-neutral-200 hover:border-[#C6A15B]/40 hover:bg-white'
              }`}
            >
              <span className="p-2.5 rounded-xl bg-[#C6A15B]/15 text-[#C6A15B] text-lg group-hover:scale-110 transition-transform">
                <FiGrid />
              </span>
              <div>
                <h3 className="font-bold text-sm group-hover:text-[#C6A15B] transition-colors">
                  Spatial Portfolio
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Discover curated residences & commercial suites.
                </p>
              </div>
            </Link>

            <Link
              to="/gallery"
              className={`p-4 rounded-2xl border transition-all duration-200 group flex items-start gap-3.5 ${
                isNightMode
                  ? 'bg-white/5 border-white/5 hover:border-[#C6A15B]/40 hover:bg-white/10'
                  : 'bg-neutral-50 border-neutral-200 hover:border-[#C6A15B]/40 hover:bg-white'
              }`}
            >
              <span className="p-2.5 rounded-xl bg-[#C6A15B]/15 text-[#C6A15B] text-lg group-hover:scale-110 transition-transform">
                <FiCompass />
              </span>
              <div>
                <h3 className="font-bold text-sm group-hover:text-[#C6A15B] transition-colors">
                  Visual Gallery
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  High-res archive of custom joinery & marble spaces.
                </p>
              </div>
            </Link>

            <Link
              to="/contact"
              className={`p-4 rounded-2xl border transition-all duration-200 group flex items-start gap-3.5 ${
                isNightMode
                  ? 'bg-white/5 border-white/5 hover:border-[#C6A15B]/40 hover:bg-white/10'
                  : 'bg-neutral-50 border-neutral-200 hover:border-[#C6A15B]/40 hover:bg-white'
              }`}
            >
              <span className="p-2.5 rounded-xl bg-[#C6A15B]/15 text-[#C6A15B] text-lg group-hover:scale-110 transition-transform">
                <FiMail />
              </span>
              <div>
                <h3 className="font-bold text-sm group-hover:text-[#C6A15B] transition-colors">
                  Contact Studio
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Speak directly with our design architects.
                </p>
              </div>
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default NotFoundPage;
