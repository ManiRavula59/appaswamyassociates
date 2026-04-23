import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const navLinks = [
    { name: 'Products', to: '/#products' },
    { name: 'About', to: '/#about' },
    { name: 'Support', to: '/support' },
    { name: 'Careers', to: '/careers' },
  ];

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.navContainer}`}>
          
          <div className={styles.logo}>
            <Link to="/">
              <img src="https://cdn.prod.website-files.com/637e4dc883878debd9d96de4/63df53786bf1b137a5731bb2_AA%20Logo(1).png" alt="Appasamy Associates" style={{ height: '40px', width: 'auto', display: 'block' }} />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav}>
            {navLinks.map((link) => (
              link.to.startsWith('/#') ? (
                <a key={link.name} href={link.to} className={styles.navLink}>
                  {link.name}
                </a>
              ) : (
                <Link key={link.name} to={link.to} className={styles.navLink}>
                  {link.name}
                </Link>
              )
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            <button className={`btn btn-primary ${styles.ctaButton}`} onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}>
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
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  <img src="https://cdn.prod.website-files.com/637e4dc883878debd9d96de4/63df53786bf1b137a5731bb2_AA%20Logo(1).png" alt="Appasamy Associates" style={{ height: '32px', width: 'auto', display: 'block' }} />
                </Link>
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
                link.to.startsWith('/#') ? (
                  <motion.a 
                    key={link.name} 
                    href={link.to}
                    className={styles.mobileNavLink}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name} <ArrowRight size={16} />
                  </motion.a>
                ) : (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                  >
                    <Link
                      to={link.to}
                      className={styles.mobileNavLink}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{display: 'flex', justifyContent: 'space-between'}}
                    >
                      {link.name} <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                )
              ))}
              
              <motion.button 
                className={`btn btn-primary ${styles.mobileCta}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent('open-chat'));
                }}
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
