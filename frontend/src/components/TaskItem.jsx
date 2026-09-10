import { useState } from 'react';
import { updateTask, deleteTask } from '../api';

export default function TaskItem({ task, onTaskUpdated, onTaskDeleted }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [error, setError] = useState('');

  const handleToggle = async () => {
    try {
      await updateTask(task.id, { completed: !task.completed });
      onTaskUpdated();
    } catch {
      setError('Erro ao atualizar tarefa.');
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setError('O título não pode estar vazio');
      return;
    }
    try {
      await updateTask(task.id, { title: title.trim() });
      setEditing(false);
      setError('');
      onTaskUpdated();
    } catch {
      setError('Erro ao salvar tarefa.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      onTaskDeleted();
    } catch {
      setError('Erro ao excluir tarefa.');
    }
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
      />
      {editing ? (
        <div className="edit-group">
          <input
            type="text"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setError(''); }}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') { setEditing(false); setTitle(task.title); } }}
            autoFocus
          />
          <button onClick={handleSave}>Salvar</button>
        </div>
      ) : (
        <>
          <span className="task-title">{task.title}</span>
          <button onClick={() => setEditing(true)}>Editar</button>
        </>
      )}
      <button className="delete-btn" onClick={handleDelete}>Excluir</button>
      {error && <span className="error">{error}</span>}
    </li>
  );
}
