import React from 'react';
import styles from './CallToAction.module.css';

const CallToAction = () => {
  return (
    <section className={`section ${styles.ctaSection}`}>
      <div className={`container ${styles.container}`}>
        
        <div className={styles.ctaBox}>
          <div className={styles.backgroundBlur}></div>
          <div className={styles.content}>
            <h2 className="serif">Ready to Transform Vision Care?</h2>
            <p>
              Partner with the pioneers of ophthalmic innovation. Discover how our premium, affordable solutions can elevate your clinical practice.
            </p>
            <div className={styles.btnGroup}>
              <button className="btn btn-primary" style={{backgroundColor: '#fff', color: '#1a1a1a'}}>
                Get Started
              </button>
              <button className="btn btn-ghost" style={{borderColor: 'rgba(255,255,255,0.4)', color: '#fff'}}>
                Explore Products
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CallToAction;
