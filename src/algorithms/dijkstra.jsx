export const dijkstra = (grid, start, finish, stops) => {
  console.log(start, stops)
  // recursively get dist to all stops if stops.length >= 1
  // get shortest dist stop
  // from that stop, check dist to all remaining stops and pick shortest
  // repeat until no stops left then travel to final stop
  // keep steps in ordered list
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

export const getShortestPath = (finish, stops) => {
  console.log(stops, finish)

  const shortestPath = []
  let current = finish
  while (current !== null) {
    shortestPath.unshift(current)
    current = current.previousNode
  }
  return shortestPath
}
