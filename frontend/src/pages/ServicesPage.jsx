import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { FiLayers, FiCompass, FiFeather, FiClock, FiArrowUpRight, FiX, FiCheckCircle } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

// Assets
import elevaturaLivingImg from '../assets/elevatura_living.jpg';
import elevaturaChairImg from '../assets/elevatura_chair.jpg';
import masonryKitchenImg from '../assets/masonry_kitchen.jpg';
import masonryBedroomImg from '../assets/masonry_bedroom.jpg';
import masonryBathroomImg from '../assets/masonry_bathroom.jpg';
import galleryYellowImg from '../assets/gallery3_yellow.jpg';
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

const servicesList = [
  {
    id: 'residential',
    number: '01',
    title: 'Residential Interior Design',
    tag: 'Signature Service',
    desc: 'Complete living room, bedroom, and full-home styling tailored to your daily rituals. We blend organic textures with contemporary Scandinavian warmth.',
    image: elevaturaLivingImg,
    path: '/services/residential',
    highlights: ['Custom Space Planning', 'Bespoke Furniture Sourcing', 'Ambient Lighting Schemes', 'Turnkey Execution'],
  },
  {
    id: 'commercial',
    number: '02',
    title: 'Commercial & Workspace Design',
    tag: 'Corporate & Retail',
    desc: 'High-impact offices, boutique studios, and retail spaces engineered for productivity, client impressions, and seamless brand storytelling.',
    image: galleryYellowImg,
    path: '/services/commercial',
    highlights: ['Executive Suites', 'Acoustic Architecture', 'Brand Integration', 'Ergonomic Workstations'],
  },
  {
    id: 'kitchen-bath',
    number: '03',
    title: 'Kitchen & Spa Bath Atelier',
    tag: 'Craftsmanship',
    desc: 'Culinary centers with waterfall marble islands and serene spa bathrooms with custom travertine stonework, fluted glass, and concealed lighting.',
    image: masonryKitchenImg,
    path: '/services/renovation',
    highlights: ['Waterfall Marble Islands', 'Custom Fluted Cabinetry', 'Concealed Cove Lighting', 'Luxury Plumbing Fixtures'],
  },
  {
    id: 'renovation',
    number: '04',
    title: 'Full Renovation & Remodeling',
    tag: 'End-to-End',
    desc: 'Breathing fresh life into existing properties through structural reconfiguration, flooring overhauls, and modern utility modernization.',
    image: masonryBedroomImg,
    path: '/services/renovation',
    highlights: ['Structural Wall Reconfiguration', 'Material & Texture Overhauls', 'On-Site Project Management', 'Budget & Timeline Guarantee'],
  },
  {
    id: 'architectural',
    number: '05',
    title: 'Architectural Space Planning',
    tag: 'Blueprints & 3D',
    desc: 'Precision 2D blueprints, photorealistic 3D spatial walkthroughs, and technical elevations designed before a single hammer is swung.',
    image: masonryBathroomImg,
    path: '/services/architectural',
    highlights: ['2D Floor Plans & Elevations', 'Photorealistic 3D Renders', 'Material Specifications', 'Electrical & Plumbing Layouts'],
  },
  {
    id: 'consultation',
    number: '06',
    title: 'Design Consultation & Styling',
    tag: 'Personalized',
    desc: 'One-on-one sessions with our senior architects to critique layouts, curate color palettes, select artisan decor, and refine your aesthetic vision.',
    image: elevaturaChairImg,
    path: '/services/consultation',
    highlights: ['Curated Mood Boards', 'Material & Fabric Swatches', 'Art & Decor Sourcing', 'Lighting & Color Direction'],
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Discovery & Vision',
    desc: 'We explore your lifestyle, aesthetic aspirations, spatial requirements, and investment budget.',
  },
  {
    step: '02',
    title: 'Architectural Concept',
    desc: '2D layouts, spatial flow studies, 3D renderings, and mood board curation tailored to your taste.',
  },
  {
    step: '03',
    title: 'Material & Joinery Design',
    desc: 'Selection of marble slabs, natural woods, bespoke textiles, lighting schedules, and hardware fixtures.',
  },
  {
    step: '04',
    title: 'Turnkey Execution',
    desc: 'White-glove on-site civil management, carpentry fabrication, rigorous quality audits, and key handover.',
  },
];

