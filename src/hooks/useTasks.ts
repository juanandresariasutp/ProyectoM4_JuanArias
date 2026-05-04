import { useEffect, useState, useCallback } from 'react'

import type { Task, NewTask } from '../types/Task'
import * as tasksService from '../services/tasksService'
import { useAuthContext } from '../features/auth/AuthContext'

export const useTasks = () => {
  const { user } = useAuthContext()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      setTasks([])
      setLoading(false)
      return
    }

    setLoading(true)
    const unsub = tasksService.subscribeTasks(user.uid, (list) => {
      setTasks(list)
      setLoading(false)
    })

    return () => unsub()
  }, [user])

  const create = useCallback(async (payload: Omit<NewTask, 'userId'>) => {
    if (!user) throw new Error('No autenticado')
    try {
      const id = await tasksService.createTask(user.uid, payload)
      return id
    } catch (err) {
      setError('Error creando tarea')
      throw err
    }
  }, [user])

  const update = useCallback(async (taskId: string, updates: Partial<Task>) => {
    if (!user) throw new Error('No autenticado')
    try {
      await tasksService.updateTask(user.uid, taskId, updates)
    } catch (err) {
      setError('Error actualizando tarea')
      throw err
    }
  }, [user])

  const remove = useCallback(async (taskId: string) => {
    if (!user) throw new Error('No autenticado')
    try {
      await tasksService.deleteTask(user.uid, taskId)
    } catch (err) {
      setError('Error eliminando tarea')
      throw err
    }
  }, [user])

  return {
    tasks,
    loading,
    error,
    create,
    update,
    remove,
  }
}

export default useTasks
