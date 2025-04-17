import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Button from './components/button';
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard';
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