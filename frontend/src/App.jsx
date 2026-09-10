import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks } from './api';
import './App.css';

const FILTERS = ['Todas', 'Pendentes', 'Concluídas'];

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('Todas');
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      let completed;
      if (filter === 'Pendentes') completed = false;
      if (filter === 'Concluídas') completed = true;
      const response = await getTasks(completed);
      setTasks(response.data);
      setError('');
    } catch {
      setError('Erro ao conectar com o backend. Verifique se o servidor está rodando em http://localhost:8000');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>
      <TaskForm onTaskCreated={fetchTasks} />

      <div className="filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={filter === f ? 'active' : ''}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {error && <p className="error-message">{error}</p>}
      <TaskList
        tasks={tasks}
        onTaskUpdated={fetchTasks}
        onTaskDeleted={fetchTasks}
      />
    </div>
  );
}

export default App;
