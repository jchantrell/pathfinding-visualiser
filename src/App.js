import * as React from 'react';
import Visualiser from './components/visualiser';
import NavBar from './components/nav';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { dijkstra, getShortestPath } from './algorithms/dijkstra';

const START_COL = 15;
const START_ROW = 5;
const FINISH_COL = 15;
const FINISH_ROW = 45;

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

function App() {
	const [grid, setGrid] = useState([]);

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
				}, 10 * i);
				return;
			}
			setTimeout(() => {
				const node = visited[i];
				document.getElementById(`node-${node.row}-${node.col}`).className =
					'node node-visited';
			}, 10 * i);
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
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<NavBar visualise={visualise} />
				<Visualiser grid={grid} setGrid={setGrid} />
			</ThemeProvider>
		</>
	);
}

export default App;
