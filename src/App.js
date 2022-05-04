import * as React from 'react'
import { useEffect } from 'react'
import Visualiser from './components/visualiser'
import NavBar from './components/nav'
import CssBaseline from '@mui/material/CssBaseline'
import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import { dijkstra, getShortestPath } from './algorithms/dijkstra'
import Notification from './components/notification'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  let cols = 20
  let rows = 30
  if (window.innerWidth < 700) {
    rows = 19
    cols = 30
  } else if (window.innerWidth < 750) {
    rows = 18
    cols = 30
  } else if (window.innerWidth < 800) {
    rows = 25
    cols = 30
  } else if (window.innerWidth < 850) {
    rows = 24
    cols = 30
  }

  const [algorithm, setAlgorithm] = useState('')
  const [notification, setNotification] = useState('')
  const [open, setOpen] = React.useState(false)
  const [grid, setGrid] = useState([])
  const [mousePressed, setMousePressed] = useState(false)
  const [currentAction, setCurrentAction] = useState('edit')
  const [stops, setStops] = useState([])
  const [startRow, setStartRow] = useState(4)
  const [startCol, setStartCol] = useState(cols / 2)
  const [finishRow, setFinishRow] = useState(rows - 5)
  const [finishCol, setFinishCol] = useState(cols / 2)
  const [animationActive, setAnimationActive] = useState(false)

  useEffect(() => {
    const grid = initialiseGrid()
    setGrid(grid)
  }, [])

  const toggleEdit = () => {
    setCurrentAction('edit')
  }

  const placeStart = () => {
    setCurrentAction('placeStart')
  }

  const placeStop = () => {
    setCurrentAction('placeStop')
  }

  const placeFinish = () => {
    setCurrentAction('placeFinish')
  }

  const updateGrid = (row, col) => {
    const updated = grid.slice()
    const node = updated[row][col]

    // add/remove walls
    if (currentAction === 'edit') {
      const updatedNode = {
        ...node,
        wall: !node.wall,
      }
      updated[row][col] = updatedNode
      return updated
    }

    // change start location
    if (currentAction === 'placeStart') {
      const previousStart = document.getElementById(
        `node-${startRow}-${startCol}`
      )

      if (node === updated[startRow][startCol]) {
        return updated
      } else {
        updated[startRow][startCol].start = false

        setStartRow(row)
        setStartCol(col)
        previousStart.className = 'node'

        const updatedNode = {
          ...node,
          start: true,
        }

        updated[row][col] = updatedNode
        return updated
      }
    }

    // change finish location
    if (currentAction === 'placeFinish') {
      const previousFinish = document.getElementById(
        `node-${finishRow}-${finishCol}`
      )

      if (node === updated[finishRow][finishCol]) {
        return updated
      } else {
        updated[finishRow][finishCol].finish = false

        setFinishRow(row)
        setFinishCol(col)
        previousFinish.className = 'node'

        const updatedNode = {
          ...node,
          finish: true,
        }

        updated[row][col] = updatedNode
        return updated
      }
    }

    // place stop
    if (currentAction === 'placeStop') {
      const updatedStops = [...stops]

      if (updated[row][col].stop === true) {
        const noStops = updatedStops.filter(
          (stop) => stop !== updated[row][col]
        )
        const updatedNode = {
          ...node,
          stop: false,
        }
        updated[row][col] = updatedNode

        setStops(noStops)
      } else {
        const updatedNode = {
          ...node,
          stop: true,
        }

        updated[row][col] = updatedNode
        updatedStops.push(updatedNode)
        setStops(updatedStops)
      }
      return updated
    }
  }

  const touchStart = (row, col) => {
    console.log(row, col)
  }

  const touchMove = (event) => {}

  const touchEnd = (row, col) => {
    console.log(row, col)
  }

  const mouseEnter = (row, col) => {
    if (!mousePressed) return
    const updatedGrid = updateGrid(row, col)
    setGrid(updatedGrid)
  }

  const mouseDown = (row, col) => {
    const updatedGrid = updateGrid(row, col)
    setGrid(updatedGrid)
    setMousePressed(true)
  }

  const mouseUp = () => {
    setMousePressed(false)
  }

  const clearGrid = () => {
    let grid = initialiseGrid()
    setGrid(grid)
    for (let i = 0; i < grid.length; i++) {
      const row = grid[i]
      for (let j = 0; j < row.length; j++) {
        const node = row[j]
        const element = document.getElementById(`node-${node.row}-${node.col}`)
        if (element.id === `node-${startRow}-${startCol}`) {
          element.className = 'node node-start'
          element.style.backgroundColor = ''
        } else if (element.id === `node-${finishRow}-${finishCol}`) {
          element.className = 'node node-finish'
          element.style.backgroundColor = ''
        } else element.className = 'node'
      }
    }
  }

  const initialiseGrid = () => {
    const grid = []
    for (let row = 0; row < rows; row++) {
      const currentRow = []
      for (let col = 0; col < cols; col++) {
        currentRow.push(createNode(col, row))
      }
      grid.push(currentRow)
    }
    return grid
  }

  const createNode = (col, row) => {
    return {
      col,
      row,
      start: row === startRow && col === startCol,
      finish: row === finishRow && col === finishCol,
      visited: false,
      wall: false,
      distance: 500000,
      previousNode: null,
    }
  }

  const handleVisualise = () => {
    if (animationActive) {
      return
    }
    if (algorithm === '') {
      setNotification('Select an algorithm via the menu.')
      setOpen(true)
    }
    if (algorithm === "Dijkstra's") {
      visualiseDijkstra()
    }
    if (algorithm === 'A*') {
      setNotification('Algorithm is not implemented yet. Come back later!')
      setOpen(true)
    }
  }

  const visualiseDijkstra = () => {
    const start = grid[startRow][startCol]
    const finish = grid[finishRow][finishCol]
    let visited = dijkstra(grid, start, stops)
    let shortestPath = getShortestPath(grid, stops, finish)
    if (visited === undefined) {
      setNotification('No path available. Clear some walls and try again.')
      setOpen(true)
    } else {
      animate(visited, shortestPath)
      setAnimationActive(true)
      setTimeout(() => {
        setAnimationActive(false)
        console.log('done')
      }, visited.length * 10 + shortestPath.length * 50)
    }
  }

  const animate = (visited, shortestPath) => {
    if (visited === undefined) {
      setNotification('No path available. Clear some walls and try again.')
      setOpen(true)
    } else {
      for (let i = 0; i <= visited.length; i++) {
        if (i === visited.length) {
          setTimeout(() => {
            animatePath(shortestPath)
          }, 10 * i)
          return
        }
        setTimeout(() => {
          const node = visited[i]

          const nd = document.getElementById(`node-${node.row}-${node.col}`)
          if (nd.id === `node-${startRow}-${startCol}`) {
            nd.className = 'node node-start node-visited'
          } else if (nd.id === `node-${finishRow}-${finishCol}`) {
            nd.className = 'node node-finish node-visited'
          } else nd.className = 'node node-visited'
        }, 10 * i)
      }
    }
  }

  const animatePath = (shortestPath) => {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const node = shortestPath[i]
        const nd = document.getElementById(`node-${node.row}-${node.col}`)
        if (nd.id === `node-${startRow}-${startCol}`) {
          nd.className = 'node node-start node-path'
        } else if (nd.id === `node-${finishRow}-${finishCol}`) {
          nd.className = 'node node-finish node-path'
        } else nd.className = 'node node-path'
      }, 50 * i)
    }
  }

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Notification
          open={open}
          setOpen={setOpen}
          notification={notification}
        />
        <NavBar
          animationActive={animationActive}
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          visualise={handleVisualise}
          toggleEdit={toggleEdit}
          placeStart={placeStart}
          placeFinish={placeFinish}
          placeStop={placeStop}
          clearGrid={clearGrid}
        />
        <Visualiser
          rows={rows}
          cols={cols}
          mouseDown={mouseDown}
          mouseEnter={mouseEnter}
          mouseUp={mouseUp}
          grid={grid}
          setGrid={setGrid}
          currentAction={currentAction}
          setCurrentAction={setCurrentAction}
          mousePressed={mousePressed}
          setMousePressed={setMousePressed}
          touchStart={touchStart}
          touchMove={touchMove}
          touchEnd={touchEnd}
        />
      </ThemeProvider>
    </div>
  )
}

export default App
