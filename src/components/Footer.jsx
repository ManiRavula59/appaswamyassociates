import React from 'react';
import styles from './Footer.module.css';
import { ArrowRight, Mail, Globe, Share2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        
        <div className={styles.brandCol}>
          <div className={styles.logo}>
            <img src="https://cdn.prod.website-files.com/637e4dc883878debd9d96de4/63df53786bf1b137a5731bb2_AA%20Logo(1).png" alt="Appasamy Associates" style={{ height: '48px', width: 'auto', filter: 'brightness(0) invert(1)', display: 'block' }} />
          </div>
          <p className={styles.tagline}>Empowering vision through innovation since 1978. Precision ophthalmic equipment.</p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialIcon}><Share2 size={20} /></a>
            <a href="#" className={styles.socialIcon}><Globe size={20} /></a>
            <a href="#" className={styles.socialIcon}><Mail size={20} /></a>
          </div>
        </div>

        <div className={styles.linksCol}>
          <h4>Products</h4>
          <ul>
            <li><a href="#">Surgical & IOL</a></li>
            <li><a href="#">Laser Systems</a></li>
            <li><a href="#">Diagnostic</a></li>
            <li><a href="#">Pharmaceuticals</a></li>
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h4>Company</h4>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#">Leadership</a></li>
            <li><button onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))} style={{background: 'none', border: 'none', color: 'inherit', padding: 0, font: 'inherit', cursor: 'pointer', textAlign: 'left'}}>Careers</button></li>
            <li><a href="#">Global Reach</a></li>
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h4>Contact & Support</h4>
          <ul className={styles.contactList}>
            <li>
              <button onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))} style={{background: 'none', border: 'none', color: 'inherit', padding: 0, font: 'inherit', cursor: 'pointer', textDecoration: 'underline'}}>
                Chat with our AI Assistant
              </button>
            </li>
            <li><br/>KARUNA CONQUEST IT PARK<br/>Ambattur, Chennai - 600058</li>
          </ul>
        </div>

      </div>
      
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomContainer}`}>
          <p>&copy; {new Date().getFullYear()} Appasamy Associates Private Limited. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
