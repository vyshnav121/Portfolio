import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { stats } from '../data/stats';
import * as FaIcons from 'react-icons/fa';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaFacebook: FaIcons.FaFacebook,
  FaInstagram: FaIcons.FaInstagram,
  FaEye: FaIcons.FaEye,
  FaHandshake: FaIcons.FaHandshake,
};

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ value, prefix = '', suffix = '', duration = 2 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = (currentTime - startTimeRef.current) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(value * easeOutQuart);

      if (currentValue !== countRef.current) {
        countRef.current = currentValue;
        setCount(currentValue);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  const formatValue = (num: number) => {
    if (suffix === 'K+' || suffix === 'K') {
      const value = num / 1000;
      return Math.floor(value) + (suffix === 'K+' ? 'K+' : 'K');
    } else if (suffix === 'M+' || suffix === 'M') {
      const value = num / 1000000;
      return Math.floor(value) + (suffix === 'M+' ? 'M+' : 'M');
    } else if (suffix === '%') {
      return num.toFixed(1) + suffix;
    } else if (suffix === '+') {
      return num + suffix;
    }
    return num.toString();
  };

  return (
    <span>
      {prefix}
      {formatValue(count)}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
      id="stats"
      ref={ref}
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-600/10 dark:via-purple-600/10 dark:to-pink-600/10" />

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
            Analytics & Performance
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">Impressive Numbers</span>{' '}
            <span className="text-gray-900 dark:text-white">That Speak</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real metrics that demonstrate engagement, reach, and impact across all platforms
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon] || FaIcons.FaChartBar;
            
            // Determine icon color based on platform
            let iconColor = 'text-purple-500';
            if (stat.platform === 'youtube') iconColor = 'text-red-500';
            else if (stat.platform === 'facebook') iconColor = 'text-blue-600';
            else if (stat.platform === 'instagram') iconColor = 'text-pink-500';
            
            return (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                className="glass-strong p-8 rounded-2xl hover-glow relative overflow-hidden group"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                
                {/* Icon */}
                <div className="relative z-10 mb-4">
                  <div className={`${iconColor} w-12 h-12 flex items-center justify-center glass rounded-xl mb-4`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>

                {/* Value */}
                <div className="relative z-10 mb-2">
                  <div className="text-3xl md:text-4xl font-bold gradient-text">
                    {isInView ? (
                      <AnimatedCounter
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                      />
                    ) : (
                      '0'
                    )}
                  </div>
                </div>

                {/* Label */}
                <div className="relative z-10 text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>

                {/* Trend Indicator */}
                {stat.trend && (
                  <div className="relative z-10 mt-4 flex items-center gap-2">
                    {stat.trend === 'up' && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center gap-1 text-green-500 text-sm font-medium"
                      >
                        <FaIcons.FaArrowUp className="w-3 h-3" />
                        <span>Growing</span>
                      </motion.div>
                    )}
                    {stat.trend === 'stable' && (
                      <div className="flex items-center gap-1 text-blue-500 text-sm font-medium">
                        <FaIcons.FaMinus className="w-3 h-3" />
                        <span>Stable</span>
                      </div>
                    )}
                  </div>
                )}
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
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              These numbers represent real engagement, authentic connections, and measurable impact.
              Every metric reflects genuine audience interaction and content quality that drives
              meaningful results for brand partnerships.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

