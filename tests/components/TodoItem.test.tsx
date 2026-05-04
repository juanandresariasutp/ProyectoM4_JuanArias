import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoItem from '../../src/components/TodoItem'
import type { Task } from '../../src/types/Task'

describe('TodoItem', () => {
  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    createdAt: '2026-05-04T10:00:00.000Z',
    userId: 'user123',
  }

  it('renderiza la tarea con título y descripción', () => {
    const mockEdit = vi.fn()
    const mockDelete = vi.fn()
    const mockToggle = vi.fn()

    render(
      <TodoItem
        task={mockTask}
        onEdit={mockEdit}
        onDelete={mockDelete}
        onToggleComplete={mockToggle}
      />
    )

    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('muestra "Sin descripción" cuando no hay descripción', () => {
    const taskSinDesc: Task = { ...mockTask, description: undefined }
    const mockEdit = vi.fn()
    const mockDelete = vi.fn()
    const mockToggle = vi.fn()

    render(
      <TodoItem
        task={taskSinDesc}
        onEdit={mockEdit}
        onDelete={mockDelete}
        onToggleComplete={mockToggle}
      />
    )

    expect(screen.getByText('Sin descripción')).toBeInTheDocument()
  })

  it('muestra "(Completada)" cuando la tarea está completada', () => {
    const completedTask: Task = { ...mockTask, completed: true }
    const mockEdit = vi.fn()
    const mockDelete = vi.fn()
    const mockToggle = vi.fn()

    render(
      <TodoItem
        task={completedTask}
        onEdit={mockEdit}
        onDelete={mockDelete}
        onToggleComplete={mockToggle}
      />
    )

    expect(screen.getByLabelText('completada')).toBeInTheDocument()
  })

  it('invoca onEdit cuando se pulsa Editar', async () => {
    const mockEdit = vi.fn()
    const mockDelete = vi.fn()
    const mockToggle = vi.fn()
    const user = userEvent.setup()

    render(
      <TodoItem
        task={mockTask}
        onEdit={mockEdit}
        onDelete={mockDelete}
        onToggleComplete={mockToggle}
      />
    )

    await user.click(screen.getByRole('button', { name: /Editar/i }))
    expect(mockEdit).toHaveBeenCalledWith(mockTask)
  })

  it('invoca onDelete cuando se pulsa Eliminar', async () => {
    const mockEdit = vi.fn()
    const mockDelete = vi.fn()
    const mockToggle = vi.fn()
    const user = userEvent.setup()

    render(
      <TodoItem
        task={mockTask}
        onEdit={mockEdit}
        onDelete={mockDelete}
        onToggleComplete={mockToggle}
      />
    )

    await user.click(screen.getByRole('button', { name: /Eliminar/i }))
    expect(mockDelete).toHaveBeenCalledWith(mockTask.id)
  })

  it('invoca onToggleComplete cuando se pulsa Marcar completada', async () => {
    const mockEdit = vi.fn()
    const mockDelete = vi.fn()
    const mockToggle = vi.fn()
    const user = userEvent.setup()

    render(
      <TodoItem
        task={mockTask}
        onEdit={mockEdit}
        onDelete={mockDelete}
        onToggleComplete={mockToggle}
      />
    )

    await user.click(screen.getByRole('button', { name: /Marcar completada/i }))
    expect(mockToggle).toHaveBeenCalledWith(mockTask)
  })
})
