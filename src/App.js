import * as React from 'react';
import Visualiser from './components/visualiser';
import NavBar from './components/nav';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

function App() {
	return (
		<>
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<NavBar />
				<Visualiser />
			</ThemeProvider>
		</>
	);
}

export default App;
