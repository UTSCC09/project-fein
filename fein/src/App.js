import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home } from './Pages/Homepage';

function App() {
  return (
    <div className="App">
      

      <Home />


    </div>
  );
}

export default App;
