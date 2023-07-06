import React from 'react'
import { useDispatch } from 'react-redux'
import { ListItem, Checkbox, IconButton, ListItemText, ListItemSecondaryAction } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteTask, toggleTask } from '@stores/actions/taskAction'
import { AppDispatch } from '@stores/index'

interface Props {
  task: { id: number; name: string; completed: boolean }
}

const Task: React.FC<Props> = ({ task }) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleToggleTask = () => {
    dispatch(toggleTask(task.id))
  }

  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id))
  }

  return (
    <ListItem>
      <Checkbox
        edge='start'
        checked={task.completed}
        tabIndex={-1}
        disableRipple
        inputProps={{ 'aria-labelledby': `checkbox-list-label-${task.id}` }}
        onClick={handleToggleTask}
      />
      <ListItemText
        id={`checkbox-list-label-${task.id}`}
        primary={task.name}
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
      />
      <ListItemSecondaryAction>
        <IconButton edge='end' aria-label='delete' onClick={handleDeleteTask}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default Task
