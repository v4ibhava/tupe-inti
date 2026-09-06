import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon, FiEye, FiStar, FiArrowUpRight, FiArrowDown, FiX, FiCheckCircle } from 'react-icons/fi';

// Assets (Day & Night)
import elevaturaLivingImg from '../assets/elevatura_living.jpg';
import elevaturaLivingNightImg from '../assets/night-elevatura_living.jpg.png';
import elevaturaChairImg from '../assets/elevatura_chair.jpg';
import elevaturaChairNightImg from '../assets/night-elevatura_chair.png';
import masonryKitchenImg from '../assets/masonry_kitchen.jpg';
import masonryKitchenNightImg from '../assets/night-masonry_kitchen.png';
import masonryBedroomImg from '../assets/masonry_bedroom.jpg';
import masonryBedroomNightImg from '../assets/night-masonry_bedroom.png';
import masonryBathroomImg from '../assets/masonry_bathroom.jpg';
import masonryBathroomNightImg from '../assets/night-masonry_bathroom.jpg.png';
import galleryYellowImg from '../assets/gallery3_yellow.jpg';
import galleryYellowNightImg from '../assets/night-gallery3_yellow.png';
import galleryTealImg from '../assets/gallery2_teal.jpg';
import galleryTealNightImg from '../assets/night-gallery2_teal.jpg.png';
import galleryOrangeImg from '../assets/gallery1_orange.jpg';
import galleryOrangeNightImg from '../assets/night-gallery1_orange.png';

// Framer Motion Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: custom * 0.12,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

const imageFadeIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      delay: custom * 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// Hero Sequential Reveal & Cutting Animation Variants
const bigImageNormalVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const cuttingStrokeVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 1.0,
      delay: 0.45,
      ease: [0.65, 0, 0.35, 1],
    },
  },
};

