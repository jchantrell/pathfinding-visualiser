import * as React from 'react';
import { useEffect, useState } from 'react';
import Node from './node/node';
import './visualiser.css';

const START_NODE_COL = 1;
const START_NODE_ROW = 1;
const FINISH_NODE_COL = 20;
const FINISH_NODE_ROW = 1;

const Visualiser = () => {
	const [grid, setGrid] = useState([]);
	const [mousePressed, setMousePressed] = useState(false);

	useEffect(() => {
		const grid = initialiseGrid();
		setGrid(grid);
	}, []);

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
			<div className='grid'>
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
