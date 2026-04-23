import React, { useRef } from 'react';
import styles from './Features.module.css';
import { motion, useInView } from 'framer-motion';
import { Layers, Lightbulb, ShieldCheck, Award } from 'lucide-react';

const features = [
  {
    id: 1,
    title: 'Comprehensive Product Range',
    icon: <Layers strokeWidth={1.5} size={36} />,
    desc: 'From diagnostic equipment to precision surgical systems and pharmaceuticals, all from a single trusted source.'
  },
  {
    id: 2,
    title: 'Unwavering R&D Innovation',
    icon: <Lightbulb strokeWidth={1.5} size={36} />,
    desc: 'Investing over 20% of sales turnover into research and development to engineer cutting-edge healthcare technologies.'
  },
  {
    id: 3,
    title: 'Global Quality Standards',
    icon: <ShieldCheck strokeWidth={1.5} size={36} />,
    desc: 'Strict adherence to EN ISO 13485, CE approvals, and FDA registrations to ensure ultimate product safety.'
  },
  {
    id: 4,
    title: 'Affordable Premium Solutions',
    icon: <Award strokeWidth={1.5} size={36} />,
    desc: 'Making advanced ophthalmic technology accessible to a wider range of patients and professionals worldwide.'
  }
];

const Features = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] }
    }
  };

  return (
    <section className={`section ${styles.featuresSection}`} id="features" ref={containerRef}>
      <div className="container">
        
        <motion.div 
          className={styles.grid}
          variants={containerVars}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature) => (
            <motion.div key={feature.id} variants={itemVars} className={styles.featureCard}>
              <div className={styles.iconContainer}>
                {feature.icon}
              </div>
              <h4>{feature.title}</h4>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Features;
