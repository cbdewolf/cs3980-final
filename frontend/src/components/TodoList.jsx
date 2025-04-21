import React, { useState } from 'react';
import TodoItem from './TodoItem.jsx';
import Modal from './Modal.jsx';
import '../styles/reminders.css';

function ToDoList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Doctor Appointment', completed: true, date: '2025-04-21', time: '09:00' },
    { id: 2, text: 'Meeting at School', completed: false, date: '2025-04-22', time: '14:30' }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ text: '', date: '', time: '' });
  const [editingTaskId, setEditingTaskId] = useState(null);

  function openAddModal() {
    setEditingTaskId(null);
    setForm({ text: '', date: '', time: '' });
    setShowModal(true);
  }

  function openEdit(task) {
    setEditingTaskId(task.id);
    setForm({ text: task.text, date: task.date, time: task.time });
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {
    const { text, date, time } = form;
    if (!text.trim() || !date || !time) return;

    if (editingTaskId) {
      setTasks(prev =>
        prev.map(task =>
          task.id === editingTaskId ? { ...task, text: text.trim(), date, time } : task
        )
      );
    } else {
      const newTask = {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        date,
        time
      };
      setTasks(prev => [...prev, newTask]);
    }

    closeModal();
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(task => task.id !== id));
  }

  function toggleCompleted(id) {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <div className="todo-list">

      
    <button className="add-btn" onClick={openAddModal}>+ Add Reminder</button>
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
          openEdit={openEdit}
        />
      ))}


      <Modal isOpen={showModal} onClose={closeModal}>
        <h2>{editingTaskId ? 'Edit Reminder' : 'Add New Reminder'}</h2>
        <input
          type="text"
          name="text"
          value={form.text}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
        />
        <div className="modal-actions">
          <button onClick={handleSubmit}>{editingTaskId ? 'Save' : 'Add'}</button>
        </div>
      </Modal>
    </div>
  );
}

export default ToDoList;
