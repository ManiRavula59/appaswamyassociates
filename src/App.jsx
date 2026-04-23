import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatAssistant from './components/ChatAssistant';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import Support from './pages/Support';
import Careers from './pages/Careers';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/support" element={<Support />} />
          <Route path="/careers" element={<Careers />} />
        </Routes>
        <ChatAssistant />
      </div>
    </Router>
  );
}

export default App;
