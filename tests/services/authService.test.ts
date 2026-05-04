import { describe, it, expect } from 'vitest'
import { getAuthMessage } from '../../src/services/authService'

describe('getAuthMessage', () => {
  it('devuelve mensaje traducido para códigos conocidos', () => {
    expect(getAuthMessage('auth/user-not-found')).toBe('No existe un usuario con ese correo.')
    expect(getAuthMessage('auth/wrong-password')).toBe('La contraseña es incorrecta.')
  })

  it('devuelve mensaje por defecto para código desconocido', () => {
    expect(getAuthMessage('auth/some-unknown')).toBe('Ocurrió un error inesperado con la autenticación.')
  })
})
