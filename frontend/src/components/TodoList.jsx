// TodoList.jsx - Updated to connect with backend
import React, { useState, useEffect, useRef, useContext } from 'react';
import TodoItem from './TodoItem.jsx';
import Modal from './Modal.jsx';
import '../styles/reminders.css';
import { scheduleLocalNotification } from './Notifications.jsx';
import { UserContext } from '../contexts/UserContext';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ text: '', date: '', time: '' });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const scheduledTasksRef = useRef(new Set());
  const { user, token } = useContext(UserContext);

  // Fetch reminders from backend
  const fetchReminders = async () => {
    if (!token) return;
    
    try {
      const response = await fetch('http://localhost:8000/api/reminders', {
        headers: { 
          Authorization: `Bearer ${token}` 
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch reminders');
      
      const data = await response.json();
      setTasks(data);
      
      // Schedule notifications for fetched reminders
      if (Notification.permission === 'granted') {
        data.forEach(task => {
          if (!scheduledTasksRef.current.has(task._id)) {
            const timestamp = new Date(`${task.date}T${task.time}`).getTime();
            if (timestamp > Date.now()) {
              const title = '🔔 Reminder';
              const body = `${formatTime(task.time)} – ${task.text}`;
              scheduleLocalNotification(title, body, timestamp);
            }
            scheduledTasksRef.current.add(task._id);
          }
        });
      }
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchReminders();
    }
  }, [user, token]);

  const openAddModal = () => {
    setEditingTaskId(null);
    setForm({ text: '', date: '', time: '' });
    setShowModal(true);
  };

  const openEdit = task => {
    setEditingTaskId(task._id);
    setForm({ 
      text: task.text, 
      date: task.date || '', 
      time: task.time || '' 
    });
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    const { text, date, time } = form;
    if (!text.trim() || !date || !time) return;

    // Trigger permission prompt on user submit if needed
    if (Notification.permission === 'default') {
      const result = await Notification.requestPermission();
      if (result !== 'granted') {
        alert('Please allow notifications to receive reminders.');
        return;
      }
    }
    
    if (Notification.permission !== 'granted') {
      alert('Notifications are not enabled. Please enable them in your browser settings.');
      return;
    }

    try {
      if (editingTaskId) {
        // Update existing reminder
        const response = await fetch(`http://localhost:8000/api/reminders/${editingTaskId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            text: text.trim(),
            completed: false,
            date,
            time
          })
        });
        
        if (!response.ok) throw new Error('Failed to update reminder');
        
      } else {
        // Create new reminder
        const response = await fetch('http://localhost:8000/api/reminders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            text: text.trim(),
            completed: false,
            date,
            time
          })
        });
        
        if (!response.ok) throw new Error('Failed to create reminder');
      }
      
      // Refresh the reminders list
      fetchReminders();
      closeModal();
      
    } catch (error) {
      console.error('Error saving reminder:', error);
      alert('Failed to save reminder. Please try again.');
    }
  };

  const deleteTask = async id => {
    try {
      const response = await fetch(`http://localhost:8000/api/reminders/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to delete reminder');
      
      fetchReminders();
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  const toggleCompleted = async id => {
    try {
      const task = tasks.find(t => t._id === id);
      if (!task) return;
      
      const response = await fetch(`http://localhost:8000/api/reminders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...task,
          completed: !task.completed
        })
      });
      
      if (!response.ok) throw new Error('Failed to update reminder');
      
      fetchReminders();
    } catch (error) {
      console.error('Error updating reminder:', error);
    }
  };

  // Sort tasks by datetime
  const sortedTasks = [...tasks].sort((a, b) => {
    const aDateTime = a.date && a.time ? new Date(`${a.date}T${a.time}`) : new Date(0);
    const bDateTime = b.date && b.time ? new Date(`${b.date}T${b.time}`) : new Date(0);
    return aDateTime - bDateTime;
  });

  return (
    <div className="todo-list">
      {sortedTasks.map(task => (
        <TodoItem
          key={task._id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
          openEdit={openEdit}
        />
      ))}

      {user && (
        <button className="add-new-application" onClick={openAddModal}>
          Add Reminder
        </button>
      )}

      <Modal isOpen={showModal} onClose={closeModal}>
        <div className="app-form-container">
          <form onSubmit={handleSubmit} className="application-form">
            <h2>{editingTaskId ? 'Edit Reminder' : 'Add New Reminder'}</h2>
            <label>
              Title
              <input
                type="text"
                name="text"
                value={form.text}
                onChange={handleChange}
                placeholder="Enter title"
              />
            </label>
            <label>
              Date
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />
            </label>
            <label>
              Time
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
              />
            </label>
            <div className="form-actions">
              <button type="submit">{editingTaskId ? 'Save' : 'Add'}</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

const formatTime = hhmm => {
  if (!hhmm) return '';
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const hour12 = ((h + 11) % 12) + 1;
  return `${hour12}:${m.toString().padStart(2, '0')}${suffix}`;
};

export default ToDoList;