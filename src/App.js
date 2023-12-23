//App.js
import './App.css';
import React from 'react';

// Library for navigation
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import pages
import HomePage from './HomePage';
import ResultsPage from './ResultsPage';

function App() {
  return (
    <header className="App-header">
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/second-page" element={<ResultsPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </header>
  );
}

export default App;
