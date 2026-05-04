import { useState } from 'react'

import { sendEmailSummary } from '../services/emailService'
import type { Task } from '../types/Task'

type SendEmailButtonProps = {
  userEmail: string
  tasks: Task[]
}

const SendEmailButton = ({ userEmail, tasks }: SendEmailButtonProps) => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSendEmail = async () => {
    setLoading(true)
    setMessage(null)

    try {
      await sendEmailSummary(userEmail, tasks)
      setMessage({
        type: 'success',
        text: `Email enviado correctamente a ${userEmail}`,
      })
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Error enviando email',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button type="button" onClick={handleSendEmail} disabled={loading || tasks.length === 0}>
        {loading ? 'Enviando...' : '📧 Enviar resumen por email'}
      </button>

      {message ? (
        <p
          role="alert"
          style={{
            color: message.type === 'success' ? '#27ae60' : '#e74c3c',
            marginTop: '8px',
          }}
        >
          {message.text}
        </p>
      ) : null}
    </div>
  )
}

export default SendEmailButton
