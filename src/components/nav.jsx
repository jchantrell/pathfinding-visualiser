import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';

import FlagIcon from '@mui/icons-material/Flag';
import HikingIcon from '@mui/icons-material/Hiking';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

const NavBar = ({
	algorithm,
	setAlgorithm,
	visualise,
	toggleEdit,
	placeStart,
	placeFinish,
	placeStop,
	clearGrid,
}) => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
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
						<MenuItem onClick={handleClose}>Dijkstra's Algorithm</MenuItem>

						<MenuItem onClick={handleClose}>A* Search Algorithm</MenuItem>
					</Menu>

					<Button
						sx={{ margin: '0 40px 0 40px', color: 'black' }}
						color='inherit'
						variant='contained'
						onClick={visualise}
					>
						Visualise {algorithm} algorithm
					</Button>

					<IconButton
						onClick={toggleEdit}
						size='large'
						edge='start'
						color='inherit'
						sx={{ mr: 2 }}
					>
						<EditIcon />
					</IconButton>

					<IconButton
						onClick={placeStart}
						size='large'
						edge='start'
						color='inherit'
						sx={{ mr: 2 }}
					>
						<HikingIcon />
					</IconButton>

					<IconButton
						onClick={placeStop}
						size='large'
						edge='start'
						color='inherit'
						sx={{ mr: 2 }}
					>
						<EmojiPeopleIcon />
					</IconButton>

					<IconButton
						onClick={placeFinish}
						size='large'
						edge='start'
						color='inherit'
						sx={{ mr: 2 }}
					>
						<FlagIcon />
					</IconButton>

					<IconButton
						onClick={clearGrid}
						size='large'
						edge='start'
						color='inherit'
						sx={{ mr: 2 }}
					>
						<ClearIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default NavBar;