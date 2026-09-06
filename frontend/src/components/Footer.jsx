// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FiStar, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const Footer = () => {
  const { isNightMode } = useTheme();

  return (
    <footer className={`transition-colors duration-500 border-t ${
      isNightMode 
        ? 'bg-[#0B0C0E] border-white/10 text-white' 
        : 'bg-[#111111] border-neutral-800 text-white'
    }`}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 py-10 sm:py-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-800/80">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 text-2xl font-extrabold tracking-tight text-white group">
              <span className="w-3.5 h-3.5 rounded-full bg-[#F5A623] inline-block transition-transform duration-300 group-hover:scale-125" />
              <span className="font-extrabold tracking-wider text-white uppercase text-2xl">
                ELEVATURA
              </span>
            </Link>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-sm">
              Transforming living and commercial environments with bespoke architecture, interior styling, and turnkey civil construction.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-[#F5A623]">
              <FiStar className="w-3.5 h-3.5 fill-[#F5A623]" />
              <FiStar className="w-3.5 h-3.5 fill-[#F5A623]" />
              <FiStar className="w-3.5 h-3.5 fill-[#F5A623]" />
              <FiStar className="w-3.5 h-3.5 fill-[#F5A623]" />
              <FiStar className="w-3.5 h-3.5 fill-[#F5A623]" />
              <span className="text-neutral-400 ml-1.5 font-normal">Award Winning Interior • Since 2002</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-white text-xs font-extrabold uppercase tracking-widest text-[#F5A623]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Journal</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Expertise */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-white text-xs font-extrabold uppercase tracking-widest text-[#F5A623]">
              Expertise
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li><Link to="/services/residential" className="hover:text-white transition-colors">Residential Design</Link></li>
              <li><Link to="/services/commercial" className="hover:text-white transition-colors">Commercial Spaces</Link></li>
              <li><Link to="/services/architectural" className="hover:text-white transition-colors">Architectural CAD</Link></li>
              <li><Link to="/services/renovation" className="hover:text-white transition-colors">Civil Construction</Link></li>
              <li><Link to="/services/consultation" className="hover:text-white transition-colors">Design Advisory</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white text-xs font-extrabold uppercase tracking-widest text-[#F5A623]">
              Design Studios
            </h4>
            <div className="text-sm text-neutral-400 space-y-2.5">
              <p className="flex items-center gap-2">
                <FiMapPin className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                <span>Bandra West & Worli, Mumbai, MH</span>
              </p>
              <p className="flex items-center gap-2">
                <FiPhone className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                <span>+91 98765 43210</span>
              </p>
              <p className="flex items-center gap-2">
                <FiMail className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                <span>studio@elevatura.design</span>
              </p>
              <p className="text-xs text-neutral-500 pt-1">Mon – Sat: 9:00 AM – 7:00 PM</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} ELEVATURA Design & Architecture. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-neutral-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-400 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-neutral-400 transition-colors cursor-pointer">Sitemap</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;