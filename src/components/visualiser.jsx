import * as React from 'react';
import { useEffect, useState } from 'react';
import Node from './node/node';
import './visualiser.css';

import { dijkstra, getShortestPath } from '../algorithms/dijkstra';

const START_COL = 15;
const START_ROW = 5;
const FINISH_COL = 15;
const FINISH_ROW = 45;

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

	const visualise = () => {
		const start = grid[START_ROW][START_COL];
		const finish = grid[FINISH_ROW][FINISH_COL];
		const visited = dijkstra(grid, start, finish);
		const spt = getShortestPath(finish);
		animate(visited, spt);
	};

	const animate = (visited, spt) => {
		for (let i = 0; i <= visited.length; i++) {
			if (i === visited.length) {
				setTimeout(() => {
					animateSpt(spt);
				}, 5 * i);
				return;
			}
			setTimeout(() => {
				const node = visited[i];
				document.getElementById(`node-${node.row}-${node.col}`).className =
					'node node-visited';
			}, 5 * i);
		}
	};

	const animateSpt = (spt) => {
		for (let i = 0; i < spt.length; i++) {
			setTimeout(() => {
				const node = spt[i];
				document.getElementById(`node-${node.row}-${node.col}`).className =
					'node node-path';
			}, 50 * i);
		}
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
