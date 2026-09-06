import React from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Hook to safely read active theme without throwing if outside ThemeProvider
 */
const useActiveTheme = (overrideNight) => {
  try {
    const themeContext = useTheme();
    if (overrideNight !== undefined) return overrideNight;
    return themeContext?.isNightMode ?? false;
  } catch (e) {
    if (overrideNight !== undefined) return overrideNight;
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  }
};

/**
 * Base atomic skeleton block with luxury gold-tinted shimmer for both Day and Night modes
 */
export const Skeleton = ({ className = '', dark }) => {
  const isNight = useActiveTheme(dark);

  return (
    <div
      className={`rounded-xl transition-colors duration-300 ${
        isNight ? 'animate-shimmer-dark' : 'animate-shimmer-light'
      } ${className}`}
    />
  );
};

/**
 * Blog / Journal List Grid Skeleton (Public Page)
 */
export const BlogGridSkeleton = ({ count = 6, isNight: propNight }) => {
  const isNight = useActiveTheme(propNight);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`rounded-3xl overflow-hidden border p-6 flex flex-col justify-between h-[480px] transition-colors duration-300 ${
            isNight
              ? 'bg-[#121316] border-stone-800/80 shadow-lg'
              : 'bg-white border-[#E8E1D9] shadow-sm'
          }`}
        >
          {/* Top category & date */}
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <Skeleton dark={isNight} className="h-6 w-24 rounded-full" />
              <Skeleton dark={isNight} className="h-4 w-20 rounded-md" />
            </div>

            {/* Title lines */}
            <Skeleton dark={isNight} className="h-7 w-5/6 rounded-lg mb-2" />
            <Skeleton dark={isNight} className="h-7 w-2/3 rounded-lg mb-4" />

            {/* Description lines */}
            <Skeleton dark={isNight} className="h-4 w-full rounded-md mb-2" />
            <Skeleton dark={isNight} className="h-4 w-4/5 rounded-md" />
          </div>

          {/* Image Banner */}
          <div className="mt-4">
            <Skeleton dark={isNight} className="h-44 w-full rounded-2xl mb-4" />
            <div className="flex items-center justify-between pt-2">
              <Skeleton dark={isNight} className="h-4 w-28 rounded-md" />
              <Skeleton dark={isNight} className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Blog Article Detail Reader Skeleton
 */
