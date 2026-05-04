export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  createdAt: string // ISO timestamp
  updatedAt?: string // ISO timestamp
  userId: string
}

export type NewTask = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
