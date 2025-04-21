import React from 'react';
import NavBar from '../components/NavBar.jsx';
import '../styles/reminders.css';
import ToDoList from '../components/ToDoList.jsx';

function Reminders() {
  return (
    <>
      <NavBar />
      <div className="reminders">
        <h1>Your Reminders</h1>
        <ToDoList />
      </div>
    </>
  );
}

export default Reminders;
