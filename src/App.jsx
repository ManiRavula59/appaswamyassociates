import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import About from './components/About';
import Features from './components/Features';
import Manufacturing from './components/Manufacturing';
import Showcase from './components/Showcase';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';

function App() {
  return (
    <div className="app">
      <Navbar />
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
      <ChatAssistant />
    </div>
  );
}

export default App;
