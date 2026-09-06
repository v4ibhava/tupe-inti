// src/pages/BlogDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaFolder, FaArrowLeft, FaClock, FaShareAlt } from 'react-icons/fa';
import API from '../api/axios';
import { useTheme } from '../context/ThemeContext';
import { BlogDetailSkeleton } from '../components/SkeletonLoaders';

const fallbackArticles = {
  'interior-design-trends-2025': {
    title: 'Top 10 Architectural & Interior Design Trends for 2025',
    category: 'Trends & Styling',
    featuredImage: 'https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    createdAt: '2025-01-15T00:00:00.000Z',
    content: `
      <p class="lead">As luxury architecture transitions into an era of mindful serenity, interior spaces are evolving beyond mere visual display into sensory retreats.</p>
      
      <h3>1. Biophilic Architecture & Living Terraces</h3>
      <p>Integrating indoor botanical atriums, natural travertine stone, and floor-to-ceiling panoramic glass brings natural daylight and vitality into private living sanctuaries.</p>
      
      <h3>2. Fluted Textures & Sculptural Joinery</h3>
      <p>From fluted walnut millwork to ribbed marble kitchen islands, geometric ribbing creates subtle shadow lines that change dynamically throughout the day.</p>
      
      <h3>3. Hidden Smart Automation</h3>
      <p>Circadian ambient lighting scenes, automated climate management, and hidden acoustic zones are now seamlessly engineered behind bespoke wall panels.</p>
      
      <h3>4. Warm Earthy Minimalism</h3>
      <p>Cool greys have yielded to rich creams, terracotta tones, brushed brass accents, and deep charcoal finishes that invite warmth and timeless elegance.</p>
    `,
  },
  'choosing-the-perfect-color-palette': {
    title: 'How to Choose the Perfect Harmonious Color Palette',
    category: 'Color Theory',
    featuredImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    createdAt: '2025-02-02T00:00:00.000Z',
    content: `
      <p class="lead">Color is the single most powerful architectural element that influences spatial mood, perceived scale, and emotional comfort.</p>
      
      <h3>The 60-30-10 Rule of Interior Harmony</h3>
      <p>A balanced composition relies on allocating 60% of the room to a dominant grounding tone (such as soft lime wash or travertine), 30% to a secondary texture (such as smoked oak or fluted glass), and 10% to dynamic accent metals and velvet upholstery.</p>
      
      <h3>Harnessing Natural Orientation</h3>
      <p>North-facing rooms benefit from warmer undertones to counteract cool indirect light, whereas south-facing rooms can carry deeper moody tones and tactile stone finishes effortlessly.</p>
    `,
  },
  'maximizing-natural-light-in-penthouses': {
    title: 'Maximizing Natural Light & Spatial Ergonomics in Modern Residences',
    category: 'Spatial Planning',
    featuredImage: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    createdAt: '2025-02-18T00:00:00.000Z',
    content: `
      <p class="lead">True luxury is boundless natural daylight, uncluttered sightlines, and seamless transitions between functional living zones.</p>
      
      <h3>Open Spatial Horizons</h3>
      <p>By replacing heavy partition walls with fluted glass screens and open architectural arches, light penetrates deep into the heart of the residence.</p>
      
      <h3>Reflective Materials & Matte Balances</h3>
      <p>Polished marble flooring paired with matte plastered ceilings ensures light bounce without harsh glare, creating a soft, luminous halo across every room.</p>
    `,
  },
};

const BlogDetail = () => {
  const { slug } = useParams();
  const { isNightMode } = useTheme();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/slug/${slug}`);
        if (res.data?.data) {
          setPost(res.data.data);
        } else if (fallbackArticles[slug]) {
          setPost(fallbackArticles[slug]);
        }
      } catch (error) {
        if (fallbackArticles[slug]) {
          setPost(fallbackArticles[slug]);
        } else {
          console.error('Error fetching post:', error);
          setPost(null);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return <BlogDetailSkeleton isNight={isNightMode} />;
  }

  if (!post) {
    return (
      <div className={`pt-36 pb-20 min-h-screen text-center px-4 ${
        isNightMode ? 'bg-[#0B0C0E] text-white' : 'bg-[#FCF9F7] text-[#111111]'
      }`}>
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <p className="text-neutral-500 mb-8">The journal article you are looking for does not exist or has been relocated.</p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C6A15B] text-white font-semibold hover:bg-[#b08d4a] transition"
        >
          <FaArrowLeft /> Return to Journal
        </Link>
      </div>
    );
  }

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Journal Editorial';

  return (
    <div className={`min-h-screen pt-28 pb-24 transition-colors duration-500 ${
      isNightMode ? 'bg-[#0B0C0E] text-stone-100' : 'bg-[#FCF9F7] text-[#1a1410]'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C6A15B] hover:text-[#b08d4a] transition-colors font-semibold"
          >
            <FaArrowLeft className="text-xs" /> Back to Journal
          </Link>
        </motion.div>

        {/* Header Metadata */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
            <span className="px-3.5 py-1.5 rounded-full bg-[#C6A15B]/15 text-[#C6A15B] border border-[#C6A15B]/30 font-semibold uppercase tracking-wider">
              {post.category || 'Editorial'}
            </span>
            <span className="flex items-center gap-1 text-neutral-400">
              <FaCalendarAlt className="text-xs" /> {formattedDate}
            </span>
            <span className="flex items-center gap-1 text-neutral-400">
              <FaClock className="text-xs" /> 4 min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          {post.description && (
            <p className="text-lg text-neutral-400 font-light leading-relaxed border-l-2 border-[#C6A15B] pl-4 italic">
              {post.description}
            </p>
          )}
        </motion.header>

        {/* Featured Image */}
        {post.featuredImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl overflow-hidden shadow-2xl mb-12 border border-neutral-800/40"
          >
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-80 sm:h-[480px] object-cover"
            />
          </motion.div>
        )}

        {/* Article Body */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#C6A15B] prose-p:leading-relaxed prose-p:text-neutral-300"
        >
          {post.content ? (
            post.content.includes('<') ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <div className="whitespace-pre-line text-neutral-300 font-serif leading-relaxed text-lg">
                {post.content}
              </div>
            )
          ) : (
            <p className="text-neutral-400 italic">No editorial content published yet.</p>
          )}
        </motion.article>

        {/* Footer Author & CTA */}
        <div className={`mt-16 pt-8 border-t ${isNightMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800/60">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#C6A15B] font-semibold">Published by</p>
              <h4 className="text-lg font-serif font-bold text-white mt-1">Tupe Brothers Atelier</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Architectural & Haute Living Design Studio</p>
            </div>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full bg-[#C6A15B] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#b08d4a] transition-all duration-300 shadow-lg"
            >
              Discuss Your Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;