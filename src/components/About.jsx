import React, { useRef } from 'react';
import styles from './About.module.css';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const About = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className={`section ${styles.aboutSection}`} id="about" ref={containerRef}>
      <div className={`container ${styles.container}`}>
        
        <motion.div 
          className={styles.textContent}
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className={styles.label}>Our Story</div>
          <h2 className="serif">Leading Vision Care Innovation Since 1978</h2>
          
          <div className={styles.story}>
            <p>
              Established in 1978, Appasamy Associates pioneers ophthalmic innovation, driven by a commitment to providing ophthalmic surgeons and vision care professionals with the highest quality, most advanced, and affordable solutions.
            </p>
            <p>
              Our state-of-the-art manufacturing facilities and significant investment in R&D enable us to deliver innovative products that meet the precise, evolving needs of the global clinical industry.
            </p>
            
            <ul className={styles.list}>
              <li>World-class manufacturing facilities across India</li>
              <li>20% of sales turnover invested in robust R&D</li>
              <li>Global standards in affordable, premium solutions</li>
            </ul>
          </div>
          
          <button className={`btn btn-ghost ${styles.cta}`}>Learn More About Us</button>
        </motion.div>

        <motion.div 
          className={styles.imageContent}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
        >
          <div className={styles.imagePlaceholder}>
            {/* Minimal architectural or lab photography placeholder */}
            <div className={styles.glassBadge}>Global Reach</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
