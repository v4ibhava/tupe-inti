import React from 'react';
import { motion } from 'framer-motion';
import { FaTools, FaArrowRight, FaBath, FaUtensils, FaPaintRoller, FaLayerGroup } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const RenovationPage = () => {
  const { isNightMode } = useTheme();

  const highlights = [
    {
      icon: <FaUtensils className="text-[#C6A15B] text-xl" />,
      title: 'Kitchen Transformations',
      desc: 'Smart modular cabinetry, stone waterfall counters, and integrated appliance architecture.'
    },
    {
      icon: <FaBath className="text-[#C6A15B] text-xl" />,
      title: 'Luxury Bath & Spa Remodeling',
      desc: 'Seamless microcement, frameless fluted glass, rain showers, and backlit floating vanities.'
    },
    {
      icon: <FaPaintRoller className="text-[#C6A15B] text-xl" />,
      title: 'Full Home Refurbishment',
      desc: 'Structural reconfiguration, concealed electrical overhauls, and bespoke millwork.'
    },
    {
      icon: <FaLayerGroup className="text-[#C6A15B] text-xl" />,
      title: 'Premium Material Upgrades',
      desc: 'Herringbone flooring, acoustic wall paneling, and curated designer architectural fittings.'
    },
  ];

  return (
    <div className={`pt-24 min-h-screen transition-colors duration-500 ${
      isNightMode ? 'bg-[#0B0C0E] text-[#F3F4F6]' : 'bg-[#FCF9F7] text-[#111111]'
    }`}>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-[#C6A15B] font-bold tracking-[0.25em] text-xs uppercase">Renovation & Remodeling</span>
          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight mt-3 ${isNightMode ? 'text-white' : 'text-[#1a1410]'}`}>
            Refresh Your Space with <span className="text-[#C6A15B]">Bespoke Renovation</span>
          </h1>
          <p className={`max-w-2xl mx-auto mt-4 text-base ${isNightMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Whether it is an artisanal kitchen revival, bathroom spa transformation, or full estate remodeling, we rebuild with unmatched precision and refined aesthetics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-2xl border border-[#C6A15B]/20 relative group"
          >
            <img
              src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80"
              alt="Renovation craftsmanship"
              loading="lazy"
              className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="bg-[#C6A15B] text-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Transformations
              </span>
              <p className="text-white text-lg font-bold mt-2">Precision Architectural Remodeling</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all ${
                    isNightMode
                      ? 'bg-[#15171C] border-stone-800 hover:border-[#C6A15B]/50'
                      : 'bg-white border-neutral-200/80 hover:border-[#C6A15B]/50 shadow-sm'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#C6A15B]/10 flex items-center justify-center mb-3">
                    {item.icon}
                  </div>
                  <h4 className={`font-bold text-base mb-1 ${isNightMode ? 'text-white' : 'text-[#1a1410]'}`}>{item.title}</h4>
                  <p className={`text-xs leading-relaxed ${isNightMode ? 'text-neutral-400' : 'text-neutral-500'}`}>{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="bg-[#C6A15B] hover:bg-[#b08d4a] text-white px-7 py-3.5 rounded-full font-semibold inline-flex items-center gap-2 transition-all duration-300 shadow-lg shadow-[#C6A15B]/25"
              >
                Plan Your Renovation <FaArrowRight className="text-sm" />
              </Link>
              <Link
                to="/portfolio"
                className={`px-7 py-3.5 rounded-full font-semibold inline-flex items-center gap-2 border transition-all duration-300 ${
                  isNightMode
                    ? 'border-stone-700 text-neutral-300 hover:bg-stone-800'
                    : 'border-neutral-300 text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                View Transformations
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RenovationPage;
