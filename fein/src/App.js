import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { HomePage } from './Pages/Homepage';

function App() {
  return (
    <div className="App">
      

      <HomePage />


    </div>
  );
}

export default App;
