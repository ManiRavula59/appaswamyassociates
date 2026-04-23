import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Zap, Globe, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Careers.module.css';
import Footer from '../components/Footer';

const Careers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openPositions = [
    { title: 'Senior Embedded Engineer', dept: 'R&D - Diagnostics', location: 'Chennai, India' },
    { title: 'Clinical Applications Specialist', dept: 'Sales & Support', location: 'Global' },
    { title: 'Biomedical Technician', dept: 'Manufacturing', location: 'Baddi, India' },
    { title: 'International Sales Manager', dept: 'Business Development', location: 'Europe' }
  ];

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className="container">
          <Link to="/" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className={styles.badge}>Join Our Team</div>
            <h1 className="serif">Innovate with Us</h1>
            <p className={styles.description}>
              At Appasamy Associates, you aren't just building equipment. You are empowering surgeons, restoring vision, and changing lives globally.
            </p>
          </motion.div>
        </div>
      </header>

      <main className={styles.mainContent}>
        <section className={`container ${styles.cultureSection}`}>
          <div className={styles.cultureHeader}>
            <h2 className="serif">Life at Appasamy</h2>
            <p>For over 45 years, our greatest asset has been our people. We foster an environment of continuous learning, relentless innovation, and deep clinical empathy.</p>
          </div>

          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <Zap size={32} className={styles.valueIcon} />
              <h3>Innovation First</h3>
              <p>We invest 20% of our sales turnover into R&D. If you love pushing the boundaries of what's possible, you belong here.</p>
            </div>
            <div className={styles.valueCard}>
              <Globe size={32} className={styles.valueIcon} />
              <h3>Global Impact</h3>
              <p>Our instruments are used in operating rooms around the world. Your work will directly improve patient outcomes on a massive scale.</p>
            </div>
            <div className={styles.valueCard}>
              <Heart size={32} className={styles.valueIcon} />
              <h3>Patient-Centric</h3>
              <p>Everything we design, from the smallest diamond knife to complex robotic Phaco systems, is built with the patient's safety in mind.</p>
            </div>
            <div className={styles.valueCard}>
              <Users size={32} className={styles.valueIcon} />
              <h3>Collaborative Excellence</h3>
              <p>Work alongside industry-leading engineers, medical professionals, and visionaries in a highly supportive environment.</p>
            </div>
          </div>
        </section>

        <section className={styles.openingsSection}>
          <div className={`container ${styles.openingsContainer}`}>
            <div className={styles.openingsHeader}>
              <h2 className="serif">Open Positions</h2>
              <p>Don't see a perfect fit? Send your resume to careers@appasamy.com</p>
            </div>

            <div className={styles.jobList}>
              {openPositions.map((job, idx) => (
                <motion.div 
                  key={idx} 
                  className={styles.jobCard}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className={styles.jobInfo}>
                    <h3>{job.title}</h3>
                    <div className={styles.jobMeta}>
                      <span className={styles.deptBadge}>{job.dept}</span>
                      <span className={styles.location}>{job.location}</span>
                    </div>
                  </div>
                  <button className="btn btn-outline" onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}>
                    Apply Now <ArrowRight size={16} style={{marginLeft: '8px'}} />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
