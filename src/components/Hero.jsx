import React from 'react';
import styles from './Hero.module.css';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const { scrollY } = useScroll();
  
  // Parallax effects
  const imageY = useTransform(scrollY, [0, 1000], [0, 200]);
  const textY = useTransform(scrollY, [0, 1000], [0, 100]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  // Initial animation variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const childVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1] // Apple-like ease-out
      }
    }
  };

  return (
    <section className={styles.heroSection}>
      <motion.div 
        className={`container ${styles.heroContainer}`}
        style={{ opacity }}
      >
        <motion.div 
          className={styles.textContent}
          variants={containerVars}
          initial="hidden"
          animate="visible"
          style={{ y: textY }}
        >
          <motion.div variants={childVars} className={styles.preHeadline}>
            <img src="https://cdn.prod.website-files.com/637e4dc883878debd9d96de4/63df53786bf1b137a5731bb2_AA%20Logo(1).png" alt="Appasamy Associates Logo" />
          </motion.div>
          <motion.div variants={childVars} className={styles.badge}>
            Innovation Since 1978
          </motion.div>
          <motion.h1 variants={childVars} className={`serif ${styles.headline}`}>
            Precision in every procedure. <br />
            <span className={styles.highlight}>Vision for life.</span>
          </motion.h1>
          <motion.p variants={childVars} className={styles.subhead}>
            State-of-the-art ophthalmic equipment empowering surgeons and 
            transforming patient care worldwide, engineered with uncompromised quality.
          </motion.p>
          
          <motion.div variants={childVars} className={styles.ctaGroup}>
            <button className="btn btn-primary">Explore Products</button>
            <button className="btn btn-ghost">Talk to an Expert</button>
          </motion.div>
        </motion.div>

        {/* Minimalist Medical Tech Visualization background image context */}
        <motion.div 
          className={styles.visualContext}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.4 }}
          style={{ y: imageY }}
        >
          <div className={styles.imagePlaceholder}>
            <div className={styles.glassOverlay}></div>
          </div>
        </motion.div>

      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span>Scroll to explore</span>
        <div className={styles.scrollLine}>
          <motion.div 
            className={styles.scrollDot}
            animate={{ 
              y: [0, 20, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>

    </section>
  );
};

export default Hero;
