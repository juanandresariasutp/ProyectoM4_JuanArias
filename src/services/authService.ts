import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth'

import { firebaseAuth } from './firebase'

export const googleProvider = new GoogleAuthProvider()

export const registerWithEmail = (email: string, password: string) => {
  return createUserWithEmailAndPassword(firebaseAuth, email, password)
}

export const loginWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(firebaseAuth, email, password)
}

export const loginWithGoogle = () => {
  return signInWithPopup(firebaseAuth, googleProvider)
}

export const logout = () => {
  return signOut(firebaseAuth)
}

export const resetPassword = (email: string) => {
  return sendPasswordResetEmail(firebaseAuth, email)
}

export const observeAuthState = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(firebaseAuth, callback)
}

export const getAuthMessage = (errorCode: string) => {
  const errorMessages: Record<string, string> = {
    'auth/email-already-in-use': 'Este correo ya está registrado.',
    'auth/invalid-email': 'El correo no tiene un formato válido.',
    'auth/missing-password': 'Debes ingresar una contraseña.',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
    'auth/invalid-credential': 'Las credenciales no son válidas.',
    'auth/user-not-found': 'No existe un usuario con ese correo.',
    'auth/wrong-password': 'La contraseña es incorrecta.',
    'auth/popup-closed-by-user': 'Cerraste la ventana de inicio con Google.',
    'auth/cancelled-popup-request': 'Se canceló la solicitud de Google.',
    'auth/network-request-failed': 'Hubo un problema de conexión.',
  }

  return errorMessages[errorCode] ?? 'Ocurrió un error inesperado con la autenticación.'
}

export type AuthUser = User