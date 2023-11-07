import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { HomePage } from './Pages/Home/Homepage.js';
import { TradingPage } from './Pages/Trading/Tradingpage.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trading" element={<TradingPage />} />
        </Routes>
      </BrowserRouter>




    </div>
  );
}

export default App;
