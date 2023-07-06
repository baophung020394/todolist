export interface Task {
  id: number
  name: string
  completed: boolean
  createdAt: string
  updatedAt: string
  tasks: []
}

export interface TaskList {
  tasks: Task
}
