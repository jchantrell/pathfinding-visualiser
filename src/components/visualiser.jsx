import * as React from 'react';
import { useEffect } from 'react';
import Node from './node/node';
import {
	startRow,
	startCol,
	finishRow,
	finishCol,
	rows,
	cols,
} from '../contexts/global';

const Visualiser = ({
	grid,
	setGrid,
	mousePressed,
	setMousePressed,
	mouseDown,
	mouseEnter,
	mouseUp,
}) => {
	const style = {
		margin: '100px 0 0',
		display: 'grid',
		justifyContent: 'center',
		gridTemplateColumns: `repeat(${rows}, 40px)`,
	};

	return (
		<>
			<div style={style}>
				{grid.map((row, rowIndex) => {
					return (
						<div key={rowIndex}>
							{row.map((node, index) => {
								const { row, col, finish, start, wall } = node;
								return (
									<Node
										key={index}
										col={col}
										row={row}
										finish={finish}
										start={start}
										wall={wall}
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
