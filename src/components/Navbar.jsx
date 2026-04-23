import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Products', href: '#products' },
    { name: 'About', href: '#about' },
    { name: 'Support', href: '#support' },
    { name: 'Careers', href: '#careers' },
  ];

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.navContainer}`}>
          
          {/* Logo */}
          <div className={styles.logo}>
            <a href="#">
              <img src="https://cdn.prod.website-files.com/637e4dc883878debd9d96de4/63df53786bf1b137a5731bb2_AA%20Logo(1).png" alt="Appasamy Associates" style={{ height: '40px', width: 'auto', display: 'block' }} />
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav}>
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className={styles.navLink}>
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            <button className={`btn btn-primary ${styles.ctaButton}`}>
              Get in Touch
            </button>
            <button 
              className={styles.mobileToggle}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className={styles.mobileMenuHeader}>
              <div className={styles.logo}>
                <img src="https://cdn.prod.website-files.com/637e4dc883878debd9d96de4/63df53786bf1b137a5731bb2_AA%20Logo(1).png" alt="Appasamy Associates" style={{ height: '32px', width: 'auto', display: 'block' }} />
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className={styles.closeBtn}
              >
                <X size={24} />
              </button>
            </div>
            
            <div className={styles.mobileNavLinks}>
              {navLinks.map((link, i) => (
                <motion.a 
                  key={link.name} 
                  href={link.href}
                  className={styles.mobileNavLink}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name} <ArrowRight size={16} />
                </motion.a>
              ))}
              
              <motion.button 
                className={`btn btn-primary ${styles.mobileCta}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Get in Touch
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
