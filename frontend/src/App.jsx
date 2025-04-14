import React, { useState } from 'react';
import NavBar from '../components/nav-bar';
import Button from '../components/button';
import Login from '../pages/login'
import Register from '../pages/register'

/**
 * Main App component
 */
const App = () => {
  const [count, setCount] = useState(0);
  
  // Sample navigation links
  const navLinks = [
    { text: 'Home', url: '#' },
    { text: 'About', url: '#about' },
    { text: 'Services', url: '#services' },
    { text: 'Contact', url: '#contact' },
  ];

  // Increment counter
  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  // Decrement counter
  const decrementCount = () => {
    setCount(prevCount => prevCount - 1);
  };

  return (
    <Register />
  );
};

export default App;