import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaStar, FaYoutube, FaFacebook, FaInstagram, FaTwitter, FaGlobe } from 'react-icons/fa';
import { testimonials } from '../data/testimonials';


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
  twitter: 'text-blue-400',
  other: 'text-gray-500',
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={`w-5 h-5 ${index < rating
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300 dark:text-gray-600'
            }`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentTestimonial = testimonials[currentIndex];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section
      id="testimonials"
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
            Client Reviews
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">What Brands Say</span>{' '}
            <span className="text-gray-900 dark:text-white">About Me</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real feedback from brands and clients I've worked with
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Main Testimonial Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="glass-strong p-8 md:p-12 rounded-3xl hover-glow relative overflow-hidden"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-6xl text-purple-500/20 dark:text-purple-400/20 font-bold">
                "
              </div>

              <div className="relative z-10">
                {/* Rating */}
                <div className="mb-6">
                  <StarRating rating={currentTestimonial.rating} />
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 italic">
                  "{currentTestimonial.text}"
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center gap-6 flex-wrap">
                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-purple-500/30"
                    />
                    {currentTestimonial.platform && (
                      <div
                        className={`absolute -bottom-1 -right-1 glass p-2 rounded-full ${platformColors[currentTestimonial.platform]
                          }`}
                      >
                        {(() => {
                          const PlatformIcon = platformIcons[currentTestimonial.platform];
                          return PlatformIcon ? <PlatformIcon className="w-4 h-4" /> : null;
                        })()}
                      </div>
                    )}
                  </div>

                  {/* Client Details */}
                  <div className="flex-1">
                    <div className="font-bold text-xl text-gray-900 dark:text-white mb-1">
                      {currentTestimonial.name}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 mb-2">
                      {currentTestimonial.role} at {currentTestimonial.company}
                    </div>
                    {currentTestimonial.platform && (
                      <div className="text-sm text-gray-500 dark:text-gray-500 capitalize">
                        Platform: {currentTestimonial.platform}
                      </div>
                    )}
                  </div>

                  {/* Company Logo */}
                  {currentTestimonial.logo && (
                    <div className="glass p-4 rounded-xl">
                      <img
                        src={currentTestimonial.logo}
                        alt={currentTestimonial.company}
                        className="w-20 h-20 object-contain"
                      />
                    </div>
                  )}
                </div>

                {/* Date */}
                <div className="mt-6 text-sm text-gray-500 dark:text-gray-500">
                  {new Date(currentTestimonial.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 glass p-4 rounded-full hover-glow z-20"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 glass p-4 rounded-full hover-glow z-20"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                  ? 'bg-gradient-primary w-8'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="glass p-8 rounded-2xl inline-block max-w-4xl">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              These testimonials represent real partnerships and successful collaborations.
              I'm committed to delivering exceptional results that exceed expectations.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

