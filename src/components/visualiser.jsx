import * as React from 'react'
import Node from './node/node'

const Visualiser = ({
  grid,
  mousePressed,
  mouseDown,
  mouseEnter,
  mouseUp,
  touchStart,
  touchEnd,
  touchMove,
  rows,
  cols,
}) => {
  const desktopStyle = {
    height: '100%',
    margin: '20px 0px 20px 0',
    display: 'grid',
    justifyContent: 'center',
    alignContent: 'center',
    gridTemplateColumns: `repeat(${rows}, ${rows}px)`,
    userSelect: 'none',
    touchAction: 'none',
  }

  return (
    <>
      <div style={desktopStyle}>
        {grid.map((row, rowIndex) => {
          return (
            <div key={rowIndex}>
              {row.map((node, index) => {
                const { row, col, finish, start, wall, stop } = node
                return (
                  <Node
                    key={index}
                    col={col}
                    cols={cols}
                    row={row}
                    rows={rows}
                    finish={finish}
                    start={start}
                    wall={wall}
                    stop={stop}
                    mousePressed={mousePressed}
                    mouseDown={(row, col) => mouseDown(row, col)}
                    mouseEnter={(row, col) => mouseEnter(row, col)}
                    mouseUp={mouseUp}
                    touchStart={touchStart}
                    touchMove={touchMove}
                    touchEnd={touchEnd}
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
