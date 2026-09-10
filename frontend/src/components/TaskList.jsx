import TaskItem from './TaskItem';

export default function TaskList({ tasks, onTaskUpdated, onTaskDeleted }) {
  if (tasks.length === 0) {
    return <p className="empty-message">Nenhuma tarefa ainda</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onTaskUpdated={onTaskUpdated}
          onTaskDeleted={onTaskDeleted}
        />
      ))}
    </ul>
  );
}
