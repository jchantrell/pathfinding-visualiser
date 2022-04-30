import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import CookieIcon from '@mui/icons-material/Cookie';
import { Brush } from '@mui/icons-material';

const NavBar = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [algorithm, setAlgorithm] = useState(`Dijkstra's`);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		setAnchorEl(null);
	};

	return (
		<Box
			sx={{
				flexGrow: 1,
				alignItems: 'center',
			}}
		>
			<AppBar position='static'>
				<Toolbar sx={{ width: '100%' }}>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{ mr: 2, justifySelf: 'flex-start' }}
						aria-controls={open ? 'basic-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}
					>
						<MenuIcon />
					</IconButton>

					<Menu
						id='basic-menu'
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button',
						}}
					>
						<MenuItem onClick={handleClose}>Home</MenuItem>

						<MenuItem onClick={handleClose}>Users</MenuItem>
					</Menu>

					<Button
						sx={{ margin: '0 40px 0 40px', color: 'black' }}
						color='inherit'
						variant='contained'
					>
						Visualise {algorithm} algorithm
					</Button>

					<IconButton size='large' edge='start' color='inherit' sx={{ mr: 2 }}>
						<Brush />
					</IconButton>

					<IconButton size='large' edge='start' color='inherit' sx={{ mr: 2 }}>
						<CookieIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default NavBar;
