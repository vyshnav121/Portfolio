import { useState, useRef, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { motion, useInView } from 'framer-motion';
import { FaEnvelope, FaPhone, FaYoutube, FaFacebook, FaInstagram, FaLinkedin, FaPaperPlane, FaSnapchat } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';
import type { ContactFormData } from '../types';

const collaborationTypes = [
  'Brand Partnership',
  'Sponsored Content',
  'Product Review',
];

const timelines = [
  'Within 1 week',
  '1-2 weeks',
  '2-4 weeks',
  '1-2 months',
  'Flexible',
];

const socialLinks = [
  { name: 'YouTube', icon: FaYoutube, color: 'text-red-500', },
  { name: 'Facebook', icon: FaFacebook, color: 'text-blue-600', },
  { name: 'Instagram', icon: FaInstagram, color: 'text-pink-500', },
  { name: 'Threads', icon: FaThreads, color: 'text-black dark:text-white', },
  { name: 'LinkedIn', icon: FaLinkedin, color: 'text-blue-600' },
  { name: 'Snapchat', icon: FaSnapchat, color: 'text-yellow-300' }
];

export default function Contact() {
  const ref = useRef(null);
  const form = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    title: '',
    time: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);


    const SERVICE_ID = 'service_gdtnqtf';
    const TEMPLATE_ID = 'template_qqoqkyl';
    const PUBLIC_KEY = 'X75DE91Yt_r7kOFVZ';

    if (form.current) {
      emailjs
        .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
          publicKey: PUBLIC_KEY,
        })
        .then(
          () => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({
              name: '',
              email: '',
              title: '',
              time: '',
              message: '',
            });

            // Reset submission status after 3 seconds
            setTimeout(() => {
              setIsSubmitted(false);
            }, 5000);
          },
          (error) => {
            console.error('FAILED...', error.text);
            alert('Failed to send message. Please try again later.');
            setIsSubmitting(false);
          },
        );
    }
  };

  return (
    <section
      id="contact"
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
            Let's Collaborate
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">Get In Touch</span>{' '}
            <span className="text-gray-900 dark:text-white">Today</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ready to create amazing content together? Let's discuss your project
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="glass-strong p-8 md:p-12 rounded-3xl hover-glow"
          >
            <h3 className="text-2xl font-bold mb-6 gradient-text">Collaboration Enquiry</h3>

            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaPaperPlane className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Message Sent!
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  I'll get back to you as soon as possible.
                </p>
              </motion.div>
            ) : (
              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full glass px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full glass px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Collaboration Type (mapped to title in email) */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Collaboration Type *
                  </label>
                  <select
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full glass px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                  >
                    <option value="">Select collaboration type</option>
                    {collaborationTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Timeline (mapped to time in email) */}
                <div>
                  <label htmlFor="time" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Timeline *
                  </label>
                  <select
                    id="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full glass px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                  >
                    <option value="">Select timeline</option>
                    {timelines.map((timeline) => (
                      <option key={timeline} value={timeline}>
                        {timeline}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full glass px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full glass-strong px-8 py-4 rounded-full font-semibold text-lg bg-gradient-primary text-white hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FaPaperPlane className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="glass-strong p-8 rounded-3xl hover-glow">
              <h3 className="text-2xl font-bold mb-6 gradient-text">Contact Information</h3>

              <div className="space-y-6">
                {/* Email */}
                <motion.a
                  href="mailto:ansil04@gmail.com"
                  className="flex items-center gap-4 glass p-4 rounded-xl hover-glow group"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="w-12 h-12 glass-strong rounded-xl flex items-center justify-center text-purple-500 dark:text-purple-400">
                    <FaEnvelope className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Email</div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      ansil04@gmail.com
                    </div>
                  </div>
                </motion.a>

                {/* Phone */}
                <motion.a
                  href="tel:+919995696636"
                  className="flex items-center gap-4 glass p-4 rounded-xl hover-glow group"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="w-12 h-12 glass-strong rounded-xl flex items-center justify-center text-purple-500 dark:text-purple-400">
                    <FaPhone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Phone</div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      +91 99956 96636
                    </div>
                  </div>
                </motion.a>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-strong p-8 rounded-3xl hover-glow">
              <h3 className="text-2xl font-bold mb-6 gradient-text">Follow Me</h3>

              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}

                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass p-4 rounded-xl hover-glow group text-center"
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className={`w-8 h-8 ${social.color} mx-auto mb-2`} />
                      <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                        {social.name}
                      </div>

                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Quick Response */}
            <div className="glass p-6 rounded-2xl">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center">
                I typically respond within 24-48 hours. For urgent inquiries, please mention it in your message.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

