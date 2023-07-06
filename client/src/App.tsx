import React from 'react'
import { Container, Box } from '@mui/material'
import { Provider } from 'react-redux'
import store from '@stores/index' // Replace with your actual store
import AddTask from './components/AddTask'
import TaskList from './components/TaskList'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Container maxWidth='sm'>
        <Box mt={4}>
          <AddTask />
          <TaskList />
        </Box>
      </Container>
    </Provider>
  )
}

export default App
