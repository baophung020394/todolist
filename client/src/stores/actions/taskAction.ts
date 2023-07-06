import axiosClient from '@apis/axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Task } from 'src/models/Task'
import { RootState } from '..'

export const createTask = createAsyncThunk<Task, Omit<Task, 'id'>, { rejectValue: string }>(
  'tasks/createTask',
  async (task, thunkAPI) => {
    try {
      const response = await axiosClient.post<Task>('/', task)
      if (!response || !response.data) {
        return thunkAPI.rejectWithValue('API response is undefined')
      }
      console.log('response create', response)
      // You can dispatch other actions here if needed
      if (response.status === 201) {
        thunkAPI.dispatch(fetchTasks())
      }
      return response.data // This will be passed as the payload in the fulfilled action
    } catch (error) {
      console.error(error)
      return thunkAPI.rejectWithValue('Failed to create task')
    }
  }
)

export const fetchTasks = createAsyncThunk<Task[], void, { rejectValue: string }>(
  'tasks/fetchTasks',
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get<Task>('/')
      if (!response || !response.data) {
        return thunkAPI.rejectWithValue('API response is undefined')
      }

      console.log('response', response)
      return response.data.tasks
    } catch (error) {
      console.error(error)
      return thunkAPI.rejectWithValue('Failed to fetch tasks')
    }
  }
)

export const toggleTask = createAsyncThunk<Task, number, { rejectValue: string }>(
  'tasks/toggleTask',
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState
      const taskToUpdate = state.tasks.tasks.find((task) => task.id === id)

      if (!taskToUpdate) {
        return thunkAPI.rejectWithValue('Task not found')
      }

      const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed }

      const response = await axiosClient.put<Task>(`/${id}`, updatedTask)
      console.log('response update', response)
      if (!response || !response.data) {
        return thunkAPI.rejectWithValue('API response is undefined')
      }
      if (response.status === 200) {
        thunkAPI.dispatch(fetchTasks())
      }
      return response.data
    } catch (error) {
      console.error(error)
      return thunkAPI.rejectWithValue('Failed to toggle task')
    }
  }
)

export const deleteTask = createAsyncThunk<void, number, { rejectValue: string }>(
  'tasks/deleteTask',
  async (id, thunkAPI) => {
    try {
      const response = await axiosClient.delete(`/${id}`)
      console.log('response delete', response)
      if (response.status === 204) {
        thunkAPI.dispatch(fetchTasks())
      }
    } catch (error) {
      console.error(error)
      return thunkAPI.rejectWithValue('Failed to delete task')
    }
  }
)
