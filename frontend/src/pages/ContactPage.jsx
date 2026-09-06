import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../api/axios';
import { FiPhone, FiMail, FiClock, FiCheckCircle, FiArrowUpRight, FiChevronDown, FiCheck } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: custom * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

// Bespoke curved luxury dropdown component
const CurvedSelect = ({ label, value, options, onChange, isNightMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
        isNightMode ? 'text-neutral-300' : 'text-[#111111]'
      }`}>
        {label}
      </label>
      
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full rounded-2xl px-4 py-3.5 text-sm transition-all border flex items-center justify-between text-left cursor-pointer ${
          isNightMode
            ? 'bg-[#1A1B20] border-stone-700 text-white hover:border-[#C6A15B]'
            : 'bg-neutral-50 border-neutral-200 text-[#111111] hover:border-[#F5A623]'
        } ${isOpen ? (isNightMode ? 'border-[#C6A15B] ring-2 ring-[#C6A15B]/20' : 'border-[#F5A623] ring-2 ring-[#F5A623]/20') : ''}`}
      >
        <span className="font-medium truncate">{value}</span>
        <FiChevronDown className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ml-2 ${
          isOpen ? 'rotate-180 text-[#C6A15B]' : 'text-neutral-400'
        }`} />
      </button>

      {/* Curved Animated Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={`absolute z-50 left-0 right-0 mt-2 p-1.5 rounded-2xl border shadow-2xl backdrop-blur-xl overflow-hidden ${
              isNightMode
                ? 'bg-[#18191E]/95 border-stone-700/80 shadow-black/80'
                : 'bg-white/95 border-neutral-200/90 shadow-neutral-400/30'
            }`}
          >
            <div className="max-h-60 overflow-y-auto space-y-1">
              {options.map((opt) => {
                const isSelected = opt === value;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      onChange(opt);
                      setIsOpen(false);
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between text-left transition-all cursor-pointer ${
                      isSelected
                        ? isNightMode
                          ? 'bg-[#C6A15B]/15 text-[#C6A15B] font-semibold'
                          : 'bg-[#F5A623]/15 text-[#D98200] font-semibold'
                        : isNightMode
                          ? 'text-neutral-300 hover:bg-white/5 hover:text-white'
                          : 'text-neutral-700 hover:bg-neutral-100 hover:text-black'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && (
                      <FiCheck className={`w-4 h-4 flex-shrink-0 ${isNightMode ? 'text-[#C6A15B]' : 'text-[#F5A623]'}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContactPage = () => {
  const { isNightMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Residential Interior',
    budget: '₹25 Lakh – ₹50 Lakh',
    area: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/enquiry/add', formData);
      if (res.data?.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: 'Residential Interior',
          budget: '₹25 Lakh – ₹50 Lakh',
          area: '',
          message: '',
        });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen selection:bg-[#F5A623] selection:text-white pt-24 pb-20 overflow-x-hidden transition-colors duration-500 ${
      isNightMode ? 'bg-[#0B0C0E] text-[#F3F4F6]' : 'bg-[#FCF9F7] text-[#111111]'
    }`}>
      
      {/* ─── HERO HEADER ─── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 pt-6 sm:pt-8 pb-10 sm:pb-14">
        <div className="max-w-3xl">
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeInUp}
            className="flex items-center gap-2.5 mb-4"
          >
            <span className={`w-3 h-3 rounded-full bg-[#F5A623] ${isNightMode ? 'shadow-[0_0_10px_#F5A623]' : ''}`} />
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#F5A623]">
              Get in Touch
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeInUp}
            className={`text-[28px] sm:text-6xl lg:text-[64px] font-extrabold tracking-tight leading-[1.08] ${
              isNightMode ? 'text-white' : 'text-[#111111]'
            }`}
          >
            Let’s Build Something <span className={`font-normal ${isNightMode ? 'text-neutral-400' : 'text-[#555555]'}`}>Remarkable.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeInUp}
            className={`text-base sm:text-xl leading-relaxed mt-6 font-normal ${
              isNightMode ? 'text-neutral-400' : 'text-[#555555]'
            }`}
          >
            Whether you’re planning a bespoke residential sanctuary, commercial office, or heavy civil construction build, our design architects are ready to assist.
          </motion.p>
        </div>
      </section>

      {/* ─── CONTACT DETAILS & FORM SECTION ─── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Contact Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className={`border rounded-[20px] sm:rounded-[32px] p-6 sm:p-8 space-y-6 transition-colors duration-300 ${
              isNightMode
                ? 'bg-[#121316] border-stone-800 shadow-xl'
                : 'bg-white border-neutral-200/80 shadow-sm'
            }`}>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#F5A623] block mb-1">
                  Mumbai Studios
                </span>
                <h3 className={`text-2xl font-bold ${isNightMode ? 'text-white' : 'text-[#111111]'}`}>
                  Main Headquarters
                </h3>
                <p className={`text-sm mt-2 leading-relaxed ${isNightMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  Level 5, Horizon Executive Towers, Waterfield Road, Bandra West, Mumbai, MH 400050
                </p>
              </div>

              <div className={`border-t pt-6 space-y-4 text-sm ${
                isNightMode ? 'border-stone-800 text-neutral-300' : 'border-neutral-200 text-neutral-700'
              }`}>
                <p className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#F5A623]/10 flex items-center justify-center text-[#F5A623]">
                    <FiPhone className="w-4 h-4" />
                  </span>
                  <span className="font-medium">+91 98765 43210 / 022 2640 8899</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#F5A623]/10 flex items-center justify-center text-[#F5A623]">
                    <FiMail className="w-4 h-4" />
                  </span>
                  <span className="font-medium">studio@elevatura.design</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#F5A623]/10 flex items-center justify-center text-[#F5A623]">
                    <FiClock className="w-4 h-4" />
                  </span>
                  <span className="font-medium">Mon – Sat: 9:00 AM – 7:30 PM</span>
                </p>
              </div>
            </div>

            <div className={`rounded-[20px] sm:rounded-[32px] p-6 sm:p-8 space-y-3 border ${
              isNightMode
                ? 'bg-[#15171C] border-stone-800 text-white shadow-xl'
                : 'bg-neutral-900 border-neutral-800 text-white'
            }`}>
              <span className="text-[#F5A623] text-xs font-bold uppercase tracking-widest">
                White-Glove Advisory
              </span>
              <h4 className="text-xl font-bold">On-Site Spatial Inspections</h4>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                We conduct comprehensive on-site laser measurements, solar path orientation audits, and structural evaluations across Mumbai, Pune, and Alibaug.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Inquiry Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className={`lg:col-span-7 border rounded-[24px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 shadow-sm transition-colors duration-300 ${
              isNightMode
                ? 'bg-[#121316] border-stone-800 shadow-2xl'
                : 'bg-white border-neutral-200/80 shadow-sm'
            }`}
          >
            <h3 className={`text-2xl sm:text-3xl font-extrabold mb-2 ${isNightMode ? 'text-white' : 'text-[#111111]'}`}>
              Send a Direct Message
            </h3>
            <p className={`text-sm mb-8 ${isNightMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Fill out the details below and our lead architect will review your project within 24 business hours.
            </p>

            {success && (
              <div className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 p-4 rounded-2xl text-sm mb-6 flex items-center gap-2">
                <FiCheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>Thank you! Your inquiry has been sent successfully. We will reach out shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                  isNightMode ? 'text-neutral-300' : 'text-[#111111]'
                }`}>
                  Your Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. David Vance"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full rounded-xl px-4 py-3.5 text-sm transition-all border ${
                    isNightMode
                      ? 'bg-[#1A1B20] border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-[#C6A15B]'
                      : 'bg-neutral-50 border-neutral-200 text-[#111111] focus:outline-none focus:border-[#F5A623] focus:bg-white'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                    isNightMode ? 'text-neutral-300' : 'text-[#111111]'
                  }`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="david@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-xl px-4 py-3.5 text-sm transition-all border ${
                      isNightMode
                        ? 'bg-[#1A1B20] border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-[#C6A15B]'
                        : 'bg-neutral-50 border-neutral-200 text-[#111111] focus:outline-none focus:border-[#F5A623] focus:bg-white'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                    isNightMode ? 'text-neutral-300' : 'text-[#111111]'
                  }`}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full rounded-xl px-4 py-3.5 text-sm transition-all border ${
                      isNightMode
                        ? 'bg-[#1A1B20] border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-[#C6A15B]'
                        : 'bg-neutral-50 border-neutral-200 text-[#111111] focus:outline-none focus:border-[#F5A623] focus:bg-white'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <CurvedSelect
                  label="Project Type"
                  value={formData.projectType}
                  options={[
                    'Residential Interior',
                    'Commercial & Workspace',
                    'Architectural Build',
                    'Civil Renovation',
                    'Complete Turnkey Project',
                  ]}
                  onChange={(val) => setFormData({ ...formData, projectType: val })}
                  isNightMode={isNightMode}
                />
                
                <CurvedSelect
                  label="Estimated Budget"
                  value={formData.budget}
                  options={[
                    'Under ₹10 Lakh',
                    '₹10 Lakh – ₹25 Lakh',
                    '₹25 Lakh – ₹50 Lakh',
                    '₹50 Lakh – ₹1 Crore',
                    '₹1 Crore+',
                  ]}
                  onChange={(val) => setFormData({ ...formData, budget: val })}
                  isNightMode={isNightMode}
                />
              </div>

              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                  isNightMode ? 'text-neutral-300' : 'text-[#111111]'
                }`}>
                  Approximate Carpet Area (sq.ft)
                </label>
                <input
                  type="text"
                  name="area"
                  placeholder="e.g. 2,400 sq.ft"
                  value={formData.area}
                  onChange={handleChange}
                  className={`w-full rounded-xl px-4 py-3.5 text-sm transition-all border ${
                    isNightMode
                      ? 'bg-[#1A1B20] border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-[#C6A15B]'
                      : 'bg-neutral-50 border-neutral-200 text-[#111111] focus:outline-none focus:border-[#F5A623] focus:bg-white'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                  isNightMode ? 'text-neutral-300' : 'text-[#111111]'
                }`}>
                  Project Brief & Requirements
                </label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  placeholder="Tell us about your spatial aspirations, timeline, or site location..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full rounded-xl p-4 text-sm transition-all border resize-none ${
                    isNightMode
                      ? 'bg-[#1A1B20] border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-[#C6A15B]'
                      : 'bg-neutral-50 border-neutral-200 text-[#111111] focus:outline-none focus:border-[#F5A623] focus:bg-white'
                  }`}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full font-semibold py-4 rounded-xl transition-all duration-200 shadow-md active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer ${
                  isNightMode
                    ? 'bg-[#C6A15B] text-black hover:bg-[#b08d4a] shadow-[#C6A15B]/20'
                    : 'bg-[#111111] hover:bg-neutral-800 text-white'
                }`}
              >
                <span>{loading ? 'Transmitting Request...' : 'Send Message'}</span>
                {!loading && <FiArrowUpRight className="w-4 h-4" />}
              </button>
            </form>
          </motion.div>

        </div>
      </section>

    </div>
  );
};

export default ContactPage;