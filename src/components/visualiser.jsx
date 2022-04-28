import * as React from 'react';
import { useEffect, useState } from 'react';
import Node from './node/node';
import './visualiser.css';

const Visualiser = () => {
	const [grid, setGrid] = useState([]);
	useEffect(() => {
		const grid = initialiseGrid();
		setGrid(grid);
	});

	const createNode = (col, row) => {
		return {
			col,
			row,
		};
	};
	const initialiseGrid = () => {
		const grid = [];
		for (let row = 0; row < 50; row++) {
			const currentRow = [];
			for (let col = 0; col < 20; col++) {
				currentRow.push(createNode(col, row));
			}
			grid.push(currentRow);
		}
		return grid;
	};

	return (
		<>
			<button onClick={() => this.visualizeDijkstra()}>
				Visualize Dijkstra's Algorithm
			</button>
			<div className='grid'>
				{grid.map((row, rowIdx) => {
					return (
						<div key={rowIdx}>
							{row.map((node, nodeIdx) => {
								const { row, col } = node;
								return <Node key={nodeIdx} col={col} row={row}></Node>;
							})}
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Visualiser;
