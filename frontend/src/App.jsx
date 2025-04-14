import React, { useState } from 'react';
import NavBar from './nav-bar';
import Button from './button';

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
    <div className="min-h-screen bg-gray-50">
      <NavBar 
        title="React App" 
        links={navLinks} 
        sticky={true} 
      />
      
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome to Your React App</h1>
          
          <div className="mb-8">
            <p className="text-xl text-gray-600 mb-4">
              This is a simple demo showcasing React components
            </p>
            <p className="text-gray-500">
              Edit <code className="bg-gray-100 px-1 py-0.5 rounded">App.jsx</code> to experiment with the code
            </p>
          </div>
          
          <div className="mb-12 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Counter Example</h2>
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Button text="Decrement" onClick={decrementCount} type="outline" />
              <div className="text-3xl font-bold text-gray-800 w-16">{count}</div>
              <Button text="Increment" onClick={incrementCount} type="primary" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Button Variants</h3>
              <div className="flex flex-wrap gap-2">
                <Button text="Primary" type="primary" />
                <Button text="Secondary" type="secondary" />
                <Button text="Outline" type="outline" />
                <Button text="Danger" type="danger" />
                <Button text="Success" type="success" />
              </div>
            </div>
            
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Button Sizes</h3>
              <div className="flex flex-wrap gap-2 items-center">
                <Button text="Small" size="sm" />
                <Button text="Medium" size="md" />
                <Button text="Large" size="lg" />
              </div>
            </div>
            
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Button States</h3>
              <div className="flex flex-wrap gap-2">
                <Button text="Enabled" />
                <Button text="Disabled" disabled={true} />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white py-6 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} React Demo App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;