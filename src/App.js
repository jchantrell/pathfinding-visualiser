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
	const [grid, setGrid] = useState([]);

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
				<NavBar visualise={visualise} />
				<Visualiser grid={grid} setGrid={setGrid} />
			</ThemeProvider>
		</>
	);
}

export default App;