const ServicesPage = () => {
  const { isNightMode } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Residential Interior');
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

  const openInquiryModal = (serviceTitle = 'Residential Interior') => {
    setSelectedService(serviceTitle);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const res = await API.post('/enquiry/add', {
        ...formData,
        projectType: selectedService,
      });
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

  return (
    <div className={`min-h-screen selection:bg-[#F5A623] selection:text-white pt-24 pb-20 transition-colors duration-500 ${
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
              Our Expertise & Services
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
            Crafting Timeless Spaces,{' '}
            <span className={`font-normal ${isNightMode ? 'text-neutral-400' : 'text-[#555555]'}`}>Tailored for You.</span>
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
            From bespoke residential sanctuaries to high-performance commercial environments, our design studio blends architectural precision with contemporary elegance.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeInUp}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => openInquiryModal('General Inquiry')}
              className={`font-semibold px-8 py-3.5 rounded-full text-base transition-all duration-200 shadow-sm active:scale-95 cursor-pointer ${
                isNightMode
                  ? 'bg-[#C6A15B] hover:bg-[#b08d4a] text-black shadow-[#C6A15B]/20'
                  : 'bg-[#F5A623] hover:bg-[#E59719] text-[#111111]'
              }`}
            >
              Start Your Project
            </button>
            <Link
              to="/portfolio"
              className={`font-medium px-8 py-3.5 rounded-full text-base transition-all duration-200 inline-flex items-center gap-2 border ${
                isNightMode
                  ? 'border-stone-700 text-stone-300 hover:border-[#C6A15B] hover:text-white'
                  : 'border-neutral-300 hover:border-[#111111] text-[#111111]'
              }`}
            >
              <span>View Completed Works</span>
              <FiArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── SERVICES GRID SHOWCASE ─── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`group rounded-[20px] sm:rounded-[32px] overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between ${
                isNightMode
                  ? 'bg-[#121316] border-stone-800/80 hover:border-[#C6A15B]/50'
                  : 'bg-neutral-50 border-neutral-200/70'
              }`}
            >
              {/* Pure Clean Image with Zero Text Overlay */}
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Text & Content Details */}
              <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#F5A623] text-xs font-extrabold uppercase tracking-wider">
                      {service.number} • {service.tag}
                    </span>
                  </div>

                  <h3 className={`text-2xl font-bold tracking-tight transition-colors ${
                    isNightMode ? 'text-white group-hover:text-[#F5A623]' : 'text-[#111111] group-hover:text-[#F5A623]'
                  }`}>
                    {service.title}
                  </h3>
                  
                  <p className={`text-sm leading-relaxed mt-3 ${
                    isNightMode ? 'text-neutral-400' : 'text-[#555555]'
                  }`}>
                    {service.desc}
                  </p>

                  {/* Highlights Bullet List */}
                  <ul className={`mt-5 space-y-2 border-t pt-4 ${
                    isNightMode ? 'border-stone-800' : 'border-neutral-200/80'
                  }`}>
                    {service.highlights.map((h, i) => (
                      <li key={i} className={`flex items-center gap-2 text-xs font-medium ${
                        isNightMode ? 'text-neutral-300' : 'text-neutral-700'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-7 pt-4 flex items-center justify-between">
                  <button
                    onClick={() => openInquiryModal(service.title)}
                    className={`text-sm font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                      isNightMode ? 'text-stone-300 hover:text-[#F5A623]' : 'text-[#111111] hover:text-[#F5A623]'
                    }`}
                  >
                    Request Quote <span>→</span>
                  </button>

                  <Link
                    to={service.path}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-sm border ${
                      isNightMode
                        ? 'bg-black/50 border-stone-700 text-white group-hover:bg-[#F5A623] group-hover:border-[#F5A623] group-hover:text-black'
                        : 'bg-white border-neutral-200 text-[#111111] group-hover:bg-[#F5A623] group-hover:border-[#F5A623] group-hover:text-black'
                    }`}
                  >
                    <FiArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── DEDICATED ARCHITECTURAL & CONSTRUCTION DESIGN SECTION ─── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 py-10 sm:py-16">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]" />
              <span className="text-xs uppercase font-bold tracking-widest text-[#F5A623]">
                End-to-End Engineering
              </span>
            </div>
            <h2 className={`text-2xl sm:text-5xl font-extrabold tracking-tight ${
              isNightMode ? 'text-white' : 'text-[#111111]'
            }`}>
              Architectural Design & <span className={`font-light ${isNightMode ? 'text-neutral-400' : 'text-[#666666]'}`}>Construction Build</span>
            </h2>
            <p className={`text-base mt-2 max-w-xl ${isNightMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Bridging the gap between visionary blueprints and heavy civil engineering. We design, permit, and construct bespoke residences with architectural integrity.
            </p>
          </div>

          <button
            onClick={() => openInquiryModal('Architectural & Construction Build')}
            className={`font-semibold px-7 py-3.5 rounded-full text-sm transition-all shadow-sm active:scale-95 whitespace-nowrap cursor-pointer inline-flex items-center gap-2 ${
              isNightMode
                ? 'bg-[#C6A15B] text-black hover:bg-[#b08d4a]'
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
                ? 'bg-[#121316] border-stone-800/80 hover:border-[#C6A15B]/40'
                : 'bg-[#FAF8F5] border-neutral-200/80'
            }`}
          >
            <div>
              {/* Clean Image */}
              <div className="relative aspect-[16/10] rounded-[24px] overflow-hidden mb-8 bg-neutral-200 shadow-sm">
                <img
                  src={serviceArchitectureImg}
                  alt="Architectural Blueprint and Scale Model"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#F5A623] text-xs font-extrabold uppercase tracking-widest">
                  Blueprint & Conceptualization
                </span>
              </div>

              <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                isNightMode ? 'text-white' : 'text-[#111111]'
              }`}>
                Architectural Masterplanning & 3D Spatial Visualization
              </h3>

              <p className={`text-sm sm:text-base leading-relaxed mt-4 ${
                isNightMode ? 'text-neutral-400' : 'text-neutral-600'
              }`}>
                We transform raw land plots and empty penthouses into bespoke architectural landmarks. Our licensed architects deliver comprehensive 2D municipal blueprints, solar-path daylight calculations, and 8K VR walkthroughs.
              </p>

              <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-neutral-200/60">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <FiCompass className="text-[#F5A623] w-4 h-4 flex-shrink-0" />
                  <span className={isNightMode ? 'text-neutral-300' : 'text-neutral-800'}>2D/3D BIM Modeling</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <FiLayers className="text-[#F5A623] w-4 h-4 flex-shrink-0" />
                  <span className={isNightMode ? 'text-neutral-300' : 'text-neutral-800'}>Structural Load Testing</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <FiFeather className="text-[#F5A623] w-4 h-4 flex-shrink-0" />
                  <span className={isNightMode ? 'text-neutral-300' : 'text-neutral-800'}>Biophilic Micro-Climate</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <FiClock className="text-[#F5A623] w-4 h-4 flex-shrink-0" />
                  <span className={isNightMode ? 'text-neutral-300' : 'text-neutral-800'}>Fast-Track Sanctions</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200/60 flex items-center justify-between">
              <span className={`text-xs font-medium ${isNightMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Turnaround: 3–6 Weeks
              </span>
              <button
                onClick={() => openInquiryModal('Architectural Planning')}
                className={`font-bold text-sm hover:underline cursor-pointer inline-flex items-center gap-1 ${
                  isNightMode ? 'text-[#C6A15B]' : 'text-[#111111]'
                }`}
              >
                Inquire Architecture →
              </button>
            </div>
          </motion.div>

          {/* Card 2: Civil Construction & Structural Execution */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className={`border rounded-[24px] sm:rounded-[36px] overflow-hidden p-5 sm:p-10 flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-500 ${
              isNightMode
                ? 'bg-[#121316] border-stone-800/80 hover:border-[#C6A15B]/40'
                : 'bg-[#FAF8F5] border-neutral-200/80'
            }`}
          >
            <div>
              {/* Clean Image */}
              <div className="relative aspect-[16/10] rounded-[24px] overflow-hidden mb-8 bg-neutral-200 shadow-sm">
                <img
                  src={serviceConstructionImg}
                  alt="Civil Construction Foundation and Steel Framing"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#F5A623] text-xs font-extrabold uppercase tracking-widest">
                  Structural Execution
                </span>
              </div>

              <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                isNightMode ? 'text-white' : 'text-[#111111]'
              }`}>
                Turnkey Civil Construction & Luxury Villa Build
              </h3>

              <p className={`text-sm sm:text-base leading-relaxed mt-4 ${
                isNightMode ? 'text-neutral-400' : 'text-neutral-600'
              }`}>
                Our in-house civil engineering division handles excavation, seismic-rated RCC framing, waterproofing, high-performance curtain walls, and premium MEP integration with zero subcontracting delays.
              </p>

              <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-neutral-200/60">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <FiLayers className="text-[#F5A623] w-4 h-4 flex-shrink-0" />
                  <span className={isNightMode ? 'text-neutral-300' : 'text-neutral-800'}>RCC & Steel Framing</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <FiCompass className="text-[#F5A623] w-4 h-4 flex-shrink-0" />
                  <span className={isNightMode ? 'text-neutral-300' : 'text-neutral-800'}>Grade-A Waterproofing</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <FiFeather className="text-[#F5A623] w-4 h-4 flex-shrink-0" />
                  <span className={isNightMode ? 'text-neutral-300' : 'text-neutral-800'}>Thermal Glazing Facades</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <FiClock className="text-[#F5A623] w-4 h-4 flex-shrink-0" />
                  <span className={isNightMode ? 'text-neutral-300' : 'text-neutral-800'}>Guaranteed Handover</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200/60 flex items-center justify-between">
              <span className={`text-xs font-medium ${isNightMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Scale: 3,000 to 50,000+ sq.ft
              </span>
              <button
                onClick={() => openInquiryModal('Civil Construction Build')}
                className={`font-bold text-sm hover:underline cursor-pointer inline-flex items-center gap-1 ${
                  isNightMode ? 'text-[#C6A15B]' : 'text-[#111111]'
                }`}
              >
                Inquire Construction →
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ─── PROCESS TIMELINE ─── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 py-12 sm:py-20">
        <div className="max-w-2xl mb-12">
          <span className="text-[#F5A623] text-xs font-extrabold uppercase tracking-widest block mb-2">
            Our Methodology
          </span>
          <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${
            isNightMode ? 'text-white' : 'text-[#111111]'
          }`}>
            How We Execute Your Space
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`p-6 sm:p-8 rounded-[20px] sm:rounded-[32px] border transition-all ${
                isNightMode
                  ? 'bg-[#121316] border-stone-800 shadow-md hover:border-[#C6A15B]/40'
                  : 'bg-[#FAF8F5] border-neutral-200/80 shadow-sm'
              }`}
            >
              <span className="text-3xl sm:text-4xl font-black text-[#F5A623] block mb-4">
                {p.step}
              </span>
              <h3 className={`text-xl font-bold tracking-tight mb-2 ${
                isNightMode ? 'text-white' : 'text-[#111111]'
              }`}>
                {p.title}
              </h3>
              <p className={`text-sm leading-relaxed ${
                isNightMode ? 'text-neutral-400' : 'text-[#555555]'
              }`}>
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── BOTTOM INVITATION CTA ─── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 py-12">
        <div className={`rounded-[24px] sm:rounded-[36px] p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8 border transition-all ${
          isNightMode
            ? 'bg-[#15171C] border-stone-800 shadow-2xl text-white'
            : 'bg-[#FAF8F5] border-neutral-200/80 text-[#111111]'
        }`}>
          <div className="max-w-xl">
            <span className="text-[#F5A623] text-xs font-bold uppercase tracking-widest block mb-2">
              Start Today
            </span>
            <h3 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${
              isNightMode ? 'text-white' : 'text-[#111111]'
            }`}>
              Let’s create something truly memorable together.
            </h3>
            <p className={`text-sm sm:text-base mt-2 ${
              isNightMode ? 'text-neutral-400' : 'text-neutral-600'
            }`}>
              Book a complimentary spatial consultation with our senior architectural designers.
            </p>
          </div>

          <button
            onClick={() => openInquiryModal('Complimentary Consultation')}
            className={`font-bold px-9 py-4 rounded-full text-base transition-all duration-200 shadow-md active:scale-95 cursor-pointer whitespace-nowrap inline-flex items-center gap-2 ${
              isNightMode
                ? 'bg-[#C6A15B] hover:bg-[#b08d4a] text-black shadow-[#C6A15B]/20'
                : 'bg-[#F5A623] hover:bg-[#E59719] text-[#111111]'
            }`}
          >
            <span>Book Free Consultation</span>
            <FiArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ─── INQUIRY / CONSULTATION MODAL ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative border ${
              isNightMode
                ? 'bg-[#121316] border-stone-800 text-white'
                : 'bg-white border-neutral-200 text-[#111111]'
            }`}
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              aria-label="Close Modal"
              className={`absolute top-5 right-5 p-1 rounded-full transition-colors ${
                isNightMode ? 'text-neutral-400 hover:text-white hover:bg-white/10' : 'text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <FiX className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[#F5A623] font-bold text-xs uppercase tracking-widest">ELEVATURA SERVICES</span>
              <h3 className={`text-2xl sm:text-3xl font-extrabold mt-1 ${isNightMode ? 'text-white' : 'text-[#111111]'}`}>
                Book Consultation
              </h3>
              <p className={`text-sm mt-1 ${isNightMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Selected Service: <span className={`font-semibold ${isNightMode ? 'text-[#C6A15B]' : 'text-[#111111]'}`}>{selectedService}</span>
              </p>
            </div>

            {formSuccess && (
              <div className="bg-emerald-950/60 border border-emerald-800 text-emerald-200 p-3.5 rounded-xl text-sm mb-4 flex items-center gap-2">
                <FiCheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Thank you! We received your request and will reach out promptly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-xs font-semibold mb-1 uppercase tracking-wider ${
                  isNightMode ? 'text-neutral-300' : 'text-[#111111]'
                }`}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full rounded-xl px-4 py-3 text-sm transition-all border ${
                    isNightMode
                      ? 'bg-[#1A1B20] border-stone-800 text-white placeholder-stone-500 focus:outline-none focus:border-[#C6A15B]'
                      : 'bg-neutral-50 border-neutral-200 text-[#111111] focus:outline-none focus:border-[#F5A623] focus:bg-white'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1 uppercase tracking-wider ${
                    isNightMode ? 'text-neutral-300' : 'text-[#111111]'
                  }`}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-xl px-4 py-3 text-sm transition-all border ${
                      isNightMode
                        ? 'bg-[#1A1B20] border-stone-800 text-white placeholder-stone-500 focus:outline-none focus:border-[#C6A15B]'
                        : 'bg-neutral-50 border-neutral-200 text-[#111111] focus:outline-none focus:border-[#F5A623] focus:bg-white'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 uppercase tracking-wider ${
                    isNightMode ? 'text-neutral-300' : 'text-[#111111]'
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
                    className={`w-full rounded-xl px-4 py-3 text-sm transition-all border ${
                      isNightMode
                        ? 'bg-[#1A1B20] border-stone-800 text-white placeholder-stone-500 focus:outline-none focus:border-[#C6A15B]'
                        : 'bg-neutral-50 border-neutral-200 text-[#111111] focus:outline-none focus:border-[#F5A623] focus:bg-white'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1 uppercase tracking-wider ${
                    isNightMode ? 'text-neutral-300' : 'text-[#111111]'
                  }`}>
                    Service Type
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className={`w-full rounded-xl px-4 py-3 text-sm transition-all border ${
                      isNightMode
                        ? 'bg-[#1A1B20] border-stone-800 text-white focus:outline-none focus:border-[#C6A15B]'
                        : 'bg-neutral-50 border-neutral-200 text-[#111111] focus:outline-none focus:border-[#F5A623] focus:bg-white'
                    }`}
                  >
                    <option className="bg-neutral-900 text-white" value="Residential Interior">Residential Interior</option>
                    <option className="bg-neutral-900 text-white" value="Commercial & Workspace Design">Commercial & Workspace</option>
                    <option className="bg-neutral-900 text-white" value="Kitchen & Spa Bath Atelier">Kitchen & Spa Bath</option>
                    <option className="bg-neutral-900 text-white" value="Full Renovation & Remodeling">Full Renovation</option>
                    <option className="bg-neutral-900 text-white" value="Architectural Space Planning">Architectural Space Planning</option>
                    <option className="bg-neutral-900 text-white" value="Design Consultation & Styling">Design Consultation</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 uppercase tracking-wider ${
                    isNightMode ? 'text-neutral-300' : 'text-[#111111]'
                  }`}>
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className={`w-full rounded-xl px-4 py-3 text-sm transition-all border ${
                      isNightMode
                        ? 'bg-[#1A1B20] border-stone-800 text-white focus:outline-none focus:border-[#C6A15B]'
                        : 'bg-neutral-50 border-neutral-200 text-[#111111] focus:outline-none focus:border-[#F5A623] focus:bg-white'
                    }`}
                  >
                    <option className="bg-neutral-900 text-white" value="10L-20L">₹10 Lakh – ₹20 Lakh</option>
                    <option className="bg-neutral-900 text-white" value="20L-30L">₹20 Lakh – ₹30 Lakh</option>
                    <option className="bg-neutral-900 text-white" value="30L-50L">₹30 Lakh – ₹50 Lakh</option>
                    <option className="bg-neutral-900 text-white" value="50L+">₹50 Lakh+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 uppercase tracking-wider ${
                  isNightMode ? 'text-neutral-300' : 'text-[#111111]'
                }`}>
                  Project Details
                </label>
                <textarea
                  name="message"
                  rows="3"
                  placeholder="Share a few details regarding your space, property location, or timeline..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full rounded-xl px-4 py-3 text-sm transition-all border resize-none ${
                    isNightMode
                      ? 'bg-[#1A1B20] border-stone-800 text-white placeholder-stone-500 focus:outline-none focus:border-[#C6A15B]'
                      : 'bg-neutral-50 border-neutral-200 text-[#111111] focus:outline-none focus:border-[#F5A623] focus:bg-white'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={formLoading}
                className={`w-full font-bold py-3.5 rounded-full text-base transition-all duration-200 shadow-md disabled:opacity-50 cursor-pointer ${
                  isNightMode
                    ? 'bg-[#C6A15B] hover:bg-[#b08d4a] text-black shadow-[#C6A15B]/20'
                    : 'bg-[#F5A623] hover:bg-[#E59719] text-[#111111]'
                }`}
              >
                {formLoading ? 'Submitting...' : 'Request Consultation'}
              </button>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default ServicesPage;