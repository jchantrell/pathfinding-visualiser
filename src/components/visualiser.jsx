import * as React from 'react';
import { useEffect, useState } from 'react';
import Node from './node/node';

import { dijkstra, getShortestPath } from '../algorithms/dijkstra';

const START_COL = 15;
const START_ROW = 5;
const FINISH_COL = 15;
const FINISH_ROW = 45;

const Visualiser = ({ grid, setGrid }) => {
	const [mousePressed, setMousePressed] = useState(false);

	useEffect(() => {
		const grid = initialiseGrid();
		setGrid(grid);
	}, []);

	const style = {
		margin: '100px 0 0',
		display: 'grid',
		justifyContent: 'center',
		gridTemplateColumns: 'repeat(50, 25px)',
	};

	const updateGrid = (row, col) => {
		const updated = grid.slice();
		const node = updated[row][col];
		const updatedNode = {
			...node,
			wall: !node.wall,
		};
		updated[row][col] = updatedNode;
		return updated;
	};

	const mouseEnter = (row, col) => {
		if (!mousePressed) return;
		const updatedGrid = updateGrid(row, col);
		setGrid(updatedGrid);
	};

	const mouseDown = (row, col) => {
		const updatedGrid = updateGrid(row, col);
		setGrid(updatedGrid);
		setMousePressed(true);
	};

	const mouseUp = () => {
		setMousePressed(false);
	};

	const createNode = (col, row) => {
		return {
			col,
			row,
			start: row === START_ROW && col === START_COL,
			finish: row === FINISH_ROW && col === FINISH_COL,
			visited: false,
			wall: false,
			distance: 500000,
			previousNode: null,
		};
	};

	const initialiseGrid = () => {
		const grid = [];
		for (let row = 0; row < 50; row++) {
			const currentRow = [];
			for (let col = 0; col < 30; col++) {
				currentRow.push(createNode(col, row));
			}
			grid.push(currentRow);
		}
		return grid;
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
