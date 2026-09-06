// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isNightMode, toggleTheme } = useTheme();
  const location = useLocation();

  // If on admin routes, don't show the public navbar
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return null;
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/portfolio' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Journal', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-300 ${
      isNightMode 
        ? 'bg-[#0B0C0E]/90 border-b border-white/10 text-white' 
        : 'bg-white/95 border-b border-neutral-100 text-[#111111]'
    }`}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Brand Logo - ● ELEVATURA */}
          <Link 
            to="/" 
            className={`flex items-center gap-2.5 text-2xl font-extrabold tracking-tight group ${
              isNightMode ? 'text-white' : 'text-[#111111]'
            }`}
          >
            {/* Orange dot with ambient glow in night mode */}
            <span className={`w-3.5 h-3.5 rounded-full bg-[#F5A623] inline-block transition-all duration-300 group-hover:scale-125 ${
              isNightMode ? 'shadow-[0_0_12px_#F5A623]' : ''
            }`} />
            <span className="font-extrabold tracking-wider uppercase text-xl sm:text-2xl">
              ELEVATURA
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-9">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[15px] font-medium transition-colors duration-200 ${
                  isNightMode 
                    ? 'text-neutral-300 hover:text-[#F5A623]' 
                    : 'text-[#222222] hover:text-[#F5A623]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Section: CTA Button + Minimal Theme Toggle Icon */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Right Action Button - Get Started */}
            <div className="hidden sm:flex items-center">
              <Link
                to="/contact"
                className={`px-5 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-sm active:scale-95 cursor-pointer ${
                  isNightMode
                    ? 'bg-[#F5A623] hover:bg-[#E59719] text-[#111111] font-semibold shadow-[0_0_15px_rgba(245,166,35,0.25)]'
                    : 'bg-[#111111] hover:bg-neutral-800 text-white'
                }`}
              >
                Get Started
              </Link>
            </div>

            {/* Minimal Day / Night Theme Icon Toggle Button (Right Side of Get Started) */}
            <button
              onClick={toggleTheme}
              aria-label={isNightMode ? "Switch to Day Mode" : "Switch to Night Mode"}
              title={isNightMode ? "Switch to Day Mode" : "Switch to Night Mode"}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-transform duration-300 cursor-pointer active:scale-90 bg-transparent ${
                isNightMode ? 'text-[#F5A623]' : 'text-[#F5A623]'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isNightMode ? 'night' : 'day'}
                  initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="flex items-center justify-center"
                >
                  {isNightMode ? (
                    <FiMoon className="w-[19px] h-[19px] text-[#F5A623]" />
                  ) : (
                    <FiSun className="w-[19px] h-[19px] text-[#F5A623]" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 transition-colors focus:outline-none ${
                isNightMode ? 'text-white hover:text-[#F5A623]' : 'text-[#111111] hover:text-[#F5A623]'
              }`}
              aria-label="Toggle navigation menu"
            >
              <div className="w-6 flex flex-col items-end gap-1.5 cursor-pointer">
                <span className={`h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
                <span className={`h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'w-5'}`} />
                <span className={`h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-4'}`} />
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Slide-out / Dropdown Menu for Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`md:hidden px-6 py-6 shadow-2xl border-t ${
              isNightMode 
                ? 'bg-[#0E0F13] border-white/10 text-white' 
                : 'bg-white border-neutral-100 text-[#111111]'
            }`}
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium transition-colors py-1 ${
                    isNightMode ? 'text-neutral-200 hover:text-[#F5A623]' : 'text-[#111111] hover:text-[#F5A623]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className={`pt-4 border-t ${isNightMode ? 'border-white/10' : 'border-neutral-100'} flex flex-col gap-3`}>
                <button
                  onClick={toggleTheme}
                  className={`w-full py-2.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 border ${
                    isNightMode 
                      ? 'bg-[#18191E] border-amber-500/30 text-amber-400' 
                      : 'bg-neutral-100 border-neutral-200 text-neutral-800'
                  }`}
                >
                  {isNightMode ? <FiMoon className="w-4 h-4 text-[#F5A623]" /> : <FiSun className="w-4 h-4 text-amber-500" />}
                  <span>{isNightMode ? 'Night Mode' : 'Day Mode'}</span>
                </button>

                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-center py-3 rounded-full text-sm font-medium ${
                    isNightMode 
                      ? 'bg-[#F5A623] text-[#111111] font-semibold' 
                      : 'bg-[#111111] text-white'
                  }`}
                >
                  Get Started Today
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;