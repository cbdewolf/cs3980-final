import React, { useState, useEffect, useRef } from 'react';
import TodoItem from './TodoItem.jsx';
import Modal from './Modal.jsx';
import '../styles/reminders.css';
import { scheduleLocalNotification } from './Notifications.jsx';

const ToDoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Doctor Appointment', completed: true, date: '2025-04-21', time: '09:00' },
    { id: 2, text: 'Meeting at School', completed: false, date: '2025-04-22', time: '14:30' }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ text: '', date: '', time: '' });
  const [editingTaskId, setEditingTaskId] = useState(null);
  // Ref to track which tasks have already been scheduled
  const scheduledTasksRef = useRef(new Set());

  // Schedule notifications only once per task
  useEffect(() => {
    if (Notification.permission === 'granted') {
      tasks.forEach(task => {
        if (!scheduledTasksRef.current.has(task.id)) {
          const timestamp = new Date(`${task.date}T${task.time}`).getTime();
          if (timestamp > Date.now()) {
            const title = '🔔 Reminder';
            const body = `${formatTime(task.time)} – ${task.text}`;
            scheduleLocalNotification(title, body, timestamp);
          }
          // Mark as scheduled
          scheduledTasksRef.current.add(task.id);
        }
      });
    }
  }, [tasks]);

  const openAddModal = () => {
    setEditingTaskId(null);
    setForm({ text: '', date: '', time: '' });
    setShowModal(true);
  };

  const openEdit = task => {
    setEditingTaskId(task.id);
    setForm({ text: task.text, date: task.date, time: task.time });
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

    // Create or update task; notification scheduling handled in effect
    if (editingTaskId) {
      setTasks(prev =>
        prev.map(task =>
          task.id === editingTaskId
            ? { ...task, text: text.trim(), date, time }
            : task
        )
      );
    } else {
      const newTask = { id: Date.now(), text: text.trim(), completed: false, date, time };
      setTasks(prev => [...prev, newTask]);
    }

    closeModal();
  };

  const deleteTask = id =>
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));

  const toggleCompleted = id =>
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

  // Sort tasks by datetime
  const sortedTasks = [...tasks].sort((a, b) => {
    const aDateTime = new Date(`${a.date}T${a.time}`);
    const bDateTime = new Date(`${b.date}T${b.time}`);
    return aDateTime - bDateTime;
  });

  return (
    <div className="todo-list">
      {sortedTasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
          openEdit={openEdit}
        />
      ))}

      <button className="add-new-application" onClick={openAddModal}>
        Add Reminder
      </button>

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
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const hour12 = ((h + 11) % 12) + 1;
  return `${hour12}:${m.toString().padStart(2, '0')}${suffix}`;
};

export default ToDoList;