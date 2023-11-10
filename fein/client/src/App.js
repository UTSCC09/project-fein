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
import { LoginPage } from './Pages/Login/LoginPage.js';
import { SignUpPage } from './Pages/SignUp/SignUpPage.js';
import { ProfilePage } from './Pages/Profile/ProfilePage.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trading" element={<TradingPage />} />
          <Route path="trading/stock/:id" element={<TradingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/about" element={<Navigate to="/" />} />
          <Route path ="/profile" element={<ProfilePage />} />
          <Route path="/profile:username" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>




    </div>
  );
}

export default App;
