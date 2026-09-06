import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCompass, FiFeather, FiShield, FiClock, FiArrowUpRight } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

// Assets
import elevaturaLivingImg from '../assets/elevatura_living.jpg';
import elevaturaChairImg from '../assets/elevatura_chair.jpg';
import serviceArchitectureImg from '../assets/service_architecture.jpg';

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

const teamMembers = [
  { name: 'Sarah Jenkins', role: 'Principal Architect & Founder', specialty: 'Spatial Geometry & Luxury Living', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' },
  { name: 'Marcus Sterling', role: 'Head of Civil Engineering', specialty: 'Structural Framing & Turnkey Build', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80' },
  { name: 'Elena Rostova', role: 'Lead Interior Stylist', specialty: 'Scandinavian Textiles & Lighting', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80' },
  { name: 'Aarav Mehta', role: 'Chief Project Superintendent', specialty: 'BIM Integration & On-Site Quality', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80' },
];

const values = [
  {
    icon: FiCompass,
    title: 'Architectural Rigor',
    desc: 'Every millimetre is planned with mathematical clarity, structural durability, and ergonomic flow.',
  },
  {
    icon: FiFeather,
    title: 'Biophilic Harmony',
    desc: 'Connecting interior sanctuaries with natural light, organic materials, and sustainable energy efficiency.',
  },
  {
    icon: FiShield,
    title: 'Turnkey Accountability',
    desc: 'From initial sketch and municipal permissions to foundation pouring and white-glove staging.',
  },
  {
    icon: FiClock,
    title: 'Precision Timeline',
    desc: 'Milestone-backed delivery commitments ensuring your home is handed over smoothly and on schedule.',
  },
];

const AboutPage = () => {
  const { isNightMode } = useTheme();

  return (
    <div className={`min-h-screen selection:bg-[#F5A623] selection:text-white pt-24 pb-20 overflow-x-hidden transition-colors duration-500 ${
      isNightMode ? 'bg-[#0B0C0E] text-[#F3F4F6]' : 'bg-white text-[#111111]'
    }`}>
      
      {/* ─── HERO HEADER ─── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 pt-6 sm:pt-8 pb-10 sm:pb-16">
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
              About Elevatura
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeInUp}
            className={`text-[28px] sm:text-6xl font-extrabold tracking-tight leading-[1.1] ${
              isNightMode ? 'text-white' : 'text-[#111111]'
            }`}
          >
            Pioneering Spatial Elegance & Structural Mastery
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeInUp}
            className={`text-lg sm:text-xl font-normal mt-6 leading-relaxed ${
              isNightMode ? 'text-neutral-400' : 'text-neutral-600'
            }`}
          >
            Founded on the belief that environment shapes human emotion, ELEVATURA is a multidisciplinary design atelier and civil execution firm crafting refined residential and commercial architecture.
          </motion.p>
        </div>
      </section>

      {/* ─── IMAGE GRID & STUDIO ESSENCE ─── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 pb-14 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Visual Showcase */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4 sm:space-y-6">
              <div className={`rounded-[20px] sm:rounded-[32px] overflow-hidden aspect-[4/5] shadow-md border ${
                isNightMode ? 'bg-[#15171C] border-stone-800' : 'bg-neutral-100 border-neutral-200/50'
              }`}>
                <img
                  src={elevaturaLivingImg}
                  alt="Elevatura Living Architecture"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`rounded-[20px] sm:rounded-[32px] overflow-hidden aspect-square shadow-md border ${
                isNightMode ? 'bg-[#15171C] border-stone-800' : 'bg-neutral-100 border-neutral-200/50'
              }`}>
                <img
                  src={elevaturaChairImg}
                  alt="Bespoke Furnishings"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="pt-8 sm:pt-12">
              <div className={`rounded-[20px] sm:rounded-[32px] overflow-hidden aspect-[3/4] shadow-md border ${
                isNightMode ? 'bg-[#15171C] border-stone-800' : 'bg-neutral-100 border-neutral-200/50'
              }`}>
                <img
                  src={serviceArchitectureImg}
                  alt="Precision Civil Engineering"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Narrative */}
          <div className="lg:col-span-5 space-y-6 lg:pl-6">
            <span className="text-[#F5A623] text-xs font-extrabold uppercase tracking-widest block">
              Our Philosophy
            </span>
            <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight ${
              isNightMode ? 'text-white' : 'text-[#111111]'
            }`}>
              Design is not merely what it looks like. It is how it feels and endures.
            </h2>
            <p className={`text-base leading-relaxed ${isNightMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
              We believe a home is more than an aesthetic arrangement; it is a living ecosystem that shapes your daily well-being. Our holistic methodology bridges the gap between raw structural construction and the refined poetry of bespoke interior design.
            </p>
            <p className={`text-base leading-relaxed ${isNightMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
              With over 20 years of continuous practice across Mumbai, Pune, and Alibaug, our studio delivers turnkey certainty—managing every sketch, permit, foundation pour, and fabric swatch under one accountable roof.
            </p>

            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/portfolio"
                className={`font-semibold px-7 py-3.5 rounded-full text-sm transition-all shadow-sm active:scale-95 inline-flex items-center gap-2 ${
                  isNightMode
                    ? 'bg-[#C6A15B] text-black hover:bg-[#b08d4a]'
                    : 'bg-[#111111] hover:bg-neutral-800 text-white'
                }`}
              >
                <span>Explore Portfolios</span>
                <FiArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className={`border font-medium px-7 py-3.5 rounded-full text-sm transition-all ${
                  isNightMode
                    ? 'border-stone-700 text-stone-300 hover:border-[#C6A15B] hover:text-white'
                    : 'border-neutral-300 hover:border-[#111111] text-[#111111]'
                }`}
              >
                Contact Studio
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ─── CORE VALUES ─── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 py-10 sm:py-20">
        <div className="mb-12">
          <span className="text-[#F5A623] text-xs font-extrabold uppercase tracking-widest block mb-2">
            Guiding Principles
          </span>
          <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${
            isNightMode ? 'text-white' : 'text-[#111111]'
          }`}>
            The Pillars Behind Our Work
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const IconComponent = v.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`p-5 sm:p-8 rounded-[20px] sm:rounded-[32px] border transition-all ${
                  isNightMode
                    ? 'bg-[#121316] border-stone-800/80 shadow-lg hover:border-[#C6A15B]/50'
                    : 'bg-[#FAF8F5] border-neutral-200/80 shadow-sm hover:shadow-md'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-5 text-[#F5A623] shadow-sm ${
                  isNightMode ? 'bg-black/40 border-stone-700' : 'bg-white border-neutral-200/80'
                }`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isNightMode ? 'text-white' : 'text-[#111111]'}`}>
                  {v.title}
                </h3>
                <p className={`text-sm leading-relaxed ${isNightMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  {v.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── LEADERSHIP TEAM ─── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 py-10 sm:py-16">
        <div className="mb-12">
          <span className="text-[#F5A623] text-xs font-extrabold uppercase tracking-widest block mb-2">
            Leadership & Craft
          </span>
          <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${
            isNightMode ? 'text-white' : 'text-[#111111]'
          }`}>
            Meet the Principal Designers & Engineers
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`group rounded-[28px] overflow-hidden border transition-all duration-500 ${
                isNightMode
                  ? 'bg-[#121316] border-stone-800 shadow-lg hover:border-[#C6A15B]/50'
                  : 'bg-neutral-50 border-neutral-200 shadow-sm hover:shadow-xl'
              }`}
            >
              <div className="aspect-[4/4.5] overflow-hidden bg-neutral-200">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h4 className={`text-lg font-bold ${isNightMode ? 'text-white' : 'text-[#111111]'}`}>
                  {member.name}
                </h4>
                <p className="text-[#F5A623] text-xs font-bold uppercase tracking-wider mt-0.5">{member.role}</p>
                <p className={`text-xs mt-2 leading-relaxed ${isNightMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  {member.specialty}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── METRICS BANNER ─── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 py-8 sm:py-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center border-y py-8 sm:py-12 ${
            isNightMode ? 'border-stone-800' : 'border-neutral-200'
          }`}
        >
          <div>
            <span className={`text-3xl sm:text-5xl font-black block ${isNightMode ? 'text-white' : 'text-[#111111]'}`}>
              20+
            </span>
            <span className="text-xs uppercase font-bold text-neutral-500 tracking-wider mt-1 block">Years Experience</span>
          </div>
          <div>
            <span className="text-3xl sm:text-5xl font-black text-[#F5A623] block">500+</span>
            <span className="text-xs uppercase font-bold text-neutral-500 tracking-wider mt-1 block">Spaces Transformed</span>
          </div>
          <div>
            <span className={`text-3xl sm:text-5xl font-black block ${isNightMode ? 'text-white' : 'text-[#111111]'}`}>
              99.4%
            </span>
            <span className="text-xs uppercase font-bold text-neutral-500 tracking-wider mt-1 block">Client Satisfaction</span>
          </div>
          <div>
            <span className="text-3xl sm:text-5xl font-black text-[#F5A623] block">100%</span>
            <span className="text-xs uppercase font-bold text-neutral-500 tracking-wider mt-1 block">Turnkey Delivery</span>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default AboutPage;