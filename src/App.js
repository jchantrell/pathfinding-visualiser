import * as React from 'react'
import Visualiser from './components/Visualiser'
import NavBar from './components/Nav'
import CssBaseline from '@mui/material/CssBaseline'
import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import Notification from './components/Notification'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  const [notification, setNotification] = useState('')
  const [visualise, startVisualiser] = useState(false)
  const [clearGrid, setClearGrid] = useState(false)
  const [algorithm, setAlgorithm] = useState('')
  const [open, setOpen] = React.useState(false)
  const [currentAction, setCurrentAction] = useState('edit')

  const startVisualisation = () => {
    startVisualiser(true)
    setTimeout(() => {
      startVisualiser(false)
    }, 10)
  }

  const attemptClearGrid = () => {
    setClearGrid(true)
    setTimeout(() => {
      setClearGrid(false)
    }, 1)
  }

  const showNotification = (notification) => {
    setNotification(notification)
    setOpen(true)
  }

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Notification
          open={open}
          setOpen={setOpen}
          notification={notification}
        />
        <NavBar
          startVisualisation={startVisualisation}
          attemptClearGrid={attemptClearGrid}
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          setCurrentAction={setCurrentAction}
        />
        <Visualiser
          setNotification={setNotification}
          showNotification={showNotification}
          visualise={visualise}
          currentAction={currentAction}
          algorithm={algorithm}
          clearGrid={clearGrid}
          setClearGrid={setClearGrid}
        />
      </ThemeProvider>
    </>
  )
}

export default App
