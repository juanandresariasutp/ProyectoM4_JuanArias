import type { Task } from '../types/Task'

export const sendEmailSummary = async (userEmail: string, tasks: Task[]): Promise<void> => {
  const response = await fetch('/api/sendEmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userEmail,
      tasks,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Error al enviar email')
  }

  return response.json()
}

export default {
  sendEmailSummary,
}
