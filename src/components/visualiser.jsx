import * as React from 'react';
import Node from './node/node';
import { rows, cols } from '../contexts/global';

const Visualiser = ({ grid, mousePressed, mouseDown, mouseEnter, mouseUp }) => {
	const style = {
		margin: '100px 0 0',
		display: 'grid',
		justifyContent: 'center',
		gridTemplateColumns: `repeat(${rows}, 40px)`,
		userSelect: 'none',
	};

	return (
		<>
			<div style={style}>
				{grid.map((row, rowIndex) => {
					return (
						<div key={rowIndex}>
							{row.map((node, index) => {
								const { row, col, finish, start, wall, stop } = node;
								return (
									<Node
										key={index}
										col={col}
										row={row}
										finish={finish}
										start={start}
										wall={wall}
										stop={stop}
										mousePressed={mousePressed}
										mouseDown={(row, col) => mouseDown(row, col)}
										mouseEnter={(row, col) => mouseEnter(row, col)}
										mouseUp={mouseUp}
									></Node>
								);
							})}
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Visualiser;
