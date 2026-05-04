import { useEffect, useState } from 'react'
import type { User } from 'firebase/auth'

import {
  getAuthMessage,
  loginWithEmail,
  loginWithGoogle,
  logout,
  observeAuthState,
  registerWithEmail,
  resetPassword,
} from '../services/authService'

type AuthState = {
  user: User | null
  loading: boolean
  error: string | null
}

type Credentials = {
  email: string
  password: string
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const unsubscribe = observeAuthState((user) => {
      setState((currentState) => ({
        ...currentState,
        user,
        loading: false,
      }))
    })

    return unsubscribe
  }, [])

  const setError = (errorCode: string) => {
    setState((currentState) => ({
      ...currentState,
      error: getAuthMessage(errorCode),
    }))
  }

  const clearError = () => {
    setState((currentState) => ({
      ...currentState,
      error: null,
    }))
  }

  const register = async ({ email, password }: Credentials) => {
    clearError()

    try {
      const result = await registerWithEmail(email, password)
      setState((currentState) => ({
        ...currentState,
        user: result.user,
        loading: false,
      }))
      return result.user
    } catch (error) {
      const authError = error as { code?: string }
      setError(authError.code ?? 'auth/unknown-error')
      throw error
    }
  }

  const login = async ({ email, password }: Credentials) => {
    clearError()

    try {
      const result = await loginWithEmail(email, password)
      setState((currentState) => ({
        ...currentState,
        user: result.user,
        loading: false,
      }))
      return result.user
    } catch (error) {
      const authError = error as { code?: string }
      setError(authError.code ?? 'auth/unknown-error')
      throw error
    }
  }

  const loginWithProvider = async () => {
    clearError()

    try {
      const result = await loginWithGoogle()
      setState((currentState) => ({
        ...currentState,
        user: result.user,
        loading: false,
      }))
      return result.user
    } catch (error) {
      const authError = error as { code?: string }
      setError(authError.code ?? 'auth/unknown-error')
      throw error
    }
  }

  const logoutUser = async () => {
    clearError()

    try {
      await logout()
      setState((currentState) => ({
        ...currentState,
        user: null,
        loading: false,
      }))
    } catch (error) {
      const authError = error as { code?: string }
      setError(authError.code ?? 'auth/unknown-error')
      throw error
    }
  }

  const sendRecoveryEmail = async (email: string) => {
    clearError()

    try {
      await resetPassword(email)
    } catch (error) {
      const authError = error as { code?: string }
      setError(authError.code ?? 'auth/unknown-error')
      throw error
    }
  }

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    register,
    login,
    loginWithProvider,
    logout: logoutUser,
    resetPassword: sendRecoveryEmail,
    clearError,
  }
}

export type { Credentials }