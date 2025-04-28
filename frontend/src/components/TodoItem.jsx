import React from 'react';

const TodoItem = ({ task, deleteTask, toggleCompleted, openEdit }) => (
  <div className="todo-item">
    <input
      type="checkbox"
      checked={task.completed}
      onChange={() => toggleCompleted(task._id)}
    />
    <div className="task-content">
      <p className={task.completed ? 'completed' : ''}>{task.text}</p>
      <span className="task-datetime">{task.date} @ {task.time}</span>
    </div>
    <div className="actions">
      <button onClick={() => openEdit(task)} className="edit-btn">✎</button>
      <button onClick={() => deleteTask(task._id)} className="delete-btn">×</button>
    </div>
  </div>
);

export default TodoItem;