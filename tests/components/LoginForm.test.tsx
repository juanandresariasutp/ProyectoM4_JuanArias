import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

const mockLogin = vi.fn().mockResolvedValue({ user: { uid: 'u-login' } })
const mockLoginWithProvider = vi.fn().mockResolvedValue({ user: { uid: 'u-google' } })
const mockNavigate = vi.fn()

vi.mock('../../src/features/auth/AuthContext', () => ({
  useAuthContext: () => ({
    login: mockLogin,
    loginWithProvider: mockLoginWithProvider,
    loading: false,
    error: null,
  }),
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

import LoginForm from '../../src/components/LoginForm'

describe('LoginForm', () => {
  it('llama a login con los valores del formulario', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    )

    const emailInput = screen.getByLabelText(/Correo electrónico/i)
    const passwordInput = screen.getByLabelText(/Contraseña/i)
    const submit = screen.getAllByRole('button')[0]

    await user.type(emailInput, 'login@example.com')
    await user.type(passwordInput, 'Login123!')
    await user.click(submit)

    await waitFor(() => expect(mockLogin).toHaveBeenCalled())
    expect(mockLogin.mock.calls[0][0]).toEqual({ email: 'login@example.com', password: 'Login123!' })
  })

  it('llama a loginWithProvider al clicar el botón de Google', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    )

    const buttons = screen.getAllByRole('button')
    const googleButton = buttons[1]

    await user.click(googleButton)

    await waitFor(() => expect(mockLoginWithProvider).toHaveBeenCalled())
  })
})
