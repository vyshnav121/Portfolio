import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';
import { FaYoutube, FaFacebook, FaInstagram } from 'react-icons/fa';
import { stats } from '../data/stats';
import profileImage from '../assets/Ansal.jpg';

const heroStats = stats.slice(0, 3);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Hero() {
  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-primary opacity-10 dark:opacity-20" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 dark:from-purple-600/30 dark:via-pink-600/30 dark:to-blue-600/30"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div variants={itemVariants} className="text-center lg:text-left">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              className="inline-block mb-6"
            >
              <span className="glass px-4 py-2 rounded-full text-sm font-medium text-purple-600 dark:text-purple-400">
                Content Creator & Video Producer
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="gradient-text">Creating</span>{' '}
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Engaging
              </motion.span>
              <br />
              Content That{' '}
              <span className="gradient-text">Inspires</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl"
            >
              Welcome to my creative world! I produce high-quality video content
              across YouTube, Facebook, and Instagram. Let's bring your story to life.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <motion.button
                onClick={() => scrollToSection('portfolio')}
                className="glass-strong px-8 py-4 rounded-full font-semibold text-lg bg-gradient-primary text-white hover:scale-105 transition-transform flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Portfolio
                <FaArrowDown className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="glass px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Collaborate With Me
                <FaArrowDown className="w-4 h-4" />
              </motion.button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 max-w-xl"
            >
              {heroStats.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="glass text-center p-4 rounded-xl hover-glow"
                >
                  <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">
                    {stat.suffix?.includes('M')
                      ? `${Math.floor(stat.value / 1000000)}${stat.suffix}`
                      : stat.suffix?.includes('K')
                      ? `${Math.floor(stat.value / 1000)}${stat.suffix}`
                      : stat.value >= 1000000
                      ? `${Math.floor(stat.value / 1000000)}M`
                      : stat.value >= 1000
                      ? `${Math.floor(stat.value / 1000)}K`
                      : `${stat.value}${stat.suffix || ''}`}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Image/Video */}
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center lg:justify-end"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
              className="relative"
            >
              {/* Glassmorphism Border */}
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-2xl opacity-30" />
              
              {/* Profile Image Container */}
              <div className="relative glass-strong rounded-3xl p-2 hover-glow">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="rounded-3xl w-full max-w-md h-auto object-cover"
                />
              </div>

              {/* Floating Platform Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -bottom-6 -left-6 glass p-4 rounded-full hover-glow"
              >
                <FaYoutube className="w-8 h-8 text-red-500" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="absolute -top-6 -right-6 glass p-4 rounded-full hover-glow"
              >
                <FaFacebook className="w-8 h-8 text-blue-600" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="absolute top-1/2 -right-12 glass p-4 rounded-full hover-glow"
              >
                <FaInstagram className="w-8 h-8 text-pink-500" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            aria-label="Scroll down"
          >
            <span className="text-sm font-medium">Scroll Down</span>
            <FaArrowDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

