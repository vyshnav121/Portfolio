import { motion } from 'framer-motion';
import { FaPlay, FaEye, FaHeart, FaYoutube, FaFacebook, FaInstagram, FaTwitter, FaGlobe } from 'react-icons/fa';
import type { PortfolioItem } from '../types';

interface VideoCardProps {
  item: PortfolioItem;
  onClick: () => void;
}

const platformIcons = {
  youtube: FaYoutube,
  facebook: FaFacebook,
  instagram: FaInstagram,
  twitter: FaTwitter,
  other: FaGlobe,
};

const platformColors = {
  youtube: 'text-red-500',
  facebook: 'text-blue-600',
  instagram: 'text-pink-500',
  twitter: 'text-sky-500',
  other: 'text-gray-500',
};

export default function VideoCard({ item, onClick }: VideoCardProps) {
  const PlatformIcon = platformIcons[item.platform] || FaPlay;
  const platformColor = platformColors[item.platform] || 'text-gray-500';

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="glass-strong rounded-2xl overflow-hidden cursor-pointer group hover-glow relative"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-gray-900">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            whileHover={{ scale: 1.2 }}
            className="glass-strong rounded-full p-6"
          >
            <FaPlay className="w-8 h-8 text-white" />
          </motion.div>
        </div>

        {/* Platform Badge */}
        <div className="absolute top-3 left-3">
          <div className={`glass px-3 py-1.5 rounded-full flex items-center gap-2 ${platformColor}`}>
            <PlatformIcon className="w-4 h-4" />
            <span className="text-xs font-semibold capitalize">{item.platform}</span>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {item.featured && (
            <div className="glass px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold">
              Featured
            </div>
          )}
          {item.trending && (
            <div className="glass px-3 py-1.5 rounded-full bg-gradient-primary text-white text-xs font-semibold">
              Trending
            </div>
          )}
        </div>

        {/* Stats Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center justify-between text-white text-sm">
            <div className="flex items-center gap-4">
              {item.views !== undefined && (
                <div className="flex items-center gap-1">
                  <FaEye className="w-4 h-4" />
                  <span>{formatNumber(item.views)}</span>
                </div>
              )}
              {item.likes !== undefined && (
                <div className="flex items-center gap-1">
                  <FaHeart className="w-4 h-4" />
                  <span>{formatNumber(item.likes)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white line-clamp-2">
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {item.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs glass px-2 py-1 rounded-full text-gray-700 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Category */}
        <div className="text-xs text-gray-500 dark:text-gray-500 capitalize">
          {item.category}
        </div>
      </div>
    </motion.div>
  );
}

