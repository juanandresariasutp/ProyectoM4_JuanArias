import { useEffect, useState, type FormEvent } from 'react'

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
    <form onSubmit={handleSubmit}>
      <h2>{submitLabel}</h2>

      <label htmlFor="task-title">Título</label>
      <input
        id="task-title"
        name="title"
        type="text"
        value={formValues.title}
        onChange={handleChange}
        required
      />

      <label htmlFor="task-description">Descripción</label>
      <textarea
        id="task-description"
        name="description"
        value={formValues.description ?? ''}
        onChange={handleChange}
        rows={4}
      />

      <label htmlFor="task-completed">
        <input
          id="task-completed"
          name="completed"
          type="checkbox"
          checked={formValues.completed}
          onChange={handleChange}
        />
        Completada
      </label>

      <button type="submit" disabled={isBusy}>
        {isBusy ? 'Guardando...' : submitLabel}
      </button>

      {onCancel ? (
        <button type="button" onClick={onCancel} disabled={isBusy}>
          Cancelar
        </button>
      ) : null}
    </form>
  )
}

export default TodoForm
