import { motion } from 'framer-motion';
import { FaYoutube, FaFacebook, FaInstagram, FaCheckCircle } from 'react-icons/fa';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import profileImage from '../assets/Ansal1.jpg';

const platforms = [
  { name: 'YouTube', icon: FaYoutube, color: 'text-red-500', url: 'https://youtube.com/@wanderwithansil?si=wnZrOZ1b-RvLEUU_' },
  { name: 'Facebook', icon: FaFacebook, color: 'text-blue-600', url: 'https://www.facebook.com/ansiljohn.john/about' },
  { name: 'Instagram', icon: FaInstagram, color: 'text-pink-500', url: 'https://www.instagram.com/wanderwithansil/' },
];

const highlights = [
  '10+ Years of Content Creation Experience',
  '100+ Successful Brand Collaborations',
  '50M+ Total Video Views Across All Platforms',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="about"
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
          className="text-center mb-16"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-block glass px-4 py-2 rounded-full text-sm font-medium text-purple-600 dark:text-purple-400 mb-4"
          >
            About Me
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">Creating Content</span>{' '}
            <span className="text-gray-900 dark:text-white">That Resonates</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Passionate content creator specializing in lifestyle, entertainment videos
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column - Image/Video Showcase */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative glass-strong rounded-3xl overflow-hidden hover-glow">
              <img
                src={profileImage}
                alt="About Me - Content Creator"
                className="w-full h-auto object-cover"
              />

              {/* Overlay Stats */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">50M+</div>
                    <div className="text-sm text-gray-300">Total Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">48K+</div>
                    <div className="text-sm text-gray-300">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">100+</div>
                    <div className="text-sm text-gray-300">Collaborations</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Platform Badges */}
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <motion.a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                  className={`absolute ${index === 0 ? '-top-6 -left-6' : index === 1 ? '-bottom-6 -right-6' : 'top-1/2 -right-12'} glass p-4 rounded-full hover-glow`}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  <Icon className={`w-8 h-8 ${platform.color}`} />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Right Column - Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Introduction */}
            <div className="glass p-8 rounded-2xl hover-glow">
              <h3 className="text-2xl font-bold mb-4 gradient-text">Hey There! 👋</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                I'm a passionate content creator with over 10 years of experience in video production,
                storytelling, and digital media. My mission is to create authentic, engaging content that
                connects with audiences across multiple platforms.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                From lifestyle vlogs , I specialize in producing high-quality
                videos that entertain, inspire, and educate. My content focuses on productivity, personal
                development, travel, fashion, and everyday moments that matter.
              </p>
            </div>

            {/* Content Niche */}
            <div className="glass p-8 rounded-2xl hover-glow">
              <h3 className="text-2xl font-bold mb-4 gradient-text">My Content Niche</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                I create diverse content spanning lifestyle, entertainment, education, and inspiration.
                My videos combine authentic storytelling with professional production quality, making
                complex topics accessible and everyday moments extraordinary.
              </p>
            </div>

            {/* Key Highlights */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold gradient-text mb-4">Key Highlights</h3>
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="glass p-4 rounded-xl flex items-center gap-3 hover-glow"
                >
                  <FaCheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                </motion.div>
              ))}
            </div>

            {/* Platform Presence */}
            <div className="glass p-8 rounded-2xl hover-glow">
              <h3 className="text-2xl font-bold mb-6 gradient-text">Find Me On</h3>
              <div className="grid grid-cols-3 gap-4">
                {platforms.map((platform, index) => {
                  const Icon = platform.icon;
                  return (
                    <motion.a
                      key={platform.name}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="glass-strong p-6 rounded-xl text-center hover-glow flex flex-col items-center gap-2"
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className={`w-10 h-10 ${platform.color}`} />
                      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {platform.name}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {/* {platform.followers} */}
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

