import React from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button, Box } from '@mui/material'
import { Task } from '../models/Task'
import { createTask } from '@stores/actions/taskAction'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@stores/index'

const AddTask: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<Task>()
  const dispatch = useDispatch<AppDispatch>()

  const onSubmit = (data: Task) => {
    const now = new Date().toISOString()
    dispatch(createTask({ ...data, completed: false, createdAt: now, updatedAt: now }))
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display='flex' justifyContent='center' gap={2}>
        <TextField {...register('name')} label='New Task' variant='outlined' />
        <Button type='submit' variant='contained' color='primary'>
          Add Task
        </Button>
      </Box>
    </form>
  )
}

export default AddTask
