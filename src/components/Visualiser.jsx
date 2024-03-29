import * as React from 'react'
import { useEffect, useState } from 'react'
import Node from './node/Node'
import { dijkstra, getShortestPath } from '../algorithms/dijkstra'
import { useCallback } from 'react'

const Visualiser = (props) => {
  let colsAmount,
    rowsAmount = 0
  const [grid, setGrid] = useState([])
  const [startRow, setStartRow] = useState(null)
  const [startCol, setStartCol] = useState(null)
  const [finishRow, setFinishRow] = useState(null)
  const [finishCol, setFinishCol] = useState(null)
  const [stops, setStops] = useState([])
  const [animationActive, setAnimationActive] = useState(false)
  const [gridAlreadyAnimated, setGridAlreadyAnimated] = useState(false)
  const [mousePressed, setMousePressed] = useState(false)

  if (document.getElementById('wrapper') !== null) {
    colsAmount = Math.floor(
      document.getElementById('wrapper').clientHeight / 50
    )
    rowsAmount = Math.floor(document.getElementById('wrapper').clientWidth / 50)
  }

  window.onresize = () => {
    setStartCol(Math.floor(colsAmount / 2))
    setStartRow(Math.floor(2))
    setFinishCol(Math.floor(colsAmount / 2))
    setFinishRow(Math.floor(rowsAmount - 3))

    const grid = initialiseGrid()
    setGrid(grid)
  }

  const style = {
    margin: '10px',
    height: '100%',
    display: 'grid',
    gridTemplateColumns: `repeat(${rowsAmount}, 1fr)`,
    gridTemplateRows: `repeat(${rowsAmount}, 1fr)`,

    userSelect: 'none',
    touchAction: 'none',
  }

  const mouseEnter = (row, col) => {
    if (!mousePressed || animationActive) return
    const updatedGrid = updateGrid(row, col)
    setGrid(updatedGrid)
  }

  const mouseDown = (row, col) => {
    if (animationActive) return
    const updatedGrid = updateGrid(row, col)
    setGrid(updatedGrid)
    setMousePressed(true)
  }

  const mouseUp = () => {
    setMousePressed(false)
  }

  const updateGrid = (row, col) => {
    const updated = grid.slice()
    const node = updated[row][col]

    // add/remove walls
    if (props.currentAction === 'edit') {
      const updatedNode = {
        ...node,
        wall: !node.wall,
      }
      updated[row][col] = updatedNode
      return updated
    }

    // change start location
    if (props.currentAction === 'start') {
      const previousStart = document.getElementById(
        `node-${startRow}-${startCol}`
      )
      console.log(previousStart)

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
    if (props.currentAction === 'finish') {
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
    if (props.currentAction === 'stop') {
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

  const clearGrid = () => {
    if (animationActive) return
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

  const createNode = useCallback(
    (col, row) => {
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
    },
    [startCol, startRow, finishCol, finishRow]
  )

  const initialiseGrid = useCallback(() => {
    const grid = []
    for (let row = 0; row < rowsAmount; row++) {
      const currentRow = []
      for (let col = 0; col < colsAmount; col++) {
        currentRow.push(createNode(col, row))
      }
      grid.push(currentRow)
    }

    return grid
  }, [colsAmount, rowsAmount, createNode])

  const clearVisuals = () => {
    for (let i = 0; i < grid.length; i++) {
      let row = grid[i]
      for (let j = 0; j < row.length; j++) {
        const node = row[j]
        const nd = document.getElementById(`node-${node.row}-${node.col}`)
        if (nd.classList.contains('node-wall')) {
          nd.className = 'node node-wall'
        } else if (nd.id === `node-${startRow}-${startCol}`) {
          nd.className = 'node node-start'
        } else if (nd.id === `node-${finishRow}-${finishCol}`) {
          nd.className = 'node node-finish'
        } else nd.className = 'node'
      }
    }
    setGridAlreadyAnimated(false)
  }

  const handleVisualise = () => {
    if (animationActive) {
      return
    }
    if (gridAlreadyAnimated) {
      clearVisuals()
    }
    if (props.algorithm === '') {
      props.showNotification('Select an algorithm via the menu.')
    }
    if (props.algorithm === "Dijkstra's") {
      visualiseDijkstra()
    }
    if (props.algorithm === 'A*') {
      props.showNotification(
        'Algorithm is not implemented yet. Come back later!'
      )
    }
  }

  const visualiseDijkstra = () => {
    const start = grid[startRow][startCol]
    const finish = grid[finishRow][finishCol]
    let visited = dijkstra(grid, start, stops)
    let shortestPath = getShortestPath(grid, stops, finish)
    if (visited === undefined) {
      props.showNotification(
        'No path available. Clear some walls and try again.'
      )
    } else {
      animate(visited, shortestPath)
      setGridAlreadyAnimated(true)
      setAnimationActive(true)
      setTimeout(() => {
        setAnimationActive(false)
      }, visited.length * 10 + shortestPath.length * 50)
    }
  }

  const animate = (visited, shortestPath) => {
    if (visited === undefined) {
      props.showNotification(
        'No path available. Clear some walls and try again.'
      )
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
          } else if (nd.classList.contains('node-stop')) {
            nd.className = 'node node-stop node-visited'
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
        } else if (nd.classList.contains('node-stop')) {
          nd.className = 'node node-stop node-path'
        } else nd.className = 'node node-path'
      }, 50 * i)
    }
  }

  useEffect(() => {
    setStartCol(Math.floor(colsAmount / 2))
    setStartRow(Math.floor(2))
    setFinishCol(Math.floor(colsAmount / 2))
    setFinishRow(Math.floor(rowsAmount - 3))
  }, [colsAmount, rowsAmount])

  useEffect(() => {
    const grid = initialiseGrid()
    setGrid(grid)
  }, [initialiseGrid])

  useEffect(() => {
    if (props.clearGrid) {
      clearGrid()
      props.setClearGrid(false)
    }
    if (props.visualise) {
      handleVisualise()
    }
  })

  return (
    <>
      <div style={style} id="wrapper">
        {grid.map((row, rowIndex) => {
          return (
            <div key={rowIndex}>
              {row.map((node, index) => {
                const { row, col, finish, start, wall, stop } = node
                return (
                  <Node
                    key={index}
                    col={col}
                    cols={colsAmount}
                    row={row}
                    rows={rowsAmount}
                    finish={finish}
                    start={start}
                    wall={wall}
                    stop={stop}
                    mousePressed={mousePressed}
                    mouseDown={(row, col) => mouseDown(row, col)}
                    mouseEnter={(row, col) => mouseEnter(row, col)}
                    mouseUp={mouseUp}
                  ></Node>
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Visualiser
