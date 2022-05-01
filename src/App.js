import * as React from 'react';
import { useEffect } from 'react';
import Visualiser from './components/visualiser';
import NavBar from './components/nav';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { dijkstra, getShortestPath } from './algorithms/dijkstra';
import { cols, rows } from './contexts/global';
import { StackedBarChartSharp } from '@mui/icons-material';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

function App() {
	const [algorithm, setAlgorithm] = useState(`Dijkstra's`);
	const [grid, setGrid] = useState([]);
	const [mousePressed, setMousePressed] = useState(false);
	const [currentAction, setCurrentAction] = useState('edit');
	const [stops, setStops] = useState([]);
	const [startRow, setStartRow] = useState(4);
	const [startCol, setStartCol] = useState(10);
	const [finishRow, setFinishRow] = useState(25);
	const [finishCol, setFinishCol] = useState(10);

	useEffect(() => {
		const grid = initialiseGrid();
		setGrid(grid);
	}, []);

	const toggleEdit = () => {
		setCurrentAction('edit');
	};

	const placeStart = () => {
		setCurrentAction('placeStart');
	};

	const placeStop = () => {
		setCurrentAction('placeStop');
	};

	const placeFinish = () => {
		setCurrentAction('placeFinish');
	};

	const updateGrid = (row, col) => {
		const updated = grid.slice();
		const node = updated[row][col];

		// add/remove walls
		if (currentAction === 'edit') {
			const updatedNode = {
				...node,
				wall: !node.wall,
			};
			updated[row][col] = updatedNode;
			return updated;
		}

		// change start location
		if (currentAction === 'placeStart') {
			const previousStart = document.getElementById(
				`node-${startRow}-${startCol}`
			);

			if (node === updated[startRow][startCol]) {
				return updated;
			} else {
				updated[startRow][startCol].start = false;

				setStartRow(row);
				setStartCol(col);
				previousStart.className = 'node';

				const updatedNode = {
					...node,
					start: true,
				};

				updated[row][col] = updatedNode;
				return updated;
			}
		}

		// change finish location
		if (currentAction === 'placeFinish') {
			const previousFinish = document.getElementById(
				`node-${finishRow}-${finishCol}`
			);

			updated[finishRow][finishCol].finish = false;
			setFinishRow(row);
			setFinishCol(col);
			previousFinish.className = 'node';

			const updatedNode = {
				...node,
				finish: !node.finish,
			};

			updated[row][col] = updatedNode;
			return updated;
		}

		// place stop
		if (currentAction === 'placeStop') {
			const updatedNode = {
				...node,
				stop: !node.stop,
			};

			updated[row][col] = updatedNode;
			const updatedStops = [...stops];
			updatedStops.push(updatedNode);
			setStops(updatedStops);
			return updated;
		}
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

	const clearGrid = () => {
		let grid = initialiseGrid();
		setGrid(grid);
		for (let i = 0; i < grid.length; i++) {
			const row = grid[i];
			for (let j = 0; j < row.length; j++) {
				const node = row[j];
				const element = document.getElementById(`node-${node.row}-${node.col}`);
				if (element.id === `node-${startRow}-${startCol}`) {
					element.className = 'node node-start';
					element.style.backgroundColor = '';
				} else if (element.id === `node-${finishRow}-${finishCol}`) {
					element.className = 'node node-finish';
					element.style.backgroundColor = '';
				} else element.className = 'node';
			}
		}
	};

	const initialiseGrid = () => {
		const grid = [];
		for (let row = 0; row < rows; row++) {
			const currentRow = [];
			for (let col = 0; col < cols; col++) {
				currentRow.push(createNode(col, row));
			}
			grid.push(currentRow);
		}
		return grid;
	};

	const createNode = (col, row) => {
		return {
			col,
			row,
			start: row === startRow && col === startCol,
			finish: row === finishRow && col === finishCol,
			visited: false,
			wall: false,
			distance: 500000,
			previousNode: null,
		};
	};

	const visualise = () => {
		const start = grid[startRow][startCol];
		const finish = grid[finishRow][finishCol];
		const visited = dijkstra(grid, start, finish, stops);
		const spt = getShortestPath(finish, stops);
		animate(visited, spt);
	};

	const animate = (visited, spt) => {
		for (let i = 0; i <= visited.length; i++) {
			if (i === visited.length) {
				setTimeout(() => {
					animateSpt(spt);
				}, 10 * i);
				return;
			}
			setTimeout(() => {
				const node = visited[i];
				const nd = document.getElementById(`node-${node.row}-${node.col}`);
				if (
					nd.id === `node-${startRow}-${startCol}` ||
					nd.id === `node-${finishRow}-${finishCol}`
				) {
					nd.style.backgroundColor = 'rgba(192, 132, 252, 0.9)';
				} else nd.className = 'node node-visited';
			}, 10 * i);
		}
	};

	const animateSpt = (spt) => {
		for (let i = 0; i < spt.length; i++) {
			setTimeout(() => {
				const node = spt[i];
				const nd = document.getElementById(`node-${node.row}-${node.col}`);
				if (
					nd.id === `node-${startRow}-${startCol}` ||
					nd.id === `node-${finishRow}-${finishCol}`
				) {
					nd.style.backgroundColor = 'rgba(253, 224, 71, 1)';
				} else nd.className = 'node node-path';
			}, 50 * i);
		}
	};

	return (
		<>
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<NavBar
					algorithm={algorithm}
					setAlgorithm={setAlgorithm}
					visualise={visualise}
					toggleEdit={toggleEdit}
					placeStart={placeStart}
					placeFinish={placeFinish}
					placeStop={placeStop}
					clearGrid={clearGrid}
				/>
				<Visualiser
					mouseDown={mouseDown}
					mouseEnter={mouseEnter}
					mouseUp={mouseUp}
					grid={grid}
					setGrid={setGrid}
					currentAction={currentAction}
					setCurrentAction={setCurrentAction}
					mousePressed={mousePressed}
					setMousePressed={setMousePressed}
				/>
			</ThemeProvider>
		</>
	);
}

export default App;
