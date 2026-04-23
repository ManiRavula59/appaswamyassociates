import React, { useRef } from 'react';
import styles from './Categories.module.css';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Eye, Droplets, Zap, Activity, Microscope, Beaker, Briefcase } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 1, title: 'Micro Surgical', icon: <Eye size={32} />, desc: 'Precision instruments for delicate procedures', slug: 'microsurgical' },
  { id: 2, title: 'Surgical & IOL', icon: <Microscope size={32} />, desc: 'Advanced intraocular lenses and systems', slug: 'surgical-iol' },
  { id: 3, title: 'Laser & Therapeutic', icon: <Zap size={32} />, desc: 'State-of-the-art laser treatments', slug: 'laser-therapeutic' },
  { id: 4, title: 'Ophthalmology', icon: <Activity size={32} />, desc: 'Comprehensive diagnostic solutions', slug: 'ophthalmology' },
  { id: 5, title: 'Ultrasound Scanners', icon: <Activity size={32} />, desc: 'High-resolution ocular imaging', slug: 'ultrasound' },
  { id: 6, title: 'Pharmaceuticals', icon: <Droplets size={32} />, desc: 'Specialized ophthalmic medications', slug: 'pharmaceuticals' },
  { id: 7, title: 'Industry Partners', icon: <Briefcase size={32} />, desc: 'Global collaborations for better vision', slug: 'industry-partners' }
];

const Categories = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const isInView = useInView(containerRef, { once: true, margin: "-100px 0px" });

  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] }
    }
  };

  return (
    <section className={`section ${styles.categorySection}`} id="products" ref={containerRef}>
      <div className="container">
        
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="serif">Ophthalmic Excellence</h2>
          <p>Explore our comprehensive portfolio developed for world-class vision care.</p>
        </motion.div>

        <motion.div 
          className={styles.grid}
          variants={containerVars}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVars} className={styles.card}>
              <div className={styles.iconWrapper}>
                {category.icon}
              </div>
              <h3>{category.title}</h3>
              <p>{category.desc}</p>
              
              <div 
                className={styles.linkWrapper}
                onClick={() => navigate(`/category/${category.slug}`)}
                style={{cursor: 'pointer'}}
              >
                <span className={styles.linkText}>Explore</span>
                <ArrowRight size={18} className={styles.linkIcon} />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Categories;
