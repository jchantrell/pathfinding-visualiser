import * as React from 'react';
import Visualiser from './components/visualiser';
import NavBar from './components/nav';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { dijkstra, getShortestPath } from './algorithms/dijkstra';

import { startRow, startCol, finishRow, finishCol } from './contexts/global';

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

	const clearGrid = () => {
		for (let i = 0; i < grid.length; i++) {
			const row = grid[i];
			console.log(row);
			for (let j = 0; j < row.length; j++) {
				const node = row[j];
				const element = document.getElementById(`node-${node.row}-${node.col}`);

				console.log(element);

				if (element.id === `node-${startRow}-${startCol}`) {
					element.className = 'node node-start';
				} else if (element.id === `node-${finishRow}-${finishCol}`) {
					element.className = 'node node-finish';
				} else element.className = 'node';
			}
		}
	};

	const visualise = () => {
		const start = grid[startRow][startCol];
		const finish = grid[finishRow][finishCol];
		const visited = dijkstra(grid, start, finish);
		const spt = getShortestPath(finish);
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
