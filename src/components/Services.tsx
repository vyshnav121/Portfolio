import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { services } from '../data/services';
import * as FaIcons from 'react-icons/fa';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaHandshake: FaIcons.FaHandshake,
  FaVideo: FaIcons.FaVideo,
  FaStar: FaIcons.FaStar,
};

const availabilityColors = {
  available: 'text-green-500',
  limited: 'text-yellow-500',
  booked: 'text-red-500',
};

const availabilityLabels = {
  available: 'Available',
  limited: 'Limited Spots',
  booked: 'Booked',
};

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

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

  return (
    <section
      id="services"
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
            What I Offer
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">Collaboration Services</span>{' '}
            <span className="text-gray-900 dark:text-white">For Brands</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Premium content creation services tailored to your brand's needs and goals
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => {
            const IconComponent = iconMap[service.icon] || FaIcons.FaStar;
            
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="glass-strong p-8 rounded-2xl hover-glow relative overflow-hidden group"
                whileHover={{ scale: 1.05, y: -10 }}
              >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                
                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className="w-16 h-16 flex items-center justify-center glass rounded-xl mb-4 text-purple-500 dark:text-purple-400">
                    <IconComponent className="w-8 h-8" />
                  </div>
                </div>

                {/* Availability Badge */}
                <div className="relative z-10 mb-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full glass ${availabilityColors[service.availability]}`}>
                    {availabilityLabels[service.availability]}
                  </span>
                </div>

                {/* Title */}
                <h3 className="relative z-10 text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Price */}
                {service.price && (
                  <div className="relative z-10 mb-6">
                    <div className="text-3xl font-bold gradient-text">
                      {service.price}
                    </div>
                  </div>
                )}

                {/* Features */}
                <div className="relative z-10 space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <FaIcons.FaCheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  className="relative z-10 w-full glass-strong px-6 py-3 rounded-full font-semibold hover-glow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Get Started
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="glass p-8 rounded-2xl inline-block max-w-4xl">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              All services are customized to meet your brand's specific needs and goals.
              Let's discuss how we can work together to create amazing content that resonates with your audience.
            </p>
            <motion.button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="glass-strong px-8 py-4 rounded-full font-semibold text-lg bg-gradient-primary text-white hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start a Collaboration
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

