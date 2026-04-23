import React, { useRef, useState, useEffect } from 'react';
import styles from './Showcase.module.css';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const products = [
  { id: 1, name: 'Galaxy Series', desc: 'Phaco & Vitrectomy Machines', img: 'bg-1' },
  { id: 2, name: 'Brilliant Series', desc: 'Operating Microscopes', img: 'bg-2' },
  { id: 3, name: 'Amogh & Jericho', desc: 'Laser Systems', img: 'bg-3' },
  { id: 4, name: 'Diagnostic Units', desc: 'Slit Lamps & OCT', img: 'bg-4' },
];

const Showcase = () => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scrollMap = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      // Timeout to allow scroll to finish before checking
      setTimeout(checkScroll, 400); 
    }
  };

  return (
    <section className={`section ${styles.showcaseSection}`}>
      <div className={`container ${styles.headerContainer}`}>
        <div>
          <h2 className="serif">Flagship Innovations</h2>
          <p className="text-muted">Explore our state-of-the-art precision equipment.</p>
        </div>
        <div className={styles.controls}>
          <button 
            className={`${styles.navBtn} ${!canScrollLeft ? styles.disabled : ''}`}
            onClick={() => scrollMap('left')}
            disabled={!canScrollLeft}
          >
            <ArrowLeft size={20} />
          </button>
          <button 
            className={`${styles.navBtn} ${!canScrollRight ? styles.disabled : ''}`}
            onClick={() => scrollMap('right')}
            disabled={!canScrollRight}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className={styles.carouselContainer}>
        <div 
          className={styles.carouselTrack} 
          ref={carouselRef}
          onScroll={checkScroll}
        >
          {products.map((p) => (
            <motion.div 
              key={p.id} 
              className={styles.productCard}
              whileHover="hover"
            >
              <div className={styles.imageBlock}>
                <motion.div 
                  className={styles.exploreOverlay}
                  variants={{
                    hover: { opacity: 1, scale: 1 }
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  Explore
                </motion.div>
              </div>
              <div className={styles.infoBlock}>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