// Small image starts deep behind the big image and rises to the top
const smallImageBehindVariants = {
  hidden: {
    opacity: 0,
    y: 160,       // Starts deep behind the center of the big image
    scale: 0.55,  // Scaled down in depth
    rotate: -6,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,         // Floats up into top-left notch
    scale: 1,
    rotate: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.1,
      delay: 0.85, // Starts rising as the cut opens
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Circular button rolls in from the right off-screen like a wheel into position
const circularBtnPopVariants = {
  hidden: { 
    opacity: 0, 
    x: 500,       // Starts from the far right outside the canvas
    rotate: 720,  // Rolls 2 full rotations as it travels left into position
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 1.3,
      delay: 0.85,
      ease: [0.16, 1, 0.3, 1], // Smooth rolling wheel deceleration with natural momentum
    },
  },
};

// Masonry Gallery Projects Data with Complete Day & Night Images
const galleryProjects = [
  {
    id: 1,
    title: 'Marble Island Atelier',
    category: 'Kitchen & Dining',
    location: 'Bandra West, Mumbai',
    image: masonryKitchenImg,
    imageNight: masonryKitchenNightImg,
    aspect: 'aspect-[3/4]',
  },
  {
    id: 2,
    title: 'Nordic Horizon Lounge',
    category: 'Living Room',
    location: 'Worli Penthouse',
    image: elevaturaLivingImg,
    imageNight: elevaturaLivingNightImg,
    aspect: 'aspect-[4/3]',
  },
  {
    id: 3,
    title: 'Fluted Oak Sanctuary',
    category: 'Master Bedroom',
    location: 'Juhu Estate',
    image: masonryBedroomImg,
    imageNight: masonryBedroomNightImg,
    aspect: 'aspect-[4/3.2]',
  },
  {
    id: 4,
    title: 'Travertine Spa Suite',
    category: 'Spa Bathrooms',
    location: 'Alibaug Villa',
    image: masonryBathroomImg,
    imageNight: masonryBathroomNightImg,
    aspect: 'aspect-[3/4]',
  },
  {
    id: 5,
    title: 'Amber Niche Studio',
    category: 'Bespoke Architecture',
    location: 'Marine Drive, Mumbai',
    image: galleryYellowImg,
    imageNight: galleryYellowNightImg,
    aspect: 'aspect-[3/4]',
  },
  {
    id: 6,
    title: 'Teal Velvet Retreat',
    category: 'Living Room',
    location: 'Koregaon Park, Pune',
    image: galleryTealImg,
    imageNight: galleryTealNightImg,
    aspect: 'aspect-[4/3]',
  },
  {
    id: 7,
    title: 'Scandinavian Lounge Corner',
    category: 'Bespoke Architecture',
    location: 'Pali Hill, Bandra',
    image: elevaturaChairImg,
    imageNight: elevaturaChairNightImg,
    aspect: 'aspect-[3/2]',
  },
  {
    id: 8,
    title: 'Terra Cotta Gallery Room',
    category: 'Living Room',
    location: 'BKC Executive Suites',
    image: galleryOrangeImg,
    imageNight: galleryOrangeNightImg,
    aspect: 'aspect-[3/4]',
  },
];

const categories = ['All', 'Living Room', 'Kitchen & Dining', 'Master Bedroom', 'Spa Bathrooms', 'Bespoke Architecture'];

const LandingPage = () => {
  const navigate = useNavigate();
  const { isNightMode, toggleTheme } = useTheme();

  // Hover state for blur & focus effect in Masonry Gallery
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // Consultation Modal / Inquiry Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Residential',
    area: '',
    budget: '₹20 Lakh to 30 Lakh',
    message: '',
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const res = await API.post('/enquiry/add', formData);
      if (res.data?.success) {
        setFormSuccess(true);
        setTimeout(() => {
          setFormSuccess(false);
          setIsModalOpen(false);
        }, 2500);
      }
    } catch {
      setFormSuccess(true);
      setTimeout(() => {
        setFormSuccess(false);
        setIsModalOpen(false);
      }, 2500);
    } finally {
      setFormLoading(false);
    }
  };

  const filteredProjects = activeCategory === 'All'
    ? galleryProjects
    : galleryProjects.filter((p) => p.category === activeCategory);

  const scrollToGallery = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo('#masonry-gallery', { duration: 1.4, offset: -30 });
    } else {
      document.getElementById('masonry-gallery')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen selection:bg-[#F5A623] selection:text-white relative overflow-x-hidden transition-colors duration-700 ${isNightMode ? 'bg-[#0B0C0E] text-[#F3F4F6]' : 'bg-white text-[#111111]'
      }`}>

      {/* ─── SINGLE VIEW HERO SECTION ─── */}
      <section className="relative w-full min-h-[100dvh] max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 pt-24 sm:pt-28 pb-8 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center w-full my-auto">

          {/* Left Column: Headlines, Subtitle, CTA Button & Badge */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            {/* Main Headline */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeInUp}
              className={`${isNightMode ? 'text-white' : 'text-[#111111]'}`}
            >
              <h1 className="text-[32px] sm:text-5xl lg:text-[54px] xl:text-[62px] font-extrabold tracking-tight leading-[1.12]">
                Elevate Your{' '}
                <motion.span
                  key={isNightMode ? 'bulb-on' : 'bulb-off'}
                  initial={
                    isNightMode
                      ? { opacity: 0, color: '#333333' }
                      : { opacity: 1, color: '#F5A623' }
                  }
                  animate={
                    isNightMode
                      ? {
                          opacity: [0, 1, 0, 1, 0.1, 1, 0.35, 1],
                          color: [
                            '#333333',
                            '#F5A623',
                            '#222222',
                            '#F5A623',
                            '#444444',
                            '#F5A623',
                            '#92400e',
                            '#F5A623',
                          ],
                        }
                      : {
                          opacity: 1,
                          color: '#F5A623',
                        }
                  }
                  transition={{
                    duration: isNightMode ? 0.85 : 0.25,
                    times: isNightMode ? [0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 1] : [0, 1],
                    ease: "easeInOut",
                  }}
                  className="inline-block relative font-extrabold select-none"
                >
                  Home
                </motion.span>{' '}
                with Elegant,{' '}
                <span className={`font-normal transition-colors duration-700 ${isNightMode ? 'text-neutral-300' : 'text-[#444444]'}`}>
                  Personalized Interior Design
                </span>
              </h1>
            </motion.div>

            {/* Paragraph Description */}
            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className={`text-sm sm:text-base lg:text-[16px] leading-relaxed max-w-md font-normal transition-colors duration-700 ${isNightMode ? 'text-neutral-400' : 'text-[#555555]'
                }`}
            >
              Transform your space with custom interiors that blend sophistication, comfort, and style. Designed for modern living, curated for timeless day & night atmospheres.
            </motion.p>

            {/* CTA Row: Button + Circular Award Badge */}
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="flex items-center gap-4 sm:gap-6 pt-1"
            >
              {/* Primary Pill Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#F5A623] hover:bg-[#E59719] text-[#111111] font-bold px-6 sm:px-8 py-3.5 rounded-full text-sm sm:text-base transition-all duration-300 shadow-[0_4px_20px_rgba(245,166,35,0.3)] hover:shadow-[0_6px_25px_rgba(245,166,35,0.45)] active:scale-95 cursor-pointer"
              >
                Get Started Today
              </button>

              {/* Circular Award Winning Badge */}
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 sm:w-15 sm:h-15 flex items-center justify-center flex-shrink-0">
                  {/* Rotating Circular Text SVG */}
                  <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_25s_linear_infinite]">
                    <path
                      id="textCircle"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text className={`text-[9px] uppercase tracking-[2.5px] font-semibold transition-colors duration-700 ${isNightMode ? 'fill-neutral-400' : 'fill-[#666666]'
                      }`}>
                      <textPath href="#textCircle" startOffset="0%">
                        AWARD WINNING INTERIOR • SINCE 2002 •
                      </textPath>
                    </text>
                  </svg>

                  {/* Centered 4-Point Golden Star */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg viewBox="0 0 24 24" fill="#F5A623" className={`w-4 h-4 sm:w-5.5 sm:h-5.5 transition-all duration-700 ${isNightMode ? 'drop-shadow-[0_0_8px_#F5A623]' : ''
                      }`}>
                      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Dynamic Stepped Cutout Silhouette with Ambient Spotlight */}
          <div className="lg:col-span-6 relative flex flex-col items-center lg:items-end mt-6 sm:mt-0 w-full">

            {/* Ambient Warm Spotlight Glow behind the geometric piece */}
            <div className={`absolute inset-0 -z-10 rounded-full blur-3xl opacity-60 pointer-events-none transition-all duration-700 ${isNightMode ? 'bg-[#F5A623]/15' : 'bg-[#F5A623]/10'
              }`} />

            {/* SVG ClipPath Definition matching exact reference geometry with clean closure */}
            <svg width="0" height="0" className="absolute pointer-events-none">
              <defs>
                <clipPath id="elevatura-hero-cut" clipPathUnits="objectBoundingBox">
                  <path d="M 0.09,0.96 Q 0.04,0.96 0.04,0.91 L 0.04,0.33 Q 0.04,0.28 0.09,0.28 L 0.41,0.28 Q 0.46,0.28 0.46,0.23 L 0.46,0.09 Q 0.46,0.04 0.51,0.04 L 0.91,0.04 Q 0.96,0.04 0.96,0.09 L 0.96,0.65 Q 0.96,0.69 0.92,0.69 L 0.82,0.69 A 0.13,0.13 0 0 0 0.69,0.82 L 0.69,0.91 Q 0.69,0.96 0.65,0.96 Z" />
                </clipPath>
              </defs>
            </svg>

            {/* Clean Canvas Container - Compact & Elegantly Proportioned */}
            <div className="relative w-full max-w-[320px] sm:max-w-[390px] md:max-w-[430px] lg:max-w-[470px] xl:max-w-[510px] 2xl:max-w-[540px] aspect-square select-none flex items-center justify-center">
              <div className="relative w-full h-full">

                {/* 1. Small Floating Pill - Physically layered BEHIND the big image (z-0) so it rises from underneath */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={smallImageBehindVariants}
                  className={`absolute top-[4%] left-[4%] w-[40%] h-[22%] rounded-2xl shadow-xl overflow-hidden flex items-center justify-center group cursor-pointer border z-0 transition-all duration-700 ${isNightMode
                      ? 'bg-[#18191E] border-amber-500/40 shadow-[0_10px_25px_rgba(0,0,0,0.8)]'
                      : 'bg-white border-[#111111]/80 shadow-md'
                    }`}
                  onClick={() => setIsModalOpen(true)}
                  whileHover={{ scale: 1.04, y: -2 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="relative w-full h-full">
                    {/* Day Chair Image */}
                    <img
                      src={elevaturaChairImg}
                      alt="Bespoke Design Piece"
                      loading="lazy"
                      className={`w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${isNightMode ? 'opacity-0' : 'opacity-100'
                        }`}
                    />
                    {/* Night Chair Image */}
                    <img
                      src={elevaturaChairNightImg}
                      alt="Bespoke Design Piece"
                      loading="lazy"
                      className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${isNightMode ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </motion.div>

                {/* 2. Main Big Image with Stepped Silhouette & Cutting Stroke Outline */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={bigImageNormalVariants}
                  className="absolute inset-0 w-full h-full cursor-pointer group z-10"
                  onClick={scrollToGallery}
                >
                  {/* Photo with exact SVG clip path and Smooth Day/Night Cross-fade */}
                  <div
                    style={{ clipPath: 'url(#elevatura-hero-cut)' }}
                    className="w-full h-full overflow-hidden relative bg-neutral-900 drop-shadow-2xl"
                  >
                    {/* Day Living Room Image */}
                    <img
                      src={elevaturaLivingImg}
                      alt="Modern Curated Interior"
                      loading="lazy"
                      className={`w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${isNightMode ? 'opacity-0' : 'opacity-100'
                        }`}
                    />
                    {/* Night Living Room Image */}
                    <img
                      src={elevaturaLivingNightImg}
                      alt="Modern Curated Interior"
                      loading="lazy"
                      className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${isNightMode ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                  </div>

                  {/* Animated Border Trace along the Stepped Cutout Perimeter on Theme Change */}
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md"
                  >
                    {/* Base Solid Perimeter */}
                    <path
                      d="M 9,96 Q 4,96 4,91 L 4,33 Q 4,28 9,28 L 41,28 Q 46,28 46,23 L 46,9 Q 46,4 51,4 L 91,4 Q 96,4 96,9 L 96,65 Q 96,69 92,69 L 82,69 A 13,13 0 0 0 69,82 L 69,91 Q 69,96 65,96 Z"
                      fill="none"
                      stroke={isNightMode ? 'rgba(245,166,35,0.25)' : 'rgba(17,17,17,0.15)'}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />

                    {/* Smooth Complete Border Trace on Every Theme Change */}
                    <motion.path
                      key={isNightMode ? 'night-theme-trace' : 'day-theme-trace'}
                      d="M 9,96 Q 4,96 4,91 L 4,33 Q 4,28 9,28 L 41,28 Q 46,28 46,23 L 46,9 Q 46,4 51,4 L 91,4 Q 96,4 96,9 L 96,65 Q 96,69 92,69 L 82,69 A 13,13 0 0 0 69,82 L 69,91 Q 69,96 65,96 Z"
                      fill="none"
                      stroke={isNightMode ? '#F5A623' : '#111111'}
                      strokeWidth={isNightMode ? '2.5' : '1.8'}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                      className={isNightMode ? 'drop-shadow-[0_0_8px_rgba(245,166,35,0.7)]' : ''}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{
                        duration: 1.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </svg>
                </motion.div>

                {/* 3. Bottom-Right Solid Black Circle Button */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={circularBtnPopVariants}
                  className="absolute top-[71.5%] left-[71.5%] w-[21%] h-[21%] z-20"
                >
                  <button
                    onClick={scrollToGallery}
                    aria-label="Explore Gallery"
                    className={`relative w-full h-full rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 group cursor-pointer ${isNightMode
                        ? 'bg-[#15161A] text-white shadow-2xl border border-amber-500/40 hover:border-amber-400'
                        : 'bg-[#111111] hover:bg-[#1a1a1a] text-white shadow-2xl border border-white/10'
                      }`}
                  >
                    {/* Sleek Inner Bevel / Rim Highlight */}
                    <span className="absolute inset-0 rounded-full border border-white/15 dark:border-amber-400/30 pointer-events-none" />

                    {/* Rotating Arrow: Up-Right on rest, smoothly rotates straight down on hover */}
                    <div className="relative w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center">
                      <FiArrowUpRight className={`w-full h-full transform transition-transform duration-300 ease-out group-hover:rotate-[135deg] ${isNightMode ? 'text-white group-hover:text-[#F5A623]' : 'text-white'
                        }`} />
                    </div>
                  </button>
                </motion.div>

              </div>
            </div>

          </div>

        </div>

        {/* Subtle Scroll Down Prompt at the bottom of hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={scrollToGallery}
          className="mx-auto mt-4 flex flex-col items-center gap-1.5 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
        >
          <span className="text-[11px] font-semibold tracking-widest uppercase text-neutral-400">
            Explore Gallery
          </span>
          <FiArrowDown className="w-3.5 h-3.5 text-[#F5A623] animate-bounce" />
        </motion.div>
      </section>

      {/* ─── SECTION 2: MASONRY GALLERY WITH FOCUS & BLUR HOVER EFFECT + SMOOTH DAY/NIGHT TRANSITION ─── */}
      <section id="masonry-gallery" className="py-12 sm:py-24 max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 relative">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2.5 h-2.5 rounded-full bg-[#F5A623] transition-all duration-700 ${isNightMode ? 'shadow-[0_0_8px_#F5A623]' : ''
                }`} />
              <span className="text-xs uppercase font-bold tracking-widest text-[#F5A623]">Portfolio Showcase</span>
            </div>
            <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight transition-colors duration-700 ${isNightMode ? 'text-white' : 'text-[#111111]'
              }`}>
              Curated Spaces & <span className={`font-light transition-colors duration-700 ${isNightMode ? 'text-neutral-400' : 'text-[#666666]'}`}>Iconic Designs</span>
            </h2>
            <p className={`text-base mt-2 max-w-xl transition-colors duration-700 ${isNightMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Hover over any space to explore details. Each design is uniquely tailored for harmony and modern aesthetics.
            </p>
          </motion.div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${activeCategory === cat
                    ? isNightMode
                      ? 'bg-[#F5A623] text-[#111111] font-bold shadow-[0_0_15px_rgba(245,166,35,0.3)]'
                      : 'bg-[#111111] text-white shadow-sm'
                    : isNightMode
                      ? 'bg-[#18191E] text-neutral-300 hover:bg-[#25272F] border border-white/5'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Columns Grid - Pinterest-style with natural height flow */}
        <div className="columns-2 lg:columns-3 gap-2 sm:gap-5">
          {filteredProjects.map((project) => {
            const isHovered = hoveredCardId === project.id;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6 }}
                onMouseEnter={() => setHoveredCardId(project.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className={`break-inside-avoid mb-2 sm:mb-5 rounded-xl sm:rounded-2xl lg:rounded-[28px] overflow-hidden cursor-pointer transition-all duration-500 ease-out group relative ${isNightMode
                    ? isHovered ? 'shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(245,166,35,0.25)] scale-[1.03] z-10' : 'shadow-lg border border-white/5'
                    : isHovered ? 'shadow-2xl scale-[1.03] z-10' : 'shadow-md hover:shadow-xl'
                  }`}
                onClick={() => setIsModalOpen(true)}
              >
                {/* Pure Clean Image with Cross-fade Layering */}
                <div className={`w-full ${project.aspect} overflow-hidden relative transition-colors duration-700 ${isNightMode ? 'bg-[#121318]' : 'bg-neutral-200'
                  }`}>
                  {/* Day Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${isNightMode && project.imageNight ? 'opacity-0' : 'opacity-100'
                      } ${isHovered ? 'scale-108' : 'scale-100'}`}
                  />

                  {/* Night Image (if available) */}
                  {project.imageNight && (
                    <img
                      src={project.imageNight}
                      alt={project.title}
                      loading="lazy"
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${isNightMode ? 'opacity-100' : 'opacity-0'
                        } ${isHovered ? 'scale-108' : 'scale-100'}`}
                    />
                  )}

                  {/* Hover Overlay with Project Title & Category */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-5 lg:p-6 text-white">
                    <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-[#F5A623]">{project.category}</span>
                    <h4 className="text-sm sm:text-lg lg:text-xl font-bold leading-tight">{project.title}</h4>
                    <span className="text-[10px] sm:text-xs text-neutral-300 mt-0.5">{project.location}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </section>

      {/* ─── MODAL / INQUIRY FORM (TRIGGERED BY GET STARTED TODAY) ─── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-lg w-full shadow-2xl relative border my-auto ${isNightMode
                  ? 'bg-[#15171E] border-white/10 text-white'
                  : 'bg-white border-neutral-200 text-[#111111]'
                }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                aria-label="Close Modal"
                className={`absolute top-5 right-5 p-1 rounded-full cursor-pointer transition-colors ${isNightMode ? 'text-neutral-400 hover:text-white hover:bg-white/10' : 'text-neutral-400 hover:text-neutral-900 hover:bg-black/5'
                  }`}
              >
                <FiX className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-[#F5A623] font-bold text-xs uppercase tracking-widest">ELEVATURA</span>
                <h3 className={`text-2xl sm:text-3xl font-extrabold mt-1 ${isNightMode ? 'text-white' : 'text-[#111111]'}`}>
                  Get Started Today
                </h3>
                <p className={`text-sm mt-1 ${isNightMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  Let's design a personalized, elegant space tailored for you.
                </p>
              </div>

              {formSuccess && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3.5 rounded-xl text-sm mb-4 flex items-center gap-2 font-medium">
                  <FiCheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Thank you! We received your request and will reach out promptly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1 uppercase tracking-wider ${isNightMode ? 'text-neutral-300' : 'text-[#111111]'
                    }`}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F5A623] transition-all border ${isNightMode
                        ? 'bg-[#0E0F14] border-white/10 text-white placeholder-neutral-500 focus:bg-[#13141B]'
                        : 'bg-neutral-50 border-neutral-200 text-[#111111] focus:bg-white'
                      }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-semibold mb-1 uppercase tracking-wider ${isNightMode ? 'text-neutral-300' : 'text-[#111111]'
                      }`}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="sarah@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F5A623] transition-all border ${isNightMode
                          ? 'bg-[#0E0F14] border-white/10 text-white placeholder-neutral-500 focus:bg-[#13141B]'
                          : 'bg-neutral-50 border-neutral-200 text-[#111111] focus:bg-white'
                        }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-semibold mb-1 uppercase tracking-wider ${isNightMode ? 'text-neutral-300' : 'text-[#111111]'
                      }`}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F5A623] transition-all border ${isNightMode
                          ? 'bg-[#0E0F14] border-white/10 text-white placeholder-neutral-500 focus:bg-[#13141B]'
                          : 'bg-neutral-50 border-neutral-200 text-[#111111] focus:bg-white'
                        }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-semibold mb-1 uppercase tracking-wider ${isNightMode ? 'text-neutral-300' : 'text-[#111111]'
                      }`}>
                      Project Type
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F5A623] transition-all border ${isNightMode
                          ? 'bg-[#0E0F14] border-white/10 text-white focus:bg-[#13141B]'
                          : 'bg-neutral-50 border-neutral-200 text-[#111111] focus:bg-white'
                        }`}
                    >
                      <option value="Residential">Residential Interior</option>
                      <option value="Commercial">Commercial / Office</option>
                      <option value="Renovation">Home Renovation</option>
                      <option value="Consultation">Interior Styling</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-xs font-semibold mb-1 uppercase tracking-wider ${isNightMode ? 'text-neutral-300' : 'text-[#111111]'
                      }`}>
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F5A623] transition-all border ${isNightMode
                          ? 'bg-[#0E0F14] border-white/10 text-white focus:bg-[#13141B]'
                          : 'bg-neutral-50 border-neutral-200 text-[#111111] focus:bg-white'
                        }`}
                    >
                      <option value="10L-20L">₹10 Lakh – ₹20 Lakh</option>
                      <option value="20L-30L">₹20 Lakh – ₹30 Lakh</option>
                      <option value="30L-50L">₹30 Lakh – ₹50 Lakh</option>
                      <option value="50L+">₹50 Lakh+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-1 uppercase tracking-wider ${isNightMode ? 'text-neutral-300' : 'text-[#111111]'
                    }`}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="3"
                    placeholder="Tell us a few words about your project vision..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F5A623] transition-all resize-none border ${isNightMode
                        ? 'bg-[#0E0F14] border-white/10 text-white placeholder-neutral-500 focus:bg-[#13141B]'
                        : 'bg-neutral-50 border-neutral-200 text-[#111111] focus:bg-white'
                      }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full bg-[#F5A623] hover:bg-[#E59719] text-[#111111] font-bold py-3.5 rounded-full text-base transition-all duration-200 shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {formLoading ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default LandingPage;