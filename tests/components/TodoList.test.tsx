import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoList from '../../src/components/TodoList'
import type { Task } from '../../src/types/Task'

describe('TodoList', () => {
  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    createdAt: new Date().toISOString(),
    userId: 'user123',
  }

  it('muestra mensaje cuando no hay tareas', () => {
    const mockEdit = vi.fn()
    const mockDelete = vi.fn()
    const mockToggle = vi.fn()

    render(
      <TodoList
        tasks={[]}
        onEdit={mockEdit}
        onDelete={mockDelete}
        onToggleComplete={mockToggle}
      />
    )

    expect(screen.getByText(/No hay tareas todavía/i)).toBeInTheDocument()
  })

  it('renderiza una tarea cuando hay tareas', () => {
    const mockEdit = vi.fn()
    const mockDelete = vi.fn()
    const mockToggle = vi.fn()

    render(
      <TodoList
        tasks={[mockTask]}
        onEdit={mockEdit}
        onDelete={mockDelete}
        onToggleComplete={mockToggle}
      />
    )

    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('renderiza múltiples tareas', () => {
    const task2: Task = {
      ...mockTask,
      id: '2',
      title: 'Second Task',
    }

    const mockEdit = vi.fn()
    const mockDelete = vi.fn()
    const mockToggle = vi.fn()

    render(
      <TodoList
        tasks={[mockTask, task2]}
        onEdit={mockEdit}
        onDelete={mockDelete}
        onToggleComplete={mockToggle}
      />
    )

    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(screen.getByText('Second Task')).toBeInTheDocument()
  })

  it('invoca onEdit cuando se pulsa el botón Editar', async () => {
    const mockEdit = vi.fn()
    const mockDelete = vi.fn()
    const mockToggle = vi.fn()
    const user = userEvent.setup()

    render(
      <TodoList
        tasks={[mockTask]}
        onEdit={mockEdit}
        onDelete={mockDelete}
        onToggleComplete={mockToggle}
      />
    )

    const editButton = screen.getByRole('button', { name: /Editar/i })
    await user.click(editButton)

    expect(mockEdit).toHaveBeenCalledWith(mockTask)
  })

  it('invoca onDelete cuando se pulsa Eliminar', async () => {
    const mockEdit = vi.fn()
    const mockDelete = vi.fn()
    const mockToggle = vi.fn()
    const user = userEvent.setup()

    render(
      <TodoList
        tasks={[mockTask]}
        onEdit={mockEdit}
        onDelete={mockDelete}
        onToggleComplete={mockToggle}
      />
    )

    const deleteButton = screen.getByRole('button', { name: /Borrar/i })
    await user.click(deleteButton)

    expect(mockDelete).toHaveBeenCalledWith(mockTask.id)
  })

  it('invoca onToggleComplete cuando se pulsa el botón de estado', async () => {
    const mockEdit = vi.fn()
    const mockDelete = vi.fn()
    const mockToggle = vi.fn()
    const user = userEvent.setup()

    render(
      <TodoList
        tasks={[mockTask]}
        onEdit={mockEdit}
        onDelete={mockDelete}
        onToggleComplete={mockToggle}
      />
    )

    const toggleButton = screen.getByRole('button', { name: /Pendiente/i })
    await user.click(toggleButton)

    expect(mockToggle).toHaveBeenCalledWith(mockTask)
  })
})
