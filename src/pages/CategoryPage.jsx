import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Package, Shield, Star, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { categoryData } from '../data/categories';
import styles from './CategoryPage.module.css';
import Footer from '../components/Footer';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const category = categoryData[categoryId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  if (!category) {
    return (
      <div className={styles.notFound}>
        <h2>Category Not Found</h2>
        <Link to="/" className="btn btn-primary">Return Home</Link>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* Header/Hero Section */}
      <header className={styles.header}>
        <div className="container">
          <Link to="/" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.badge}>Appasamy Product Line</div>
            <h1 className="serif">{category.title}</h1>
            <p className={styles.description}>{category.description}</p>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`container ${styles.mainContent}`}>
        <div className={styles.layout}>
          
          {/* Products Grid */}
          <div className={styles.productsArea}>
            <div className={styles.sectionTitle}>
              <h2>Explore Products</h2>
              <div className={styles.countBadge}>{category.products.length} Items</div>
            </div>
            
            <div className={styles.grid}>
              {category.products.map((product, idx) => (
                <motion.div 
                  key={idx} 
                  className={styles.productCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className={styles.productImage}>
                    <Package size={40} className={styles.placeholderIcon} />
                  </div>
                  <div className={styles.productInfo}>
                    <h3>{product.name}</h3>
                    <p>{product.desc}</p>
                    <button 
                      className={styles.inquireBtn}
                      onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
                    >
                      Inquire Details <ChevronRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <Shield size={24} className={styles.sidebarIcon} />
              <h3>Certified Quality</h3>
              <p>EN ISO 13485 certified, ICMED 13485, and CE approved manufacturing facilities ensuring global standards.</p>
            </div>
            
            <div className={styles.sidebarCard}>
              <Star size={24} className={styles.sidebarIcon} />
              <h3>Since 1978</h3>
              <p>Empowering vision through decades of relentless innovation and clinical excellence.</p>
            </div>

            <div className={styles.supportCard}>
              <h3>Need Expert Assistance?</h3>
              <p>Our specialists can help you find the exact configuration for your clinical needs.</p>
              <ul>
                <li><CheckCircle size={14}/> Technical Specifications</li>
                <li><CheckCircle size={14}/> Pricing & Quotes</li>
                <li><CheckCircle size={14}/> Live Demonstrations</li>
              </ul>
              <button 
                className="btn btn-primary" 
                style={{width: '100%', marginTop: '16px'}}
                onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
              >
                Talk to Sales
              </button>
            </div>
          </aside>
          
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
