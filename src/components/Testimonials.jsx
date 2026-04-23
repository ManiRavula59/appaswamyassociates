import React, { useState, useEffect } from 'react';
import styles from './Testimonials.module.css';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    quote: "Appasamy's Galaxy Pro Orbit has fundamentally transformed the precision of our delicate phaco protocols. The fluidics stability is unmatched.",
    name: "Dr. Arvind Rao",
    title: "Chief Surgeon, Vision Institute",
    location: "Mumbai"
  },
  {
    id: 2,
    quote: "The optical clarity on the Brilliant Series microscopes allows for nuanced precision that wasn't possible before. It is true world-class engineering.",
    name: "Dr. Elena Vasari",
    title: "Retina Specialist",
    location: "London Health Science"
  },
  {
    id: 3,
    quote: "With their robust R&D, Appasamy consistently delivers premium equipment that is remarkably accessible. A true partner in global healthcare.",
    name: "Prof. S. K. Nair",
    title: "Director of Ophthalmology",
    location: "Apex Eye Care"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={`section ${styles.testimonialSection}`}>
      <div className={`container ${styles.container}`}>
        
        <div className={styles.header}>
          <h2 className="serif">Voices from the Field</h2>
        </div>

        <div className={styles.carouselWrap}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className={styles.testimonialCore}
            >
              <div className={styles.quoteMark}>"</div>
              <p className={styles.quoteText}>{testimonials[currentIndex].quote}</p>
              
              <div className={styles.authorArea}>
                <div className={styles.avatar}></div>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>{testimonials[currentIndex].name}</div>
                  <div className={styles.authorTitle}>
                    {testimonials[currentIndex].title}, {testimonials[currentIndex].location}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className={styles.pagination}>
            {testimonials.map((_, i) => (
              <button 
                key={i} 
                className={`${styles.dot} ${i === currentIndex ? styles.activeDot : ''}`}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
