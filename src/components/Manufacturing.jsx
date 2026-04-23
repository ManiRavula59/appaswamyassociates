import React, { useRef } from 'react';
import styles from './Manufacturing.module.css';
import { motion, useInView } from 'framer-motion';

const Manufacturing = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
  };

  return (
    <section className={`section section-dark ${styles.manufacturingSection}`} ref={containerRef}>
      <div className={`container ${styles.container}`}>
        
        <motion.div 
          className={styles.imageContent}
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className={styles.imagePlaceholder}>
            <div className={styles.gradientOverlay}></div>
          </div>
        </motion.div>

        <motion.div 
          className={styles.textContent}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
        >
          <motion.h2 variants={textVariants} className="serif">
            World-Class Standards,<br />Every Step
          </motion.h2>
          
          <motion.div variants={textVariants} className={styles.facilities}>
            <strong>State-of-the-art facilities:</strong><br />
            <span>Chennai • Pondicherry • Kolkata • Baddi</span>
          </motion.div>
          
          <motion.p variants={textVariants} className={styles.description}>
            We adhere to the strictest quality control standards globally to ensure the absolute safety and efficacy of our products. From cleanroom assembly to final inspection, our precision is unmatched.
          </motion.p>
          
          <motion.div variants={textVariants} className={styles.certifications}>
            <div className={styles.certBadge}>EN ISO 13485</div>
            <div className={styles.certBadge}>ICMED 13485</div>
            <div className={styles.certBadge}>CE Approved</div>
            <div className={styles.certBadge}>FDA Registered</div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Manufacturing;