export const BlogDetailSkeleton = ({ isNight: propNight }) => {
  const isNight = useActiveTheme(propNight);

  return (
    <div className={`min-h-screen pt-28 pb-24 transition-colors duration-300 ${
      isNight ? 'bg-[#0B0C0E]' : 'bg-[#FCF9F7]'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <Skeleton dark={isNight} className="h-5 w-32 rounded-lg mb-8" />

        {/* Category & Date Pills */}
        <div className="flex items-center gap-3 mb-6">
          <Skeleton dark={isNight} className="h-7 w-28 rounded-full" />
          <Skeleton dark={isNight} className="h-5 w-24 rounded-md" />
        </div>

        {/* Title */}
        <Skeleton dark={isNight} className="h-12 w-full rounded-xl mb-3" />
        <Skeleton dark={isNight} className="h-12 w-3/4 rounded-xl mb-8" />

        {/* Hero Cover Image */}
        <Skeleton dark={isNight} className="h-80 sm:h-[420px] w-full rounded-3xl mb-10" />

        {/* Article Body Paragraphs */}
        <div className="space-y-4 mb-10">
          <Skeleton dark={isNight} className="h-5 w-full rounded-md" />
          <Skeleton dark={isNight} className="h-5 w-11/12 rounded-md" />
          <Skeleton dark={isNight} className="h-5 w-full rounded-md" />
          <Skeleton dark={isNight} className="h-5 w-4/5 rounded-md" />
        </div>

        <div className="space-y-4 mb-12">
          <Skeleton dark={isNight} className="h-7 w-1/3 rounded-lg mb-4" />
          <Skeleton dark={isNight} className="h-5 w-full rounded-md" />
          <Skeleton dark={isNight} className="h-5 w-5/6 rounded-md" />
          <Skeleton dark={isNight} className="h-5 w-full rounded-md" />
        </div>

        {/* Author / CTA Card */}
        <div className={`p-8 rounded-3xl border transition-colors duration-300 ${
          isNight ? 'bg-[#121316] border-stone-800' : 'bg-white border-stone-200'
        }`}>
          <div className="flex items-center gap-4">
            <Skeleton dark={isNight} className="w-14 h-14 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton dark={isNight} className="h-5 w-40 rounded-md" />
              <Skeleton dark={isNight} className="h-4 w-60 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Gallery Grid Skeleton (Public Page)
 */
export const GalleryGridSkeleton = ({ count = 8, isNight: propNight }) => {
  const isNight = useActiveTheme(propNight);

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
      {Array.from({ length: count }).map((_, i) => {
        const heights = ['h-64', 'h-80', 'h-72', 'h-96'];
        const h = heights[i % heights.length];
        return (
          <div
            key={i}
            className={`break-inside-avoid rounded-2xl overflow-hidden border p-3 transition-colors duration-300 ${
              isNight ? 'bg-[#121316] border-stone-800/80 shadow-lg' : 'bg-white border-[#E8E1D9] shadow-sm'
            }`}
          >
            <Skeleton dark={isNight} className={`w-full ${h} rounded-xl mb-3`} />
            <div className="flex items-center justify-between">
              <Skeleton dark={isNight} className="h-4 w-28 rounded-md" />
              <Skeleton dark={isNight} className="h-4 w-16 rounded-md" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

/**
 * Admin Dashboard Skeleton Loader (Responsive to Day / Night Theme)
 */
export const AdminDashboardSkeleton = ({ isNight: propNight }) => {
  const isNight = useActiveTheme(propNight);

  return (
    <div className={`pt-20 min-h-screen pb-20 transition-colors duration-300 ${
      isNight ? 'bg-[#0B0C0E] text-stone-100' : 'bg-[#FCF9F7] text-[#2B1E16]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Bar */}
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 ${
          isNight ? 'border-stone-800/80' : 'border-[#E8E1D9]'
        }`}>
          <div className="space-y-2">
            <Skeleton dark={isNight} className="h-9 w-64 rounded-xl" />
            <Skeleton dark={isNight} className="h-4 w-96 rounded-md" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton dark={isNight} className="h-10 w-28 rounded-xl" />
            <Skeleton dark={isNight} className="h-10 w-28 rounded-xl" />
          </div>
        </div>

        {/* 5-Card Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`border rounded-2xl p-5 space-y-3 transition-colors duration-300 ${
              isNight ? 'bg-[#121316] border-stone-800/90 shadow-lg' : 'bg-white border-[#E8E1D9] shadow-sm'
            }`}>
              <div className="flex items-center justify-between">
                <Skeleton dark={isNight} className="h-3 w-20 rounded-md" />
                <Skeleton dark={isNight} className="w-8 h-8 rounded-lg" />
              </div>
              <Skeleton dark={isNight} className="h-8 w-16 rounded-md" />
              <Skeleton dark={isNight} className="h-3 w-24 rounded-md" />
            </div>
          ))}
        </div>

        {/* Quick Launch Strip */}
        <div className={`border rounded-2xl p-6 transition-colors duration-300 ${
          isNight ? 'bg-[#121316] border-stone-800/90 shadow-lg' : 'bg-white border-[#E8E1D9] shadow-sm'
        }`}>
          <Skeleton dark={isNight} className="h-5 w-36 rounded-md mb-4" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} dark={isNight} className="h-12 rounded-xl" />
            ))}
          </div>
        </div>

        {/* Recent Leads Table Shimmer */}
        <div className={`border rounded-2xl p-6 space-y-4 transition-colors duration-300 ${
          isNight ? 'bg-[#121316] border-stone-800/90 shadow-lg' : 'bg-white border-[#E8E1D9] shadow-sm'
        }`}>
          <div className={`flex items-center justify-between pb-4 border-b ${
            isNight ? 'border-stone-800/80' : 'border-[#E8E1D9]'
          }`}>
            <Skeleton dark={isNight} className="h-6 w-48 rounded-md" />
            <Skeleton dark={isNight} className="h-8 w-24 rounded-xl" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`p-4 rounded-xl flex items-center justify-between gap-4 ${
                isNight ? 'bg-stone-900/40' : 'bg-[#F9F6F2]'
              }`}>
                <div className="flex items-center gap-3">
                  <Skeleton dark={isNight} className="w-10 h-10 rounded-full" />
                  <div className="space-y-1.5">
                    <Skeleton dark={isNight} className="h-4 w-36 rounded-md" />
                    <Skeleton dark={isNight} className="h-3 w-48 rounded-md" />
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <Skeleton dark={isNight} className="h-6 w-20 rounded-full" />
                  <Skeleton dark={isNight} className="h-8 w-8 rounded-lg" />
                  <Skeleton dark={isNight} className="h-8 w-8 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Admin Management Page Skeleton (Form on Left, Grid/Table on Right)
 */
export const AdminManagementSkeleton = ({ isNight: propNight }) => {
  const isNight = useActiveTheme(propNight);

  return (
    <div className={`pt-20 min-h-screen pb-24 transition-colors duration-300 ${
      isNight ? 'bg-[#0B0C0E] text-stone-100' : 'bg-[#FCF9F7] text-[#2B1E16]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Bar */}
        <div className={`flex items-center justify-between gap-4 border-b pb-6 ${
          isNight ? 'border-stone-800/80' : 'border-[#E8E1D9]'
        }`}>
          <div className="space-y-2">
            <Skeleton dark={isNight} className="h-8 w-60 rounded-xl" />
            <Skeleton dark={isNight} className="h-4 w-80 rounded-md" />
          </div>
          <Skeleton dark={isNight} className="h-10 w-36 rounded-xl" />
        </div>

        {/* 2-Column Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form Panel */}
          <div className={`lg:col-span-5 border rounded-2xl p-6 space-y-5 transition-colors duration-300 ${
            isNight ? 'bg-[#121316] border-stone-800/90 shadow-lg' : 'bg-white border-[#E8E1D9] shadow-sm'
          }`}>
            <Skeleton dark={isNight} className="h-6 w-40 rounded-md pb-2" />
            <Skeleton dark={isNight} className="h-10 w-full rounded-xl" />
            <Skeleton dark={isNight} className="h-10 w-full rounded-xl" />
            <Skeleton dark={isNight} className="h-24 w-full rounded-xl" />
            <Skeleton dark={isNight} className="h-32 w-full rounded-2xl" />
            <Skeleton dark={isNight} className="h-12 w-full rounded-xl" />
          </div>

          {/* Right List Panel */}
          <div className="lg:col-span-7 space-y-5">
            {/* Filter and Search Bar */}
            <div className={`border rounded-2xl p-4 flex items-center justify-between gap-4 transition-colors duration-300 ${
              isNight ? 'bg-[#121316] border-stone-800/90 shadow-lg' : 'bg-white border-[#E8E1D9] shadow-sm'
            }`}>
              <Skeleton dark={isNight} className="h-9 w-64 rounded-xl" />
              <Skeleton dark={isNight} className="h-6 w-32 rounded-md" />
            </div>

            {/* Grid Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={`border rounded-2xl overflow-hidden p-4 space-y-3 transition-colors duration-300 ${
                  isNight ? 'bg-[#121316] border-stone-800/90 shadow-lg' : 'bg-white border-[#E8E1D9] shadow-sm'
                }`}>
                  <Skeleton dark={isNight} className="h-40 w-full rounded-xl" />
                  <Skeleton dark={isNight} className="h-5 w-3/4 rounded-md" />
                  <Skeleton dark={isNight} className="h-4 w-full rounded-md" />
                  <div className="flex justify-between items-center pt-2">
                    <Skeleton dark={isNight} className="h-4 w-20 rounded-md" />
                    <div className="flex gap-2">
                      <Skeleton dark={isNight} className="w-8 h-8 rounded-lg" />
                      <Skeleton dark={isNight} className="w-8 h-8 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Admin CRM Enquiries Skeleton (Responsive to Day / Night Theme)
 */
export const AdminEnquiriesSkeleton = ({ isNight: propNight }) => {
  const isNight = useActiveTheme(propNight);

  return (
    <div className={`pt-20 min-h-screen pb-24 transition-colors duration-300 ${
      isNight ? 'bg-[#0B0C0E] text-stone-100' : 'bg-[#FCF9F7] text-[#2B1E16]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Bar */}
        <div className={`flex items-center justify-between gap-4 border-b pb-6 ${
          isNight ? 'border-stone-800/80' : 'border-[#E8E1D9]'
        }`}>
          <div className="space-y-2">
            <Skeleton dark={isNight} className="h-8 w-60 rounded-xl" />
            <Skeleton dark={isNight} className="h-4 w-80 rounded-md" />
          </div>
          <div className="flex gap-3">
            <Skeleton dark={isNight} className="h-10 w-28 rounded-xl" />
            <Skeleton dark={isNight} className="h-10 w-28 rounded-xl" />
          </div>
        </div>

        {/* Search & Tabs */}
        <div className={`border rounded-2xl p-4 flex flex-col sm:flex-row gap-4 justify-between items-center transition-colors duration-300 ${
          isNight ? 'bg-[#121316] border-stone-800/90 shadow-lg' : 'bg-white border-[#E8E1D9] shadow-sm'
        }`}>
          <Skeleton dark={isNight} className="h-10 w-full sm:w-80 rounded-xl" />
          <div className="flex gap-2">
            <Skeleton dark={isNight} className="h-9 w-20 rounded-xl" />
            <Skeleton dark={isNight} className="h-9 w-24 rounded-xl" />
            <Skeleton dark={isNight} className="h-9 w-24 rounded-xl" />
          </div>
        </div>

        {/* Lead Rows */}
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`border rounded-2xl p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 transition-colors duration-300 ${
              isNight ? 'bg-[#121316] border-stone-800/90 shadow-lg' : 'bg-white border-[#E8E1D9] shadow-sm'
            }`}>
              <div className="flex items-center gap-4 flex-1">
                <Skeleton dark={isNight} className="w-12 h-12 rounded-2xl" />
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <Skeleton dark={isNight} className="h-5 w-40 rounded-md" />
                    <Skeleton dark={isNight} className="h-5 w-24 rounded-full" />
                  </div>
                  <Skeleton dark={isNight} className="h-4 w-60 rounded-md" />
                  <Skeleton dark={isNight} className="h-4 w-full max-w-lg rounded-md" />
                </div>
              </div>
              <div className="flex items-center gap-2 self-end lg:self-center">
                <Skeleton dark={isNight} className="h-9 w-24 rounded-xl" />
                <Skeleton dark={isNight} className="h-9 w-24 rounded-xl" />
                <Skeleton dark={isNight} className="h-9 w-9 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
