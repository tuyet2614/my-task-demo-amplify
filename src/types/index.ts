// Types for our Task Management app

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
}

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  attachment?: string
  createdAt: string
  updatedAt: string
}

export enum TaskStatus {
  TODO = 'TODO',
  DONE = 'DONE',
}

export interface CreateTaskInput {
  title: string
  description?: string
}

export interface UpdateTaskInput {
  id: string
  title?: string
  description?: string
  status?: TaskStatus
}
