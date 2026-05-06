import { useEffect, useState, type FormEvent } from 'react'
import './TodoForm.css'

type TaskFormValues = {
  title: string
  description: string
  completed: boolean
}

type TodoFormProps = {
  initialValues?: TaskFormValues
  submitLabel?: string
  onSubmit: (values: TaskFormValues) => Promise<void> | void
  onCancel?: () => void
  loading?: boolean
}

const defaultValues: TaskFormValues = {
  title: '',
  description: '',
  completed: false,
}

const TodoForm = ({
  initialValues = defaultValues,
  submitLabel = 'Guardar tarea',
  onSubmit,
  onCancel,
  loading = false,
}: TodoFormProps) => {
  const [formValues, setFormValues] = useState<TaskFormValues>(initialValues)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setFormValues(initialValues)
  }, [initialValues])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: type === 'checkbox' ? (event.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)

    try {
      await onSubmit({
        title: formValues.title.trim(),
        description: formValues.description.trim(),
        completed: formValues.completed,
      })

      if (!onCancel) {
        setFormValues(defaultValues)
      }
    } finally {
      setSubmitting(false)
    }
  }

  const isBusy = loading || submitting

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h2>{submitLabel}</h2>

      <div className="form-field-group">
        <label htmlFor="task-title">Título de la tarea</label>
        <input
          id="task-title"
          name="title"
          type="text"
          placeholder="Ej: Terminar proyecto..."
          value={formValues.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field-group">
        <label htmlFor="task-description">Descripción</label>
        <textarea
          id="task-description"
          name="description"
          placeholder="Agrega detalles sobre la tarea (opcional)"
          value={formValues.description ?? ''}
          onChange={handleChange}
        />
      </div>

      <div className="form-checkbox-group">
        <input
          id="task-completed"
          name="completed"
          type="checkbox"
          checked={formValues.completed}
          onChange={handleChange}
        />
        <label htmlFor="task-completed">Marcar como completada al crear</label>
      </div>

      <div className="form-button-group">
        <button type="submit" className="btn-submit" disabled={isBusy}>
          {isBusy ? '⏳ Guardando...' : submitLabel}
        </button>

        {onCancel ? (
          <button type="button" className="btn-cancel" onClick={onCancel} disabled={isBusy}>
            Cancelar
          </button>
        ) : null}
      </div>
    </form>
  )
}

export default TodoForm
