import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const mockRegister = vi.fn().mockResolvedValue({ user: { uid: 'uid-test' } })

vi.mock('../../src/features/auth/AuthContext', () => ({
  useAuthContext: () => ({
    register: mockRegister,
    loading: false,
    error: null,
  }),
}))

import RegisterForm from '../../src/components/RegisterForm'

describe('RegisterForm', () => {
  it('llama a register con los valores del formulario', async () => {
    const user = userEvent.setup()

    render(<RegisterForm />)

    const emailInput = screen.getByLabelText(/Correo electrónico/i)
    const passwordInput = screen.getByLabelText(/Contraseña/i)
    const submit = screen.getByRole('button', { name: /Registrarme/i })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'Test1234!')
    await user.click(submit)

    await waitFor(() => expect(mockRegister).toHaveBeenCalled())
    expect(mockRegister.mock.calls[0][0]).toEqual({ email: 'test@example.com', password: 'Test1234!' })
  })
})
