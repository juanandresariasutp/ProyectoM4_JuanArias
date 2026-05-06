import type { Task } from '../types/Task'

type TodoItemProps = {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
  onToggleComplete: (task: Task) => void
}

const TodoItem = ({ task, onEdit, onDelete, onToggleComplete }: TodoItemProps) => {
  const formattedDate = new Date(task.createdAt).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })

  return (
    <tr>
      <td>
        <div className="todo-status">
          <button
            type="button"
            className={`status-badge ${task.completed ? 'completed' : 'pending'}`}
            onClick={() => onToggleComplete(task)}
            title={task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
            aria-label={task.completed ? 'Completada' : 'Pendiente'}
          >
            {task.completed ? '✓' : '○'}
          </button>
        </div>
      </td>
      <td>
        <div className={`todo-title ${task.completed ? 'completed' : ''}`}>
          {task.title}
        </div>
      </td>
      <td>
        <div className="todo-description">
          {task.description || '—'}
        </div>
      </td>
      <td>
        <div className="todo-date">
          {formattedDate}
        </div>
      </td>
      <td>
        <div className="todo-actions">
          <button 
            type="button" 
            className="btn-edit"
            onClick={() => onEdit(task)}
            title="Editar"
          >
            Editar
          </button>
          <button 
            type="button" 
            className="btn-delete"
            onClick={() => onDelete(task.id)}
            title="Eliminar"
          >
            Borrar
          </button>
        </div>
      </td>
    </tr>
  )
}

export default TodoItem
