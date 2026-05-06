import type { Task } from '../types/Task'
import TodoItem from './TodoItem'
import './TodoList.css'

type TodoListProps = {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
  onToggleComplete: (task: Task) => void
}

const TodoList = ({ tasks, onEdit, onDelete, onToggleComplete }: TodoListProps) => {
  if (tasks.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '2rem 1rem', 
        background: '#1a1a1a', 
        borderRadius: '8px',
        border: '1px solid #2a2a2a',
        color: '#808080',
        fontSize: '0.95rem'
      }}>
        📭 No hay tareas todavía. ¡Crea una para comenzar!
      </div>
    )
  }

  return (
    <table className="todos-table" aria-label="Lista de tareas">
      <thead>
        <tr>
          <th style={{ width: '8%' }}>Estado</th>
          <th style={{ width: '35%' }}>Tarea</th>
          <th style={{ width: '30%' }}>Descripción</th>
          <th style={{ width: '15%' }}>Fecha</th>
          <th style={{ width: '12%', textAlign: 'center' }}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </tbody>
    </table>
  )
}

export default TodoList
