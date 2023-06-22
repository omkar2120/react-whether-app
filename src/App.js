import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import "./App.css"
import Weather from './component/Weather';
 

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Weather/>} />
      </Routes>
    </div>
  );
};

export default App;
