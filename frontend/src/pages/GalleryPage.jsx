// src/pages/GalleryPage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiZoomIn } from 'react-icons/fi';
import API from '../api/axios';
import { useTheme } from '../context/ThemeContext';
import { GalleryGridSkeleton } from '../components/SkeletonLoaders';

const defaultGalleryItems = [
  {
    _id: 'gal-1',
    title: 'Monolithic Marble Kitchen Atelier',
    category: 'Kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  {
    _id: 'gal-2',
    title: 'Nordic Horizon Living Pavilion',
    category: 'Living Room',
    imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  {
    _id: 'gal-3',
    title: 'Fluted Oak Master Suite Sanctuary',
    category: 'Bedroom',
    imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  {
    _id: 'gal-4',
    title: 'Travertine Spa & Wetroom Suite',
    category: 'Bathroom',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  {
    _id: 'gal-5',
    title: 'Executive Glasshouse Corporate Lounge',
    category: 'Commercial',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  {
    _id: 'gal-6',
    title: 'Penthouse Skyline Terraces',
    category: 'Outdoor',
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
];

const GalleryPage = () => {
  const { isNightMode } = useTheme();
  const [images, setImages] = useState(defaultGalleryItems);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, [category]);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const url = category === 'All' ? '/gallery' : `/gallery/category/${category}`;
      const res = await API.get(url);
      if (res.data?.data && res.data.data.length > 0) {
        setImages(res.data.data);
      } else {
        setImages(defaultGalleryItems);
      }
    } catch {
      setImages(defaultGalleryItems);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...new Set(defaultGalleryItems.map((img) => img.category))];
  const displayedImages = category === 'All'
    ? images
    : images.filter((img) => img.category.toLowerCase() === category.toLowerCase());

  return (
    <div className={`pt-24 min-h-screen transition-colors duration-500 ${
      isNightMode ? 'bg-[#0B0C0E] text-white' : 'bg-[#FCF9F7] text-[#111111]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#C6A15B] font-bold tracking-[0.25em] text-xs uppercase">Visual Archive</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-3">
            Spatial <span className="text-[#C6A15B]">Gallery</span>
          </h1>
          <p className={`max-w-2xl mx-auto mt-4 text-sm sm:text-base ${
            isNightMode ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            Immerse yourself in our portfolio of finished residences, bespoke joinery, and commercial architectural spaces.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  category === cat
                    ? 'bg-[#C6A15B] text-white shadow-md'
                    : isNightMode
                      ? 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                      : 'bg-neutral-200/70 text-neutral-700 hover:bg-neutral-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        {loading ? (
          <GalleryGridSkeleton count={9} isNight={isNightMode} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedImages.map((img, idx) => (
              <motion.div
                key={img._id || idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.07, duration: 0.5 }}
                onClick={() => setSelectedImage(img)}
                className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 shadow-sm hover:shadow-2xl ${
                  isNightMode
                    ? 'bg-[#15171C] border-white/10 hover:border-[#C6A15B]/50'
                    : 'bg-white border-neutral-200 hover:border-[#C6A15B]/50'
                }`}
              >
                <div className="relative h-72 sm:h-80 overflow-hidden bg-neutral-800">
                  <img
                    src={img.imageUrl}
                    alt={img.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center text-lg shadow-lg">
                      <FiZoomIn />
                    </span>
                  </div>
                  <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#C6A15B] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/10">
                    {img.category}
                  </span>
                </div>
                <div className="p-5">
                  <h2 className="font-bold text-base sm:text-lg group-hover:text-[#C6A15B] transition-colors">
                    {img.title}
                  </h2>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            >
              <button
                onClick={() => setSelectedImage(null)}
                aria-label="Close modal"
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-2xl transition"
              >
                <FiX />
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-5xl max-h-[85vh] flex flex-col items-center"
              >
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="max-h-[75vh] w-auto rounded-2xl shadow-2xl object-contain border border-white/10"
                />
                <div className="mt-4 text-center">
                  <span className="text-[#C6A15B] text-xs font-bold uppercase tracking-wider">
                    {selectedImage.category}
                  </span>
                  <h3 className="text-white text-xl font-bold mt-1">
                    {selectedImage.title}
                  </h3>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default GalleryPage;