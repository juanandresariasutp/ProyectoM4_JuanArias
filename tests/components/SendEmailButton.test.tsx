import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SendEmailButton from '../../src/components/SendEmailButton'
import * as emailService from '../../src/services/emailService'
import type { Task } from '../../src/types/Task'

vi.mock('../../src/services/emailService')

describe('SendEmailButton', () => {
  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    createdAt: new Date().toISOString(),
    userId: 'user123',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza el botón de enviar email', () => {
    render(<SendEmailButton userEmail="test@example.com" tasks={[mockTask]} />)

    expect(screen.getByRole('button', { name: /Enviar resumen por email/i })).toBeInTheDocument()
  })

  it('deshabilita el botón cuando no hay tareas', () => {
    render(<SendEmailButton userEmail="test@example.com" tasks={[]} />)

    const button = screen.getByRole('button', { name: /Enviar resumen por email/i }) as HTMLButtonElement
    expect(button.disabled).toBe(true)
  })

  it('invoca sendEmailSummary cuando se pulsa el botón', async () => {
    const mockSendEmail = vi.fn().mockResolvedValue(undefined)
    vi.mocked(emailService.sendEmailSummary).mockImplementation(mockSendEmail)

    const user = userEvent.setup()
    render(<SendEmailButton userEmail="test@example.com" tasks={[mockTask]} />)

    await user.click(screen.getByRole('button', { name: /Enviar resumen por email/i }))

    await waitFor(() => {
      expect(mockSendEmail).toHaveBeenCalledWith('test@example.com', [mockTask])
    })
  })

  it('muestra mensaje de éxito cuando el email se envía correctamente', async () => {
    const mockSendEmail = vi.fn().mockResolvedValue(undefined)
    vi.mocked(emailService.sendEmailSummary).mockImplementation(mockSendEmail)

    const user = userEvent.setup()
    render(<SendEmailButton userEmail="test@example.com" tasks={[mockTask]} />)

    await user.click(screen.getByRole('button', { name: /Enviar resumen por email/i }))

    await waitFor(() => {
      expect(screen.getByText(/Email enviado correctamente/i)).toBeInTheDocument()
    })
  })

  it('muestra mensaje de error cuando falla el envío', async () => {
    const mockSendEmail = vi.fn().mockRejectedValue(new Error('Error al enviar'))
    vi.mocked(emailService.sendEmailSummary).mockImplementation(mockSendEmail)

    const user = userEvent.setup()
    render(<SendEmailButton userEmail="test@example.com" tasks={[mockTask]} />)

    await user.click(screen.getByRole('button', { name: /Enviar resumen por email/i }))

    await waitFor(() => {
      expect(screen.getByText(/Error al enviar/i)).toBeInTheDocument()
    })
  })

  it('deshabilita el botón mientras se envía el email', async () => {
    const mockSendEmail = vi.fn().mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    )
    vi.mocked(emailService.sendEmailSummary).mockImplementation(mockSendEmail)

    const user = userEvent.setup()
    render(<SendEmailButton userEmail="test@example.com" tasks={[mockTask]} />)

    const button = screen.getByRole('button', { name: /Enviar resumen por email/i }) as HTMLButtonElement
    await user.click(button)

    expect(button.disabled).toBe(true)
    expect(screen.getByRole('button', { name: /Enviando/i })).toBeInTheDocument()
  })
})
