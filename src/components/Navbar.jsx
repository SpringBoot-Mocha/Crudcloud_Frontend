import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import logo from '../assets/logo.svg';

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Características', href: '#features' },
    { label: 'Precios', href: '#pricing' },
    { label: 'Testimonios', href: '#testimonials' },
    { label: 'Sobre Nosotros', href: '#about' },
  ];

  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link to="/" className="flex items-center gap-4">
              <img
                src={logo}
                alt="CrudCloud"
                className="h-14 w-auto lg:h-16 transition-all duration-300 hover:drop-shadow-lg"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <button
                  onClick={() => scrollToSection(item.href)}
                  className={`text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 relative group`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-500 to-brand-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  to="/dashboard"
                  className="bg-gradient-to-r from-brand-600 to-brand-700 text-white px-6 py-2.5 rounded-xl font-medium hover:from-brand-700 hover:to-brand-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Dashboard
                </Link>
              </motion.div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    to="/login"
                    className="px-6 py-2.5 rounded-xl font-medium border border-brand-600/50 text-brand-600 hover:border-brand-600 hover:bg-brand-600/5 transition-all duration-300"
                  >
                    Inicia Sesión
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-brand-600 to-brand-700 text-white px-6 py-2.5 rounded-xl font-medium hover:from-brand-700 hover:to-brand-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Regístrate
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className={`text-gray-700 hover:bg-gray-100 lg:hidden p-2 rounded-lg transition-colors duration-200`}
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/50 shadow-xl"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="px-4 py-6 space-y-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="block text-lg font-medium text-gray-700 hover:text-gray-900 py-2 transition-colors duration-200 w-full text-left"
                    >
                      {item.label}
                    </button>
                  </motion.div>
                ))}

                <div className="pt-4 border-t border-gray-200/50 space-y-4">
                  {isAuthenticated ? (
                    <motion.div
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      transition={{ delay: navItems.length * 0.1 }}
                    >
                      <Link
                        to="/dashboard"
                        className="block w-full bg-gradient-to-r from-brand-600 to-brand-700 text-white text-center py-3 rounded-xl font-medium hover:from-brand-700 hover:to-brand-800 transition-all duration-300"
                        onClick={() => setIsOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </motion.div>
                  ) : (
                    <>
                      <motion.div
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        transition={{ delay: navItems.length * 0.1 }}
                      >
                        <Link
                          to="/login"
                          className="block w-full text-center py-3 rounded-xl font-medium border border-brand-600/50 text-brand-600 hover:border-brand-600 hover:bg-brand-600/5 transition-all duration-300"
                          onClick={() => setIsOpen(false)}
                        >
                          Inicia Sesión
                        </Link>
                      </motion.div>
                      <motion.div
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        transition={{ delay: (navItems.length + 1) * 0.1 }}
                      >
                        <Link
                          to="/register"
                          className="block w-full bg-gradient-to-r from-brand-600 to-brand-700 text-white text-center py-3 rounded-xl font-medium hover:from-brand-700 hover:to-brand-800 transition-all duration-300"
                          onClick={() => setIsOpen(false)}
                        >
                          Regístrate
                        </Link>
                      </motion.div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;