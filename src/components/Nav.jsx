import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import EditIcon from '@mui/icons-material/Edit'
import ClearIcon from '@mui/icons-material/Clear'
import Tooltip from '@mui/material/Tooltip'

import FlagIcon from '@mui/icons-material/Flag'
import HikingIcon from '@mui/icons-material/Hiking'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'

const NavBar = ({
  startVisualisation,
  attemptClearGrid,
  algorithm,
  setAlgorithm,
  setCurrentAction,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleVisualise = () => {
    startVisualisation()
  }

  const handleMode = (mode) => {
    setCurrentAction(mode)
  }

  const handleClear = () => {
    attemptClearGrid()
  }

  let visualiseButtonText = `Visualise ${algorithm}`

  if (window.innerWidth < 800) {
    visualiseButtonText = 'Go'
  }

  return (
    <Box
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        position: 'sticky',
      }}
    >
      <AppBar position="static">
        <Toolbar sx={{ width: '100%' }}>
          <Tooltip title="Select Algorithm">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, justifySelf: 'flex-start' }}
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem
              onClick={() => {
                setAlgorithm("Dijkstra's")
                handleClose()
              }}
            >
              Dijkstra's Algorithm
            </MenuItem>

            <MenuItem
              onClick={() => {
                setAlgorithm('A*')
                handleClose()
              }}
            >
              A* Search Algorithm
            </MenuItem>
          </Menu>

          <Tooltip title="Visualise Algorithm">
            <Button
              sx={{ color: 'black' }}
              color="inherit"
              variant="contained"
              onClick={() => {
                handleVisualise()
              }}
            >
              {visualiseButtonText}
            </Button>
          </Tooltip>

          <Tooltip title="Place and Remove Walls">
            <IconButton
              onClick={() => {
                handleMode('edit')
              }}
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2, ml: 1 }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Place Start Point">
            <IconButton
              onClick={() => {
                handleMode('start')
              }}
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <HikingIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Place Stop">
            <IconButton
              onClick={() => {
                handleMode('stop')
              }}
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <EmojiPeopleIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Place Finish Point">
            <IconButton
              onClick={() => {
                handleMode('finish')
              }}
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <FlagIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Clear Grid">
            <IconButton
              onClick={() => {
                handleClear()
              }}
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
