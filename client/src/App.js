import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Translator from './components/Translator';
import './css/background.css';

const App = () => {
  return (
    <Router>
      <div className="background-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/translate" element={<Translator/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
