import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaTimes, FaFilter } from 'react-icons/fa';
import { portfolioItems } from '../data/portfolio';
import type { PortfolioItem, FilterCategory } from '../types';
import VideoCard from './VideoCard';

const categories = ['all', 'lifestyle', 'dance', 'travel', 'food', 'music'];

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Filter items
  const filteredItems = portfolioItems.filter((item) => {
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesCategory;
  });

  const formatViews = (views: number) => {
    if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M';
    if (views >= 1000) return (views / 1000).toFixed(1) + 'K';
    return views.toString();
  };

  const getEmbedUrl = (item: PortfolioItem) => {
    if (item.platform === 'youtube' && item.videoUrl) {
      const videoId = item.videoUrl.split('v=')[1]?.split('&')[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
    return null;
  };

  return (
    <section
      id="portfolio"
      ref={ref}
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 dark:from-purple-600/10 dark:via-pink-600/10 dark:to-blue-600/10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-block glass px-4 py-2 rounded-full text-sm font-medium text-purple-600 dark:text-purple-400 mb-4"
          >
            My Work
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">Video Portfolio</span>{' '}
            <span className="text-gray-900 dark:text-white">Showcase</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Explore my best content across different categories
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="mb-8 space-y-4"
        >
          {/* Mobile Filter Toggle */}
          <div className="md:hidden flex items-center justify-center gap-4">
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className="glass px-4 py-2 rounded-full flex items-center gap-2 hover-glow"
              whileTap={{ scale: 0.95 }}
            >
              <FaFilter className="w-4 h-4" />
              <span>Filters</span>
            </motion.button>
          </div>

          {/* Desktop Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block space-y-4`}>
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setCategoryFilter(category as FilterCategory)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${categoryFilter === category
                      ? 'glass-strong bg-gradient-primary text-white'
                      : 'glass text-gray-700 dark:text-gray-300 hover:scale-105'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.button>
              ))}
            </div>

          </div>
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <VideoCard
                key={item.id}
                item={item}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-gray-600 dark:text-gray-400"
        >
          Showing {filteredItems.length} of {portfolioItems.length} videos
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 glass p-3 rounded-full hover-glow"
                aria-label="Close modal"
              >
                <FaTimes className="w-6 h-6" />
              </button>

              {/* Video Content */}
              <div className="p-6">
                {getEmbedUrl(selectedItem) ? (
                  <div className="aspect-video mb-6 rounded-xl overflow-hidden">
                    <iframe
                      src={getEmbedUrl(selectedItem)!}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={selectedItem.title}
                    />
                  </div>
                ) : (
                  <div className="aspect-video mb-6 rounded-xl overflow-hidden bg-gray-900">
                    <img
                      src={selectedItem.thumbnail}
                      alt={selectedItem.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Video Info */}
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {selectedItem.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    {selectedItem.description}
                  </p>

                  {/* Stats */}
                  {(selectedItem.views !== undefined || selectedItem.likes !== undefined) && (
                    <div className="flex flex-wrap gap-6 text-gray-700 dark:text-gray-300">
                      {selectedItem.views !== undefined && (
                        <div>
                          <span className="font-semibold">
                            {formatViews(selectedItem.views)}
                          </span> views
                        </div>
                      )}
                      {selectedItem.likes !== undefined && (
                        <div>
                          <span className="font-semibold">
                            {formatViews(selectedItem.likes)}
                          </span> likes
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="glass px-3 py-1 rounded-full text-sm text-gray-700 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* External Link */}
                  {selectedItem.videoUrl && (
                    <a
                      href={selectedItem.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block glass-strong px-6 py-3 rounded-full font-semibold hover-glow"
                    >
                      Watch on {selectedItem.platform.charAt(0).toUpperCase() + selectedItem.platform.slice(1)}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

