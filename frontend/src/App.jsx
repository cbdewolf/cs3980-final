import React, { useState } from 'react';
import NavBar from '../components/nav-bar';
import Button from '../components/button';
import Login from '../pages/login'
import Register from '../pages/register'
import Dashboard from '../pages/dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}


export default App;