import type { Task } from '../types/Task'

type TodoItemProps = {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
  onToggleComplete: (task: Task) => void
}

const TodoItem = ({ task, onEdit, onDelete, onToggleComplete }: TodoItemProps) => {
  return (
    <article>
      <h3>
        {task.title}{' '}
        {task.completed ? <span aria-label="completada">(Completada)</span> : null}
      </h3>
      {task.description ? <p>{task.description}</p> : <p>Sin descripción</p>}
      <small>Creada: {new Date(task.createdAt).toLocaleString()}</small>

      <div>
        <button type="button" onClick={() => onToggleComplete(task)}>
          {task.completed ? 'Marcar pendiente' : 'Marcar completada'}
        </button>
        <button type="button" onClick={() => onEdit(task)}>
          Editar
        </button>
        <button type="button" onClick={() => onDelete(task.id)}>
          Eliminar
        </button>
      </div>
    </article>
  )
}

export default TodoItem
