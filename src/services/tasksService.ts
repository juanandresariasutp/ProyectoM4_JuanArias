import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore'

import { firebaseDb } from './firebase'
import type { Task, NewTask } from '../types/Task'

const tasksCollection = (userId: string) => collection(firebaseDb, 'users', userId, 'tasks')

const mapDoc = (userId: string, d: any): Task => {
  const data = d.data()
  return {
    id: d.id,
    title: data.title,
    description: data.description ?? undefined,
    completed: !!data.completed,
    createdAt: data.createdAt && data.createdAt.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
    updatedAt: data.updatedAt && data.updatedAt.toDate ? data.updatedAt.toDate().toISOString() : undefined,
    userId,
  }
}

export const createTask = async (userId: string, task: Omit<NewTask, 'userId'>) => {
  const ref = await addDoc(tasksCollection(userId), {
    ...task,
    userId,
    completed: !!task.completed,
    createdAt: serverTimestamp(),
  })

  return ref.id
}

export const getTasksOnce = async (userId: string) => {
  const q = query(tasksCollection(userId), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => mapDoc(userId, d))
}

export const subscribeTasks = (userId: string, onUpdate: (tasks: Task[]) => void) => {
  const q = query(tasksCollection(userId), orderBy('createdAt', 'desc'))
  const unsub = onSnapshot(q, (snap) => {
    const tasks = snap.docs.map((d) => mapDoc(userId, d))
    onUpdate(tasks)
  })

  return unsub
}

export const updateTask = async (userId: string, taskId: string, updates: Partial<Task>) => {
  const d = doc(firebaseDb, 'users', userId, 'tasks', taskId)
  await updateDoc(d, {
    ...updates,
    updatedAt: serverTimestamp(),
  })
}

export const deleteTask = async (userId: string, taskId: string) => {
  const d = doc(firebaseDb, 'users', userId, 'tasks', taskId)
  await deleteDoc(d)
}

export default {
  createTask,
  getTasksOnce,
  subscribeTasks,
  updateTask,
  deleteTask,
}
