// src/pages/ArchitecturalDesign.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaArrowRight,
  FaDraftingCompass,
  FaBuilding,
  FaRulerCombined,
  FaClipboardCheck,
  FaRegClock,
  FaShieldAlt,
  FaStar,
  FaCheckCircle,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useTheme } from '../context/ThemeContext';

const ArchitecturalDesign = () => {
  const { isNightMode } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/enquiry/add', {
        ...formData,
        message: `Architectural Design Enquiry: ${formData.message}`,
      });
      if (res.data.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  // Features data
  const features = [
    {
      icon: <FaDraftingCompass className="text-3xl text-[#C6A15B]" />,
      title: 'Architectural Planning',
      desc: 'Comprehensive floor plans, elevations, and section drawings tailored to your needs.',
    },
    {
      icon: <FaBuilding className="text-3xl text-[#C6A15B]" />,
      title: 'Structural Design',
      desc: 'Safe, sustainable structural solutions that comply with all building codes.',
    },
    {
      icon: <FaRulerCombined className="text-3xl text-[#C6A15B]" />,
      title: 'Space Optimization',
      desc: 'Maximise every square foot with intelligent layouts and efficient circulation.',
    },
    {
      icon: <FaClipboardCheck className="text-3xl text-[#C6A15B]" />,
      title: 'Project Consultancy',
      desc: 'End-to-end guidance from concept to completion – permits, budgeting, and more.',
    },
  ];

  // Process steps
  const processSteps = [
    { step: '01', title: 'Discovery', desc: 'We understand your vision, requirements, and site context.' },
    { step: '02', title: 'Concept Design', desc: 'We develop preliminary sketches and 3D visualisations.' },
    { step: '03', title: 'Design Development', desc: 'Detailed drawings, material selection, and approvals.' },
    { step: '04', title: 'Construction Support', desc: 'We oversee execution to ensure design integrity.' },
  ];

  // Portfolio projects (architectural)
  const projects = [
    {
      title: 'Modern Villa',
      category: 'Residential Architecture',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Corporate Headquarters',
      category: 'Commercial Architecture',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Luxury Apartment Complex',
      category: 'Residential Architecture',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Retail & Commercial Hub',
      category: 'Commercial Architecture',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className={`pt-20 min-h-screen transition-colors duration-500 ${
      isNightMode ? 'bg-[#0B0C0E] text-[#F3F4F6]' : 'bg-[#FCF9F7] text-[#111111]'
    }`}>

      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-[60vh] flex items-center px-4 sm:px-6 lg:px-16">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Architectural Design"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white max-w-3xl"
          >
            <span className="text-[#C6A15B] font-semibold tracking-widest text-sm uppercase">Architecture</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mt-2">
              Architectural Design & <br />
              <span className="text-[#C6A15B]">Consultancy</span>
            </h1>
            <p className="text-gray-300 text-lg mt-4 max-w-lg">
              From concept to completion – we design buildings that inspire, function, and stand the test of time.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('consultForm').scrollIntoView({ behavior: 'smooth' })}
              className="mt-6 bg-[#C6A15B] hover:bg-[#b08d4a] text-white px-8 py-3.5 rounded-full flex items-center gap-3 font-semibold transition-all duration-300 shadow-lg shadow-[#C6A15B]/25"
            >
              Get a Consultation <FaArrowRight />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURES SECTION ─── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[#C6A15B] font-semibold tracking-widest text-sm uppercase">What We Offer</span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mt-2 ${isNightMode ? 'text-white' : 'text-[#1a1410]'}`}>
              Our Architectural <span className="text-[#C6A15B]">Services</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-8 rounded-2xl border transition-all duration-300 text-center ${
                  isNightMode
                    ? 'bg-[#121316] border-stone-800/80 shadow-md hover:shadow-stone-900/50 hover:border-[#C6A15B]/40'
                    : 'bg-white border-neutral-200/80 shadow-md hover:shadow-xl hover:border-[#C6A15B]/40'
                }`}
              >
                <div className="w-16 h-16 bg-[#C6A15B]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isNightMode ? 'text-white' : 'text-[#1a1410]'}`}>{feature.title}</h3>
                <p className={`text-sm ${isNightMode ? 'text-neutral-400' : 'text-neutral-500'}`}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS SECTION ─── */}
      <section className={`py-20 px-4 sm:px-6 transition-colors duration-500 ${isNightMode ? 'bg-[#121316]/60' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[#C6A15B] font-semibold tracking-widest text-sm uppercase">How We Work</span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mt-2 ${isNightMode ? 'text-white' : 'text-[#1a1410]'}`}>
              Our <span className="text-[#C6A15B]">Process</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative p-6 text-center"
              >
                <div className="text-5xl font-bold text-[#C6A15B]/30 mb-3">{step.step}</div>
                <h3 className={`text-xl font-bold mb-2 ${isNightMode ? 'text-white' : 'text-[#1a1410]'}`}>{step.title}</h3>
                <p className={`text-sm ${isNightMode ? 'text-neutral-400' : 'text-neutral-500'}`}>{step.desc}</p>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 w-8 h-0.5 bg-[#C6A15B]/30 -translate-y-1/2"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO SECTION ─── */}
      <section className={`py-20 px-4 sm:px-6 transition-colors duration-500 ${isNightMode ? 'bg-[#0B0C0E]' : 'bg-[#FCF9F7]'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[#C6A15B] font-semibold tracking-widest text-sm uppercase">Our Work</span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mt-2 ${isNightMode ? 'text-white' : 'text-[#1a1410]'}`}>
              Featured <span className="text-[#C6A15B]">Projects</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/5] shadow-md hover:shadow-xl transition-all border ${
                  isNightMode ? 'border-stone-800' : 'border-neutral-200/50'
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-[#C6A15B] text-xs font-semibold tracking-wider uppercase">{project.category}</p>
                  <h4 className="text-white text-lg font-bold">{project.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className={`py-20 px-4 sm:px-6 transition-colors duration-500 ${isNightMode ? 'bg-[#121316]/60' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[#C6A15B] font-semibold tracking-widest text-sm uppercase">Why Us</span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mt-2 ${isNightMode ? 'text-white' : 'text-[#1a1410]'}`}>
              Why Choose <span className="text-[#C6A15B]">Us?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className={`flex items-start gap-4 p-6 rounded-2xl border transition-all ${
                isNightMode ? 'bg-[#15171C] border-stone-800' : 'bg-[#FCF9F7] border-neutral-200/60'
              }`}
            >
              <FaShieldAlt className="text-[#C6A15B] text-3xl flex-shrink-0 mt-1" />
              <div>
                <h4 className={`font-bold ${isNightMode ? 'text-white' : 'text-[#1a1410]'}`}>Licensed & Certified</h4>
                <p className={`text-sm ${isNightMode ? 'text-neutral-400' : 'text-neutral-500'}`}>All our architects are registered professionals.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className={`flex items-start gap-4 p-6 rounded-2xl border transition-all ${
                isNightMode ? 'bg-[#15171C] border-stone-800' : 'bg-[#FCF9F7] border-neutral-200/60'
              }`}
            >
              <FaRegClock className="text-[#C6A15B] text-3xl flex-shrink-0 mt-1" />
              <div>
                <h4 className={`font-bold ${isNightMode ? 'text-white' : 'text-[#1a1410]'}`}>On-Time Delivery</h4>
                <p className={`text-sm ${isNightMode ? 'text-neutral-400' : 'text-neutral-500'}`}>We respect your deadlines and budget.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className={`flex items-start gap-4 p-6 rounded-2xl border transition-all ${
                isNightMode ? 'bg-[#15171C] border-stone-800' : 'bg-[#FCF9F7] border-neutral-200/60'
              }`}
            >
              <FaStar className="text-[#C6A15B] text-3xl flex-shrink-0 mt-1" />
              <div>
                <h4 className={`font-bold ${isNightMode ? 'text-white' : 'text-[#1a1410]'}`}>100% Satisfaction</h4>
                <p className={`text-sm ${isNightMode ? 'text-neutral-400' : 'text-neutral-500'}`}>We go the extra mile to exceed expectations.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CONSULTATION FORM ─── */}
      <section className="py-20 px-4 sm:px-6 bg-[#1a1410]">
        <div className="max-w-4xl mx-auto" id="consultForm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-[#C6A15B] font-semibold tracking-widest text-sm uppercase">Get Started</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
              Let's Discuss Your <span className="text-[#C6A15B]">Project</span>
            </h2>
            <p className="text-gray-400 mt-2">Fill in the details and our team will reach out to you.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20"
          >
            {success && (
              <div className="bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 p-3 rounded-xl mb-4 text-center">
                ✅ Enquiry sent! We'll contact you within 24 hours.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-400 focus:outline-none focus:border-[#C6A15B]"
                  onChange={handleChange}
                  value={formData.name}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-400 focus:outline-none focus:border-[#C6A15B]"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-400 focus:outline-none focus:border-[#C6A15B]"
                onChange={handleChange}
                value={formData.phone}
              />
              <textarea
                name="message"
                placeholder="Tell us about your architectural project..."
                rows="3"
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-400 focus:outline-none focus:border-[#C6A15B] resize-none"
                onChange={handleChange}
                value={formData.message}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C6A15B] hover:bg-[#b08d4a] text-white font-bold py-3.5 rounded-xl transition disabled:opacity-70"
              >
                {loading ? 'Submitting...' : 'Send Enquiry'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default ArchitecturalDesign;