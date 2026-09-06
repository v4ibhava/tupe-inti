// src/pages/BlogPage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaFolder, FaArrowRight } from 'react-icons/fa';
import API from '../api/axios';
import { useTheme } from '../context/ThemeContext';
import { BlogGridSkeleton } from '../components/SkeletonLoaders';

const defaultBlogPosts = [
  {
    _id: 'default-1',
    slug: 'interior-design-trends-2025',
    title: 'Top 10 Architectural & Interior Design Trends for 2025',
    category: 'Trends & Styling',
    description: 'Discover the latest directions shaping luxury spaces – from biophilic natural elements to bespoke fluted textures and smart lighting.',
    featuredImage: 'https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    createdAt: new Date('2025-01-15').toISOString(),
  },
  {
    _id: 'default-2',
    slug: 'choosing-the-perfect-color-palette',
    title: 'How to Choose the Perfect Harmonious Color Palette',
    category: 'Color Theory',
    description: 'Learn the architectural art of selecting materials and hues that complement spatial lighting and elevate everyday tranquility.',
    featuredImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    createdAt: new Date('2025-02-02').toISOString(),
  },
  {
    _id: 'default-3',
    slug: 'maximizing-natural-light-in-penthouses',
    title: 'Maximizing Natural Light & Spatial Ergonomics in Modern Residences',
    category: 'Spatial Planning',
    description: 'Explore techniques to open sightlines, optimize window treatments, and create effortless circulation flows in high-rise suites.',
    featuredImage: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    createdAt: new Date('2025-02-18').toISOString(),
  },
];

const BlogPage = () => {
  const { isNightMode } = useTheme();
  const [posts, setPosts] = useState(defaultBlogPosts);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get('/posts');
        if (res.data?.data && res.data.data.length > 0) {
          setPosts(res.data.data);
        }
      } catch (error) {
        console.error('Error loading posts, using fallback:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const categories = ['All', ...new Set(posts.map((p) => p.category || 'General'))];
  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <div className={`pt-24 min-h-screen transition-colors duration-500 ${
      isNightMode ? 'bg-[#0B0C0E] text-white' : 'bg-[#FCF9F7] text-[#111111]'
    }`}>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#C6A15B] font-bold tracking-[0.25em] text-xs uppercase">Journal & Editorial</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-3">
            Design <span className="text-[#C6A15B]">Insights</span> & Journal
          </h1>
          <p className={`max-w-2xl mx-auto mt-4 text-sm sm:text-base ${
            isNightMode ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            Explore our curated perspectives on architectural luxury, spatial craftsmanship, and contemporary interior concepts.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat
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

        {/* Loading Skeleton */}
        {loading ? (
          <BlogGridSkeleton count={6} isNight={isNightMode} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => {
              const postSlug = post.slug || post._id;
              const formattedDate = post.createdAt
                ? new Date(post.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Recent';

              return (
                <motion.article
                  key={post._id || index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  className={`rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col group ${
                    isNightMode
                      ? 'bg-[#15171C] border-white/10 hover:border-[#C6A15B]/50 hover:shadow-2xl'
                      : 'bg-white border-neutral-200 hover:border-[#C6A15B]/50 hover:shadow-xl'
                  }`}
                >
                  <div className="relative h-56 overflow-hidden bg-neutral-800">
                    <img
                      src={post.featuredImage || post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {post.category && (
                      <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#C6A15B] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/10">
                        {post.category}
                      </span>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-neutral-400 mb-3">
                        <span className="flex items-center gap-1.5">
                          <FaCalendarAlt className="text-[#C6A15B]" /> {formattedDate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <FaFolder className="text-[#C6A15B]" /> {post.category || 'Architecture'}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold line-clamp-2 group-hover:text-[#C6A15B] transition-colors duration-200">
                        {post.title}
                      </h2>
                      <p className={`text-sm mt-3 line-clamp-3 ${
                        isNightMode ? 'text-neutral-400' : 'text-neutral-600'
                      }`}>
                        {post.description || post.excerpt}
                      </p>
                    </div>

                    <div className="pt-6 mt-4 border-t border-white/10">
                      <Link
                        to={`/blog/${postSlug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#C6A15B] hover:gap-3 transition-all"
                      >
                        Read Article <FaArrowRight className="text-xs" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogPage;