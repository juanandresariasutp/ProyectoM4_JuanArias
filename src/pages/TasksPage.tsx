import { useMemo, useState } from 'react'

import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import SendEmailButton from '../components/SendEmailButton'
import { useAuthContext } from '../features/auth/AuthContext'
import { useTasks } from '../hooks/useTasks'
import type { Task } from '../types/Task'
import './TasksPage.css'

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
    <main className="tasks-page">
      <div className="tasks-container">
        <div className="tasks-header">
          <h1>📋 Mis Tareas</h1>
          <div className="tasks-user-info">
            {user && <div className="tasks-email">Sesión: <strong>{user.email}</strong></div>}
            <button type="button" className="btn-logout" onClick={logout}>
              Cerrar sesión
            </button>
          </div>
        </div>

        {error ? <div className="error-alert">{error}</div> : null}
        {loading && <div className="loading-msg">Cargando tareas...</div>}

        <div className="tasks-form-section">
          <TodoForm
            initialValues={formValues}
            submitLabel={editingTask ? 'Actualizar tarea' : 'Crear tarea'}
            onSubmit={handleSubmit}
            onCancel={editingTask ? () => setEditingTask(null) : undefined}
            loading={loading}
          />
        </div>

        {user && tasks.length > 0 ? (
          <div style={{ marginBottom: '1.5rem' }}>
            <SendEmailButton userEmail={user.email || ''} tasks={tasks} />
          </div>
        ) : null}

        <div className="tasks-list-section">
          <TodoList
            tasks={tasks}
            onEdit={setEditingTask}
            onDelete={remove}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      </div>
    </main>
  )
}

export default TasksPage