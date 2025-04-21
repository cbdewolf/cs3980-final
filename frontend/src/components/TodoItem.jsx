import React from 'react';

function TodoItem({ task, deleteTask, toggleCompleted, openEdit }) {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleCompleted(task.id)}
      />

      <div className="task-content">
        <p className={task.completed ? 'completed' : ''}>{task.text}</p>
        <span className="task-datetime">
          {task.date} @ {task.time}
        </span>
      </div>

      <div className="actions">
        <button onClick={() => openEdit(task)} className="edit-btn">✎</button>
        <button onClick={() => deleteTask(task.id)} className="delete-btn">×</button>
      </div>
    </div>
  );
}

export default TodoItem;
