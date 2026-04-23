import React from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import About from '../components/About';
import Features from '../components/Features';
import Manufacturing from '../components/Manufacturing';
import Showcase from '../components/Showcase';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <main>
        <Hero />
        <Categories />
        <About />
        <Features />
        <Manufacturing />
        <Showcase />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
};

export default Home;
