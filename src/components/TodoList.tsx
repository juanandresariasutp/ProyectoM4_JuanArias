import type { Task } from '../types/Task'
import TodoItem from './TodoItem'

type TodoListProps = {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
  onToggleComplete: (task: Task) => void
}

const TodoList = ({ tasks, onEdit, onDelete, onToggleComplete }: TodoListProps) => {
  if (tasks.length === 0) {
    return <p>No hay tareas todavía.</p>
  }

  return (
    <section aria-label="Lista de tareas">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </section>
  )
}

export default TodoList
