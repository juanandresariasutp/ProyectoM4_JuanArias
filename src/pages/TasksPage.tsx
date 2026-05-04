import { useMemo, useState } from 'react'

import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import SendEmailButton from '../components/SendEmailButton'
import { useAuthContext } from '../features/auth/AuthContext'
import { useTasks } from '../hooks/useTasks'
import type { Task } from '../types/Task'

const emptyTaskValues = {
  title: '',
  description: '',
  completed: false,
}

type TaskFormValues = typeof emptyTaskValues

const TasksPage = () => {
  const { user, logout } = useAuthContext()
  const { tasks, loading, error, create, update, remove } = useTasks()
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const formValues = useMemo(() => {
    if (!editingTask) {
      return emptyTaskValues
    }

    return {
      title: editingTask.title,
      description: editingTask.description ?? '',
      completed: editingTask.completed,
    }
  }, [editingTask])

  const handleSubmit = async (values: TaskFormValues) => {
    if (editingTask) {
      await update(editingTask.id, values)
      setEditingTask(null)
      return
    }

    await create(values)
  }

  const handleToggleComplete = async (task: Task) => {
    await update(task.id, { completed: !task.completed })
  }

  return (
    <main>
      <section>
        <h1>Tareas</h1>
        {user ? <p>Sesión iniciada como {user.email}</p> : null}

        <button type="button" onClick={logout}>
          Cerrar sesión
        </button>

        <TodoForm
          initialValues={formValues}
          submitLabel={editingTask ? 'Actualizar tarea' : 'Crear tarea'}
          onSubmit={handleSubmit}
          onCancel={editingTask ? () => setEditingTask(null) : undefined}
          loading={loading}
        />

        {error ? <p role="alert">{error}</p> : null}
        {loading ? <p>Cargando tareas...</p> : null}

        {user && tasks.length > 0 ? (
          <SendEmailButton userEmail={user.email || ''} tasks={tasks} />
        ) : null}

        <TodoList
          tasks={tasks}
          onEdit={setEditingTask}
          onDelete={remove}
          onToggleComplete={handleToggleComplete}
        />
      </section>
    </main>
  )
}

export default TasksPage