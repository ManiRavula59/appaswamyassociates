import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LifeBuoy, Wrench, FileText, Phone, Mail, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Support.module.css';
import Footer from '../components/Footer';

const Support = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className="container">
          <Link to="/" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className={styles.badge}>Customer Care</div>
            <h1 className="serif">World-Class Support</h1>
            <p className={styles.description}>
              We are dedicated to ensuring your Appasamy equipment operates at peak performance. Access resources, request service, or contact our 24/7 technical team.
            </p>
          </motion.div>
        </div>
      </header>

      <main className={`container ${styles.mainContent}`}>
        <div className={styles.supportGrid}>
          {/* Service & Repair */}
          <motion.div className={styles.supportCard} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className={styles.iconBox}><Wrench size={28} /></div>
            <h2>Service & Repair</h2>
            <p>Request maintenance or repair for your ophthalmic equipment. Our certified technicians use only genuine parts.</p>
            <button className="btn btn-outline" style={{marginTop: 'auto'}}>Request Service</button>
          </motion.div>

          {/* Product Manuals */}
          <motion.div className={styles.supportCard} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className={styles.iconBox}><FileText size={28} /></div>
            <h2>Documentation</h2>
            <p>Download user manuals, technical specifications, and safety guidelines for the Galaxy Series, Brilliant Microscopes, and more.</p>
            <button className="btn btn-outline" style={{marginTop: 'auto'}}>Browse Manuals</button>
          </motion.div>

          {/* Technical Support */}
          <motion.div className={styles.supportCard} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className={styles.iconBox}><LifeBuoy size={28} /></div>
            <h2>Technical Support</h2>
            <p>Encountering an issue? Get immediate assistance from our technical experts available around the clock.</p>
            <button className="btn btn-primary" style={{marginTop: 'auto'}} onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}>
              Chat with AI Assistant
            </button>
          </motion.div>
        </div>

        <div className={styles.contactSection}>
          <div className={styles.contactInfo}>
            <h2 className="serif">Get in Touch</h2>
            <p>Our corporate headquarters and global support center are ready to assist you.</p>
            
            <div className={styles.contactMethod}>
              <Phone size={20} className={styles.contactIcon} />
              <div>
                <strong>Global Helpline</strong>
                <p>+91-44-4004 3430</p>
              </div>
            </div>
            
            <div className={styles.contactMethod}>
              <Mail size={20} className={styles.contactIcon} />
              <div>
                <strong>Email Support</strong>
                <p>info@appasamy.com</p>
              </div>
            </div>
            
            <div className={styles.contactMethod}>
              <MessageSquare size={20} className={styles.contactIcon} />
              <div>
                <strong>Corporate Office</strong>
                <p>KARUNA CONQUEST IT PARK<br/>Ambattur, Chennai - 600058, India</p>
              </div>
            </div>
          </div>
          
          <div className={styles.faqSection}>
            <h2 className="serif">Frequently Asked Questions</h2>
            <div className={styles.faqItem}>
              <h4>How do I register my new Galaxy Pro Orbit?</h4>
              <p>You can register your new equipment by contacting our support team or using the warranty card included in your documentation packet.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>Are software updates included for diagnostic devices?</h4>
              <p>Yes, critical firmware and software updates are provided. Please consult your service agreement for details on major version upgrades.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>Do you offer international shipping for replacement parts?</h4>
              <p>Absolutely. Appasamy Associates has a robust global logistics network to ensure your practice experiences minimal downtime.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;
