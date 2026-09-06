import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon, FiLayers, FiCompass, FiFeather, FiClock, FiArrowUpRight, FiX, FiCheckCircle, FiChevronDown, FiCheck } from 'react-icons/fi';

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
import serviceArchitectureImg from '../assets/service_architecture.jpg';
import serviceConstructionImg from '../assets/service_construction.jpg';

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

// Curved dropdown for inquiry modal
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
      <label className={`block text-xs font-semibold mb-1 uppercase tracking-wider ${isNightMode ? 'text-neutral-300' : 'text-[#111111]'}`}>
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full rounded-xl px-4 py-3 text-sm transition-all border flex items-center justify-between text-left cursor-pointer ${
          isNightMode
            ? 'bg-[#1E2026] border-stone-700 text-white hover:border-[#F5A623]'
            : 'bg-neutral-50 border-neutral-200 text-[#111111] hover:border-[#F5A623]'
        } ${isOpen ? 'border-[#F5A623] ring-2 ring-[#F5A623]/20' : ''}`}
      >
        <span className="truncate">{value}</span>
        <FiChevronDown className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ml-2 ${
          isOpen ? 'rotate-180 text-[#F5A623]' : 'text-neutral-400'
        }`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={`absolute z-50 left-0 right-0 mt-2 p-1.5 rounded-2xl border shadow-2xl backdrop-blur-xl overflow-hidden ${
              isNightMode
                ? 'bg-[#1A1B20]/95 border-stone-700 shadow-black/80'
                : 'bg-white/95 border-neutral-200/90 shadow-neutral-400/30'
            }`}
          >
            <div className="max-h-52 overflow-y-auto space-y-1">
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
                          ? 'bg-[#F5A623]/20 text-[#F5A623] font-semibold'
                          : 'bg-[#F5A623]/15 text-[#D98200] font-semibold'
                        : isNightMode
                          ? 'text-neutral-300 hover:bg-white/5 hover:text-white'
                          : 'text-neutral-700 hover:bg-neutral-100 hover:text-black'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && (
                      <FiCheck className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
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

// Curated Projects Data with Complete Day and Night Photos
const initialProjects = [
  {
    id: 1,
    title: 'Marble Island Atelier',
    category: 'Kitchen & Dining',
    location: 'Bandra West, Mumbai',
    area: '1,400 sq.ft',
    year: '2025',
    image: masonryKitchenImg,
    imageNight: masonryKitchenNightImg,
    aspect: 'aspect-[3/4]',
  },
  {
    id: 2,
    title: 'Nordic Horizon Lounge',
    category: 'Residential',
    location: 'Worli Sea Face',
    area: '2,800 sq.ft',
    year: '2024',
    image: elevaturaLivingImg,
    imageNight: elevaturaLivingNightImg,
    aspect: 'aspect-[4/3]',
  },
  {
    id: 3,
    title: 'Fluted Oak Sanctuary',
    category: 'Master Suite',
    location: 'Juhu Estate',
    area: '950 sq.ft',
    year: '2025',
    image: masonryBedroomImg,
    imageNight: masonryBedroomNightImg,
    aspect: 'aspect-[4/3.2]',
  },
  {
    id: 4,
    title: 'Travertine Spa Suite',
    category: 'Spa & Bathrooms',
    location: 'Alibaug Villa',
    area: '620 sq.ft',
    year: '2024',
    image: masonryBathroomImg,
    imageNight: masonryBathroomNightImg,
    aspect: 'aspect-[3/4]',
  },
  {
    id: 5,
    title: 'Amber Executive Studio',
    category: 'Commercial',
    location: 'Marine Drive, Mumbai',
    area: '3,200 sq.ft',
    year: '2025',
    image: galleryYellowImg,
    imageNight: galleryYellowNightImg,
    aspect: 'aspect-[3/4]',
  },
  {
    id: 6,
    title: 'Teal Velvet Retreat',
    category: 'Residential',
    location: 'Koregaon Park, Pune',
    area: '2,100 sq.ft',
    year: '2024',
    image: galleryTealImg,
    imageNight: galleryTealNightImg,
    aspect: 'aspect-[4/3]',
  },
  {
    id: 7,
    title: 'Scandinavian Corner Studio',
    category: 'Architectural Build',
    location: 'Pali Hill, Bandra',
    area: '1,850 sq.ft',
    year: '2025',
    image: elevaturaChairImg,
    imageNight: elevaturaChairNightImg,
    aspect: 'aspect-[3/2]',
  },
  {
    id: 8,
    title: 'Terra Cotta Gallery Room',
    category: 'Residential',
    location: 'BKC Executive Suites',
    area: '2,400 sq.ft',
    year: '2024',
    image: galleryOrangeImg,
    imageNight: galleryOrangeNightImg,
    aspect: 'aspect-[3/4]',
  },
];

const categories = ['All', 'Residential', 'Commercial', 'Kitchen & Dining', 'Master Suite', 'Spa & Bathrooms', 'Architectural Build'];

// Architectural & Engineering Process Steps
const processSteps = [
  {
    step: '01',
    title: 'Discovery & Spatial Audit',
    desc: 'Deep dive into your lifestyle habits, aesthetic vision, spatial ergonomics, and timeline goals.',
  },
  {
    step: '02',
    title: 'Concept & 3D Visualization',
    desc: 'Explore your future space with photorealistic 3D renders, architectural plans, and physical material palettes.',
  },
  {
    step: '03',
    title: 'Craftsmanship & Sourcing',
    desc: 'Our master craftsmen fabricate bespoke furnishings, procure marble slabs, and engineer custom fixtures.',
  },
  {
    step: '04',
    title: 'White-Glove Handover',
    desc: 'On-site turnkey project management delivering a pristine, fully staged architectural interior on schedule.',
  },
];

const workflowSteps = processSteps;

const PortfolioPage = () => {
  const { isNightMode, toggleTheme } = useTheme();
  const [projects, setProjects] = useState(initialProjects);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredCardId, setHoveredCardId] = useState(null);

  // Inquiry Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
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

  // Fetch dynamic projects from API if available, fallback gracefully
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get('/portfolio');
        if (res.data?.data && res.data.data.length > 0) {
          const apiProjects = res.data.data.map((p, idx) => ({
            id: p._id || idx + 10,
            title: p.title,
            category: p.category || 'Residential',
            location: p.location || 'Mumbai, India',
            area: p.area || '2,000 sq.ft',
            year: p.year || '2025',
            image: p.image || initialProjects[idx % initialProjects.length].image,
            aspect: idx % 3 === 0 ? 'aspect-[3/4]' : idx % 2 === 0 ? 'aspect-[4/3]' : 'aspect-[4/3.2]',
          }));
          setProjects([...apiProjects, ...initialProjects]);
        }
      } catch {
        // Fallback to rich curated local dataset
      }
    };
    fetchProjects();
  }, []);

  const openInquiryModal = (project = null) => {
    setSelectedProject(project);
    if (project?.category) {
      setFormData((prev) => ({ ...prev, projectType: project.category }));
    }
    setIsModalOpen(true);
  };

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
    ? projects
    : projects.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div className={`min-h-screen selection:bg-[#F5A623] selection:text-white pt-24 pb-20 overflow-x-hidden transition-colors duration-500 ${
      isNightMode ? 'bg-[#0B0C0E] text-[#F3F4F6] night-mode-active' : 'bg-white text-[#111111] day-mode-active'
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
            <span className={`w-3 h-3 rounded-full bg-[#F5A623] ${isNightMode ? 'shadow-[0_0_8px_#F5A623]' : ''}`} />
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#F5A623]">
              Portfolio Showcase
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
            Curated Portfolios & <span className={`font-normal ${isNightMode ? 'text-neutral-400' : 'text-[#555555]'}`}>Landmark Spaces.</span>
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
            Explore our award-winning architectural designs, bespoke residences, and turnkey commercial projects. Each space is handcrafted for harmony, purpose, and timeless aesthetic appeal.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeInUp}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => openInquiryModal()}
              className="bg-[#F5A623] hover:bg-[#E59719] text-[#111111] font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm sm:text-base transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
            >
              Commission a Project
            </button>
            <Link
              to="/services"
              className={`font-medium px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm sm:text-base transition-all duration-200 inline-flex items-center gap-2 border ${
                isNightMode
                  ? 'border-white/20 text-white hover:border-[#F5A623] hover:text-[#F5A623] hover:bg-white/5'
                  : 'border-neutral-300 text-[#111111] hover:border-[#111111] hover:bg-neutral-100'
              }`}
            >
              <span>Explore Our Services</span>
              <FiArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── CATEGORY FILTER TABS ─── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 pb-10">
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 border-b border-neutral-200 pb-4 sm:pb-6 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeCategory === cat
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
      </section>

      {/* ─── MAIN MASONRY PROJECTS GRID ─── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 py-4">
        {/* Pinterest-style Masonry Grid with natural height flow */}
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
                className={`break-inside-avoid mb-2 sm:mb-5 rounded-xl sm:rounded-2xl lg:rounded-[28px] overflow-hidden cursor-pointer transition-all duration-500 ease-out group relative ${
                  isNightMode
                    ? isHovered ? 'shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(245,166,35,0.25)] scale-[1.03] z-10' : 'shadow-lg border border-white/5'
                    : isHovered ? 'shadow-2xl scale-[1.03] z-10' : 'shadow-md hover:shadow-xl'
                }`}
                onClick={() => openInquiryModal(project)}
              >
                {/* Pure Clean Image with Crossfade Layering */}
                <div className={`w-full ${project.aspect} overflow-hidden relative transition-colors duration-700 ${
                  isNightMode ? 'bg-[#121318]' : 'bg-neutral-200'
                }`}>
                  {/* Day Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${
                      isNightMode && project.imageNight ? 'opacity-0' : 'opacity-100'
                    } ${isHovered ? 'scale-108' : 'scale-100'}`}
                  />

                  {/* Night Image (if available) */}
                  {project.imageNight && (
                    <img
                      src={project.imageNight}
                      alt={project.title}
                      loading="lazy"
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                        isNightMode ? 'opacity-100' : 'opacity-0'
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

      {/* ─── DEDICATED ARCHITECTURAL DESIGN & CONSTRUCTION BUILD SECTION ─── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 py-10 sm:py-20">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]" />
              <span className="text-xs uppercase font-bold tracking-widest text-[#F5A623]">
                End-to-End Engineering
              </span>
            </div>
            <h2 className={`text-2xl sm:text-5xl font-extrabold tracking-tight ${isNightMode ? 'text-white' : 'text-[#111111]'}`}>
              Architectural Design & <span className={`font-light ${isNightMode ? 'text-neutral-400' : 'text-[#666666]'}`}>Construction Build</span>
            </h2>
            <p className={`text-base mt-2 max-w-xl ${isNightMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Bridging the gap between visionary blueprints and heavy civil engineering. We design, permit, and construct bespoke residences with architectural integrity.
            </p>
          </div>

          <button
            onClick={() => openInquiryModal({ title: 'Architectural & Construction Build' })}
            className={`font-semibold px-7 py-3.5 rounded-full text-sm transition-all shadow-sm active:scale-95 whitespace-nowrap cursor-pointer inline-flex items-center gap-2 ${
              isNightMode
                ? 'bg-white text-black hover:bg-neutral-200'
                : 'bg-[#111111] hover:bg-neutral-800 text-white'
            }`}
          >
            <span>Consult Our Engineers</span>
            <FiArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dual Showcase Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Card 1: Architectural Design & Masterplanning */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className={`border rounded-[24px] sm:rounded-[36px] overflow-hidden p-5 sm:p-10 flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-500 ${
              isNightMode
                ? 'bg-[#121316] border-stone-800 hover:border-[#F5A623]/40'
                : 'bg-[#FAF8F5] border-neutral-200/80 hover:border-[#F5A623]/40'
            }`}
          >
            <div>
              <div className="relative aspect-[16/10] rounded-[16px] sm:rounded-[24px] overflow-hidden mb-6 sm:mb-8 bg-neutral-800 shadow-sm">
                <img
                  src={serviceArchitectureImg}
                  alt="Architectural Blueprint and Scale Model"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <span className="text-[#F5A623] text-xs font-extrabold uppercase tracking-widest block mb-1">
                Phase 1: Architecture & Spatial Planning
              </span>
              <h3 className={`text-2xl sm:text-3xl font-extrabold mb-3 ${isNightMode ? 'text-white' : 'text-[#111111]'}`}>
                Architectural Masterplanning
              </h3>
              <p className={`text-sm sm:text-base leading-relaxed mb-6 ${isNightMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Precision-driven CAD blueprints, volumetric 3D BIM walkthroughs, facade aesthetic planning, and municipal sanctioning engineered to optimize natural ventilation and solar paths.
              </p>

              <div className={`grid grid-cols-2 gap-3 border-t pt-5 ${isNightMode ? 'border-stone-800' : 'border-neutral-200'}`}>
                <div className={`flex items-center gap-2 text-xs font-semibold ${isNightMode ? 'text-neutral-300' : 'text-neutral-800'}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" /> 2D CAD & 3D BIM Modeling
                </div>
                <div className={`flex items-center gap-2 text-xs font-semibold ${isNightMode ? 'text-neutral-300' : 'text-neutral-800'}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" /> Facade & Elevation Design
                </div>
                <div className={`flex items-center gap-2 text-xs font-semibold ${isNightMode ? 'text-neutral-300' : 'text-neutral-800'}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" /> Permitting & Approvals
                </div>
                <div className={`flex items-center gap-2 text-xs font-semibold ${isNightMode ? 'text-neutral-300' : 'text-neutral-800'}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" /> Bioclimatic Optimization
                </div>
              </div>
            </div>

            <div className={`mt-8 pt-4 flex items-center justify-between border-t ${isNightMode ? 'border-stone-800' : 'border-neutral-200'}`}>
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Concept to Permit</span>
              <Link
                to="/services/architectural"
                className={`inline-flex items-center gap-1.5 text-sm font-bold transition-colors ${
                  isNightMode ? 'text-white hover:text-[#F5A623]' : 'text-[#111111] hover:text-[#F5A623]'
                }`}
              >
                View Architectural Details →
              </Link>
            </div>
          </motion.div>

          {/* Card 2: Civil Construction & Turnkey Build */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className={`border rounded-[24px] sm:rounded-[36px] overflow-hidden p-5 sm:p-10 flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-500 ${
              isNightMode
                ? 'bg-[#121316] border-stone-800 hover:border-[#F5A623]/40'
                : 'bg-[#FAF8F5] border-neutral-200/80 hover:border-[#F5A623]/40'
            }`}
          >
            <div>
              <div className="relative aspect-[16/10] rounded-[24px] overflow-hidden mb-8 bg-neutral-800 shadow-sm">
                <img
                  src={serviceConstructionImg}
                  alt="Modern Luxury Building Construction Site"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <span className="text-[#F5A623] text-xs font-extrabold uppercase tracking-widest block mb-1">
                Phase 2: Turnkey Civil Engineering
              </span>
              <h3 className={`text-2xl sm:text-3xl font-extrabold mb-3 ${isNightMode ? 'text-white' : 'text-[#111111]'}`}>
                Turnkey Construction & Civil Build
              </h3>
              <p className={`text-sm sm:text-base leading-relaxed mb-6 ${isNightMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Heavy structural execution including reinforced concrete frames, structural steel, mechanical/electrical/plumbing (MEP) integration, and full on-site superintendent oversight.
              </p>

              <div className={`grid grid-cols-2 gap-3 border-t pt-5 ${isNightMode ? 'border-stone-800' : 'border-neutral-200'}`}>
                <div className={`flex items-center gap-2 text-xs font-semibold ${isNightMode ? 'text-neutral-300' : 'text-neutral-800'}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" /> Reinforced Concrete Framing
                </div>
                <div className={`flex items-center gap-2 text-xs font-semibold ${isNightMode ? 'text-neutral-300' : 'text-neutral-800'}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" /> Integrated MEP Engineering
                </div>
                <div className={`flex items-center gap-2 text-xs font-semibold ${isNightMode ? 'text-neutral-300' : 'text-neutral-800'}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" /> On-Site Superintendent
                </div>
                <div className={`flex items-center gap-2 text-xs font-semibold ${isNightMode ? 'text-neutral-300' : 'text-neutral-800'}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" /> ISO-Standard Safety & Quality
                </div>
              </div>
            </div>

            <div className={`mt-8 pt-4 flex items-center justify-between border-t ${isNightMode ? 'border-stone-800' : 'border-neutral-200'}`}>
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Foundation to Handover</span>
              <Link
                to="/services/renovation"
                className={`inline-flex items-center gap-1.5 text-sm font-bold transition-colors ${
                  isNightMode ? 'text-white hover:text-[#F5A623]' : 'text-[#111111] hover:text-[#F5A623]'
                }`}
              >
                View Construction Details →
              </Link>
            </div>
          </motion.div>

        </div>

        {/* 4 Technical Capabilities Badges with Staggered Scroll Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: FiLayers, title: 'Structural Integrity', desc: 'Seismic-resistant framing with certified structural engineering calculations.' },
            { icon: FiCompass, title: 'Collision-Free BIM', desc: 'Integrated 3D modeling detecting mechanical clashes before physical build.' },
            { icon: FiFeather, title: 'Sustainable Envelope', desc: 'High-performance insulation, double-glazed fenestrations, and passive cooling.' },
            { icon: FiClock, title: 'Guaranteed Delivery', desc: 'Milestone-linked contracts with live drone footage updates for total transparency.' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-6 rounded-[24px] border shadow-sm hover:shadow-md transition-all ${
                  isNightMode
                    ? 'bg-[#15171C] border-stone-800'
                    : 'bg-white border-neutral-200'
                }`}
              >
                <Icon className="w-6 h-6 text-[#F5A623] mb-3" />
                <h4 className={`font-bold text-base mb-1 ${isNightMode ? 'text-white' : 'text-[#111111]'}`}>{item.title}</h4>
                <p className={`text-xs leading-relaxed ${isNightMode ? 'text-neutral-400' : 'text-neutral-500'}`}>{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

      </section>

      {/* ─── 4-STEP STRUCTURED EXECUTION PROCESS ─── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 py-10 sm:py-20 my-6 sm:my-10 bg-neutral-900 text-white rounded-[24px] sm:rounded-[40px]">
        <div className="max-w-2xl mb-14">
          <span className="text-[#F5A623] text-xs font-extrabold uppercase tracking-widest block mb-2">
            Structured Workflow
          </span>
          <h2 className="text-2xl sm:text-5xl font-extrabold tracking-tight">
            How We Execute Every Project to Perfection
          </h2>
          <p className="text-neutral-400 text-base mt-3">
            A transparent, turnkey 4-phase journey ensuring flawless execution from initial sketches to white-glove handover.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-neutral-800/60 p-5 sm:p-7 rounded-[20px] sm:rounded-[28px] border border-neutral-700/60 relative flex flex-col justify-between"
            >
              <div>
                <span className="text-[#F5A623] font-mono text-2xl font-bold block mb-4">
                  {step.step}
                </span>
                <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── TRUST & TRACK RECORD METRICS WITH SCROLL ANIMATION ─── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 py-10 sm:py-16">
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
            <span className={`text-3xl sm:text-5xl font-black block ${isNightMode ? 'text-white' : 'text-[#111111]'}`}>20+</span>
            <span className="text-xs uppercase font-bold text-neutral-500 tracking-wider mt-1 block">Years Experience</span>
          </div>
          <div>
            <span className="text-3xl sm:text-5xl font-black text-[#F5A623] block">500+</span>
            <span className="text-xs uppercase font-bold text-neutral-500 tracking-wider mt-1 block">Spaces Transformed</span>
          </div>
          <div>
            <span className={`text-3xl sm:text-5xl font-black block ${isNightMode ? 'text-white' : 'text-[#111111]'}`}>99.4%</span>
            <span className="text-xs uppercase font-bold text-neutral-500 tracking-wider mt-1 block">Client Satisfaction</span>
          </div>
          <div>
            <span className="text-3xl sm:text-5xl font-black text-[#F5A623] block">100%</span>
            <span className="text-xs uppercase font-bold text-neutral-500 tracking-wider mt-1 block">Turnkey Delivery</span>
          </div>
        </motion.div>
      </section>

      {/* ─── BOTTOM CALL TO ACTION ─── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 py-8 sm:py-12">
        <div className={`border rounded-[24px] sm:rounded-[36px] p-6 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 ${
          isNightMode
            ? 'bg-[#121316] border-stone-800'
            : 'bg-[#FAF8F5] border-neutral-200/80'
        }`}>
          <div className="max-w-xl">
            <span className="text-[#F5A623] font-bold text-xs uppercase tracking-widest block mb-2">
              Start Your Journey
            </span>
            <h3 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${
              isNightMode ? 'text-white' : 'text-[#111111]'
            }`}>
              Ready to bring your architectural vision to life?
            </h3>
            <p className={`text-sm sm:text-base mt-2 ${isNightMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Schedule a design session with our principal architects and master builders.
            </p>
          </div>

          <button
            onClick={() => openInquiryModal()}
            className="bg-[#F5A623] hover:bg-[#E59719] text-[#111111] font-bold px-9 py-4 rounded-full text-base transition-all duration-200 shadow-md active:scale-95 cursor-pointer whitespace-nowrap inline-flex items-center gap-2"
          >
            <span>Start Project Consultation</span>
            <FiArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ─── INQUIRY / CONSULTATION MODAL ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`border rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-lg w-full shadow-2xl relative my-auto ${
              isNightMode ? 'bg-[#15171C] border-stone-800 text-white' : 'bg-white border-neutral-200 text-[#111111]'
            }`}
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              aria-label="Close Modal"
              className={`absolute top-5 right-5 p-1 rounded-full transition-colors ${
                isNightMode ? 'text-neutral-400 hover:text-white hover:bg-stone-800' : 'text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <FiX className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[#F5A623] font-bold text-xs uppercase tracking-widest">ELEVATURA PROJECTS</span>
              <h3 className={`text-2xl sm:text-3xl font-extrabold mt-1 ${isNightMode ? 'text-white' : 'text-[#111111]'}`}>Project Consultation</h3>
              <p className={`text-sm mt-1 ${isNightMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {selectedProject ? (
                  <>Inquiring about <span className={`font-semibold ${isNightMode ? 'text-[#F5A623]' : 'text-[#111111]'}`}>{selectedProject.title}</span></>
                ) : (
                  'Let’s design a personalized, elegant space tailored for you.'
                )}
              </p>
            </div>

            {formSuccess && (
              <div className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 p-3.5 rounded-xl text-sm mb-4 flex items-center gap-2">
                <FiCheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Thank you! We received your inquiry and will reach out promptly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-xs font-semibold mb-1 uppercase tracking-wider ${isNightMode ? 'text-neutral-300' : 'text-[#111111]'}`}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Julian Taylor"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F5A623] transition-all border ${
                    isNightMode
                      ? 'bg-[#1E2026] border-stone-700 text-white placeholder-neutral-500'
                      : 'bg-neutral-50 border-neutral-200 text-[#111111] focus:bg-white'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1 uppercase tracking-wider ${isNightMode ? 'text-neutral-300' : 'text-[#111111]'}`}>Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="julian@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F5A623] transition-all border ${
                      isNightMode
                        ? 'bg-[#1E2026] border-stone-700 text-white placeholder-neutral-500'
                        : 'bg-neutral-50 border-neutral-200 text-[#111111] focus:bg-white'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 uppercase tracking-wider ${isNightMode ? 'text-neutral-300' : 'text-[#111111]'}`}>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F5A623] transition-all border ${
                      isNightMode
                        ? 'bg-[#1E2026] border-stone-700 text-white placeholder-neutral-500'
                        : 'bg-neutral-50 border-neutral-200 text-[#111111] focus:bg-white'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CurvedSelect
                  label="Project Type"
                  value={formData.projectType}
                  options={[
                    'Residential Interior',
                    'Commercial / Office',
                    'Architectural Build',
                    'Kitchen & Dining',
                    'Home Renovation',
                  ]}
                  onChange={(val) => setFormData({ ...formData, projectType: val })}
                  isNightMode={isNightMode}
                />
                <CurvedSelect
                  label="Budget Range"
                  value={formData.budget}
                  options={[
                    '₹10 Lakh – ₹20 Lakh',
                    '₹20 Lakh – ₹30 Lakh',
                    '₹30 Lakh – ₹50 Lakh',
                    '₹50 Lakh+',
                  ]}
                  onChange={(val) => setFormData({ ...formData, budget: val })}
                  isNightMode={isNightMode}
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 uppercase tracking-wider ${isNightMode ? 'text-neutral-300' : 'text-[#111111]'}`}>Message</label>
                <textarea
                  name="message"
                  rows="3"
                  placeholder="Share a few details regarding your property, location, or expected timeline..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F5A623] transition-all border resize-none ${
                    isNightMode
                      ? 'bg-[#1E2026] border-stone-700 text-white placeholder-neutral-500'
                      : 'bg-neutral-50 border-neutral-200 text-[#111111] focus:bg-white'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={formLoading}
                className="w-full bg-[#F5A623] hover:bg-[#E59719] text-[#111111] font-bold py-3.5 rounded-full text-base transition-all duration-200 shadow-md disabled:opacity-50 cursor-pointer"
              >
                {formLoading ? 'Submitting...' : 'Submit Project Inquiry'}
              </button>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default PortfolioPage;