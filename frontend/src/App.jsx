import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { Routes, Route } from 'react-router-dom';
import Reminders from './pages/Reminders';
import UserHome from './pages/UserHome';
import Companies from './pages/Companies';
import HomePage from './pages/HomePage';
import Admin from './pages/Admin'; // Import the Admin component

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reminders" element={<Reminders />} />
      <Route path="/userhome" element={<UserHome />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/admin" element={<Admin />} /> {/* Add the admin route */}
    </Routes>
  );
}

export default App;
