// src/components/InquiryForm.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiSend, FiAlertCircle } from 'react-icons/fi';
import API from '../api/axios';
import { useTheme } from '../context/ThemeContext';

const InquiryForm = ({ defaultService = 'Residential Design', className = '' }) => {
  const { isNightMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: defaultService,
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `[Service: ${formData.serviceType}] - ${formData.message}`,
      };

      const res = await API.post('/enquiry/add', payload);
      if (res.data?.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceType: defaultService,
          message: '',
        });
      } else {
        setError(res.data?.message || 'Unable to submit enquiry. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 ${
      isNightMode
        ? 'bg-[#15171C] border-white/10 shadow-2xl'
        : 'bg-white border-neutral-200 shadow-xl'
    } ${className}`}>
      
      <div className="mb-6">
        <span className="text-[#C6A15B] text-xs font-bold uppercase tracking-[0.2em]">
          Direct Studio Intake
        </span>
        <h3 className="text-2xl font-bold mt-1">Book a Design Consultation</h3>
        <p className={`text-xs sm:text-sm mt-2 ${isNightMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
          Share your spatial vision. Our principal architects will reach out within 24 hours.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="py-10 text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-3xl mx-auto border border-emerald-500/20">
              <FiCheckCircle />
            </div>
            <h4 className="text-xl font-bold">Enquiry Received</h4>
            <p className="text-sm text-neutral-400 max-w-sm mx-auto">
              Thank you for reaching out. We have logged your project brief and will contact you shortly.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-4 px-6 py-2.5 rounded-full text-xs font-semibold bg-[#C6A15B] text-white hover:bg-[#b08d4a] transition"
            >
              Send Another Note
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs">
                <FiAlertCircle className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Sameer Kapoor"
                className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                  isNightMode
                    ? 'bg-white/5 border-white/10 focus:border-[#C6A15B] text-white'
                    : 'bg-neutral-50 border-neutral-200 focus:border-[#C6A15B] text-[#111111]'
                }`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                    isNightMode
                      ? 'bg-white/5 border-white/10 focus:border-[#C6A15B] text-white'
                      : 'bg-neutral-50 border-neutral-200 focus:border-[#C6A15B] text-[#111111]'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                    isNightMode
                      ? 'bg-white/5 border-white/10 focus:border-[#C6A15B] text-white'
                      : 'bg-neutral-50 border-neutral-200 focus:border-[#C6A15B] text-[#111111]'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                Service Interest
              </label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                  isNightMode
                    ? 'bg-[#15171C] border-white/10 focus:border-[#C6A15B] text-white'
                    : 'bg-neutral-50 border-neutral-200 focus:border-[#C6A15B] text-[#111111]'
                }`}
              >
                <option value="Residential Design">Bespoke Residential Architecture</option>
                <option value="Commercial Spaces">Commercial & Workplace Environments</option>
                <option value="Complete Renovation">Turnkey Civil Construction & Renovation</option>
                <option value="Design Advisory">Master Design Consultation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                Project Scope & Details *
              </label>
              <textarea
                name="message"
                required
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your location, approximate square footage, timeline, and aesthetic preferences..."
                className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition resize-none ${
                  isNightMode
                    ? 'bg-white/5 border-white/10 focus:border-[#C6A15B] text-white'
                    : 'bg-neutral-50 border-neutral-200 focus:border-[#C6A15B] text-[#111111]'
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full font-semibold text-sm bg-[#C6A15B] hover:bg-[#b08d4a] text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Send Project Brief</span>
                  <FiSend className="text-xs" />
                </>
              )}
            </button>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InquiryForm;
