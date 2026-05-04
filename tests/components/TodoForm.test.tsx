import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoForm from '../../src/components/TodoForm'

describe('TodoForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza el formulario con los campos correctos', () => {
    const mockOnSubmit = vi.fn()
    render(<TodoForm onSubmit={mockOnSubmit} />)

    expect(screen.getByLabelText(/Título/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Descripción/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Completada/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Guardar tarea/i })).toBeInTheDocument()
  })

  it('actualiza los valores del formulario cuando el usuario escribe', async () => {
    const mockOnSubmit = vi.fn()
    const user = userEvent.setup()
    render(<TodoForm onSubmit={mockOnSubmit} />)

    const titleInput = screen.getByLabelText(/Título/i) as HTMLInputElement
    const descriptionInput = screen.getByLabelText(/Descripción/i) as HTMLTextAreaElement

    await user.type(titleInput, 'Mi tarea')
    await user.type(descriptionInput, 'Descripción de la tarea')

    expect(titleInput.value).toBe('Mi tarea')
    expect(descriptionInput.value).toBe('Descripción de la tarea')
  })

  it('invoca onSubmit con los valores correctos al enviar el formulario', async () => {
    const mockOnSubmit = vi.fn()
    const user = userEvent.setup()
    render(<TodoForm onSubmit={mockOnSubmit} />)

    const titleInput = screen.getByLabelText(/Título/i)
    const descriptionInput = screen.getByLabelText(/Descripción/i)
    const submitButton = screen.getByRole('button', { name: /Guardar tarea/i })

    await user.type(titleInput, 'Test Task')
    await user.type(descriptionInput, 'Test Description')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
      })
    })
  })

  it('limpia los valores después de enviar si no hay onCancel', async () => {
    const mockOnSubmit = vi.fn()
    const user = userEvent.setup()
    render(<TodoForm onSubmit={mockOnSubmit} />)

    const titleInput = screen.getByLabelText(/Título/i) as HTMLInputElement
    const submitButton = screen.getByRole('button', { name: /Guardar tarea/i })

    await user.type(titleInput, 'Test Task')
    await user.click(submitButton)

    await waitFor(() => {
      expect(titleInput.value).toBe('')
    })
  })

  it('muestra label "Actualizar tarea" cuando hay initialValues', () => {
    const mockOnSubmit = vi.fn()
    const initialValues = { title: 'Editar', description: 'Test', completed: false }

    render(
      <TodoForm initialValues={initialValues} submitLabel="Actualizar tarea" onSubmit={mockOnSubmit} />
    )

    expect(screen.getByRole('button', { name: /Actualizar tarea/i })).toBeInTheDocument()
  })

  it('deshabilita el botón cuando loading es true', () => {
    const mockOnSubmit = vi.fn()
    render(<TodoForm onSubmit={mockOnSubmit} loading={true} />)

    const submitButton = screen.getByRole('button', { name: /Guardando/i }) as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
  })
})
