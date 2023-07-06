import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@stores/index' // Import your RootState here
import { useEffect } from 'react'
import { fetchTasks } from '@stores/actions/taskAction'
import { List } from '@mui/material'
import Task from './Task'

const TaskList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const tasks = useSelector((state: RootState) => state.tasks.tasks) // Adjust this line according to your state structure

  console.log('tasks', tasks)
  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  // Use Redux actions instead of passing functions through props
  return (
    <List>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </List>
  )
}

export default TaskList
