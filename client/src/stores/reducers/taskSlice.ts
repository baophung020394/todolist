import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchTasks } from '@stores/actions/taskAction'
import { Task } from 'src/models/Task'

interface TaskState {
  tasks: Task[]
}

const initialState: TaskState = {
  tasks: []
}

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload)
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((task) => task.id === action.payload)
      if (task) {
        task.completed = !task.completed
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchTasks.fulfilled,
      (state, action: PayloadAction<Task[], string, { requestId: string; requestStatus: 'fulfilled' }>) => {
        console.log('action.payload', action.payload)
        state.tasks = action.payload
      }
    )
    // Handle the rejected and pending cases as needed
  }
})

export const { addTask, toggleTask, deleteTask } = taskSlice.actions

export default taskSlice.reducer
