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

export const getShortestPath = (finish, stops, grid) => {
  let route = []
  const paths = []
  for (let i = 0; i < stops.length; i++){
    const shortestPath = []
    let current = stops[i]
    while (current !== null) {
      shortestPath.unshift(current)
      current = current.previousNode
    }
    paths.push(shortestPath)
  } 
  if (paths.length >= 1){
    const byLength = paths.sort((a, b) => a.length - b.length)
    route = [...byLength[0], ...route]
    const updatedStops = stops.filter(stop => stop !== route[route.length-1])
    byLength.shift()
    const remaining = dijkstra(grid, route[route.length-1], updatedStops)
    const more = getShortestPath(finish, updatedStops, grid)
    console.log(remaining, more)
  } else {
    const shortestPath = []
    let current = finish
    while (current !== null) {
      shortestPath.unshift(current)
      current = current.previousNode
    }
    route = [...shortestPath, ...route]
  }
  console.log(route)
  return route

}

const getRemainingPaths = (grid, start, stops) => {
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
