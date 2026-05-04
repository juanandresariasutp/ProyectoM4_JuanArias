import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
import type { VercelRequest, VercelResponse } from '@vercel/node'

import type { Task } from '../src/types/Task'

const sesClient = new SESClient({ region: process.env.AWS_SES_REGION || 'us-east-1' })

const buildEmailHtml = (userEmail: string, tasks: Task[]): string => {
  const completedCount = tasks.filter((t) => t.completed).length
  const pendingCount = tasks.length - completedCount

  const taskRows = tasks
    .map(
      (task) => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">
        ${task.title}
      </td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">
        ${task.description ? task.description : 'Sin descripción'}
      </td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">
        ${task.completed ? '✓ Completada' : 'Pendiente'}
      </td>
    </tr>
  `
    )
    .join('')

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Resumen de Tareas</title>
    </head>
    <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 8px;">
        <h1 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
          📋 Resumen de Tareas
        </h1>
        
        <p style="margin: 16px 0;">Hola <strong>${userEmail}</strong>,</p>
        
        <p style="margin: 16px 0; background: #e8f4f8; padding: 12px; border-radius: 4px; border-left: 4px solid #3498db;">
          <strong>Estadísticas:</strong><br>
          ✓ Completadas: <strong>${completedCount}</strong><br>
          ○ Pendientes: <strong>${pendingCount}</strong><br>
          Total: <strong>${tasks.length}</strong>
        </p>

        <h2 style="color: #2c3e50; margin-top: 24px;">Detalle de Tareas</h2>
        
        ${
          tasks.length > 0
            ? `
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <thead>
              <tr style="background: #3498db; color: white;">
                <th style="padding: 10px; text-align: left;">Título</th>
                <th style="padding: 10px; text-align: left;">Descripción</th>
                <th style="padding: 10px; text-align: center;">Estado</th>
              </tr>
            </thead>
            <tbody>
              ${taskRows}
            </tbody>
          </table>
        `
            : '<p style="color: #7f8c8d;">No tienes tareas registradas.</p>'
        }

        <p style="margin-top: 24px; color: #7f8c8d; font-size: 12px;">
          Este correo fue enviado por tu aplicación de gestión de tareas.
        </p>
      </div>
    </body>
    </html>
  `
}

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { userEmail, tasks } = req.body as { userEmail: string; tasks: Task[] }

  if (!userEmail || !Array.isArray(tasks)) {
    return res.status(400).json({ error: 'userEmail y tasks son requeridos' })
  }

  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.error('AWS credentials not configured')
    return res.status(500).json({ error: 'Configuración incompleta' })
  }

  try {
    const htmlBody = buildEmailHtml(userEmail, tasks)

    const command = new SendEmailCommand({
      Source: process.env.AWS_SES_FROM_EMAIL || 'noreply@gestor-tareas.local',
      Destination: {
        ToAddresses: [userEmail],
      },
      Message: {
        Subject: {
          Data: 'Resumen de tu tareas - Gestor de Tareas',
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: htmlBody,
            Charset: 'UTF-8',
          },
        },
      },
    })

    await sesClient.send(command)

    return res.status(200).json({
      success: true,
      message: 'Email enviado correctamente',
    })
  } catch (error) {
    console.error('Error enviando email:', error)
    return res.status(500).json({
      error: 'Error enviando email',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
