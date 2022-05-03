export const dijkstra = (grid, start, stops) => {
  let visited = []
  let stopsFound = []
  let finalStop = null
  start.distance = 0
  const unvisited = getAllNodes(grid)
  while (!!unvisited.length) {
    sortByDistance(unvisited)
    const closest = unvisited.shift()
    if (closest.wall) {
      return
    }
    if (closest.distance === Infinity) return visited
    if (closest.stop) {
      stopsFound.push(closest)
    }

    closest.visited = true
    visited.push(closest)
    if (closest.finish) {
      finalStop = closest
    }
    if (finalStop !== null && stopsFound.length === stops.length) {
      return visited
    }
    updateAdjacentNodes(closest, grid)
  }
}

const sortByDistance = (nodes) => {
  nodes.sort((a, b) => a.distance - b.distance)
}

const updateAdjacentNodes = (node, grid) => {
  const unvisitedAdjacentNodes = getUnvisitedAdjacentNode(node, grid)
  if (unvisitedAdjacentNodes.length === 0) {
    return
  } else {
    for (const adjacentNode of unvisitedAdjacentNodes) {
      adjacentNode.distance = node.distance + 1
      adjacentNode.previousNode = node
    }
  }
}

const getUnvisitedAdjacentNode = (node, grid) => {
  const adjacentNodes = []
  const { col, row } = node
  if (row > 0) adjacentNodes.push(grid[row - 1][col])
  if (row < grid.length - 1) adjacentNodes.push(grid[row + 1][col])
  if (col > 0) adjacentNodes.push(grid[row][col - 1])
  if (col < grid[0].length - 1) adjacentNodes.push(grid[row][col + 1])
  return adjacentNodes.filter((adjacent) => !adjacent.visited && !adjacent.wall)
}

const getAllNodes = (grid) => {
  const nodes = []
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node)
    }
  }
  return nodes
}

export const getShortestPath = (grid, stops, finish) => {
  let currentPaths = []
  let masterRoute = []

  // handle stops
  for (let i = 0; i < stops.length; i++) {
    const path = []
    let current = stops[i]
    while (current !== null) {
      path.unshift(current)
      current = current.previousNode
    }
    currentPaths.push(path)
  }

  // case for no stops and returning finish
  if (stops.length < 1) {
    const path = []
    let current = finish
    while (current !== null) {
      path.unshift(current)
      current = current.previousNode
    }
    masterRoute = [...path, ...masterRoute]
    console.log(masterRoute)
    return masterRoute
  }

  // else we filter stops and get a new grid to work out next route

  currentPaths.sort((a, b) => a.length - b.length)
  masterRoute = [...currentPaths[0], ...masterRoute]

  let lastNode = masterRoute[masterRoute.length - 1]

  grid.forEach((group) =>
    group.forEach((cell) => {
      if (cell === lastNode) {
        cell.stop = false
      }
    })
  )

  const updatedStart = lastNode
  const updatedStops = stops.filter((stop) => stop !== lastNode)

  let remainder = dijkstra(grid, updatedStart, updatedStops)

  getShortestPath(grid, updatedStops, finish)

  return masterRoute
}
