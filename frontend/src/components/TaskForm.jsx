import { useState } from 'react';
import { createTask } from '../api';

export default function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('O título não pode estar vazio');
      return;
    }
    try {
      await createTask(title.trim());
      setTitle('');
      setError('');
      onTaskCreated();
    } catch {
      setError('Erro ao criar tarefa. Verifique se o backend está rodando.');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nova tarefa..."
        value={title}
        onChange={(e) => { setTitle(e.target.value); setError(''); }}
      />
      <button type="submit">Adicionar</button>
      {error && <span className="error">{error}</span>}
    </form>
  );
}
