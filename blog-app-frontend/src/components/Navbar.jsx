import { Close, Menu } from '@mui/icons-material'
import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { logout } from '../util/BlogAppUtil';
import { useNavigate } from 'react-router';
import { UserContextProvider } from '../App';

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContextProvider);
  const [mobileMode, setMobileMode] = useState(false);
  let navigate = useNavigate();

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display={'flex'}>
          <Typography variant='h4'>BlogApp</Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          {isLoggedIn && <Button color="inherit" onClick={() => navigate("/home")} >Home</Button>}
          {isLoggedIn && <Button color="inherit" onClick={() => {
            logout();
            setIsLoggedIn(false);
            navigate("/");
          }}>Logout</Button>}
        </Box>
        <IconButton sx={{ display: { base: "block", md: "none" } }} color="inherit" onClick={() => setMobileMode(true)}>
          <Menu />
        </IconButton>
        <MobileHeader open={mobileMode} setOpen={setMobileMode} />
      </Toolbar>
    </AppBar>

  )
}

const MobileHeader = ({ open, setOpen }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContextProvider);
  let navigate = useNavigate();

  return (
    <Drawer
      role="presentation"
      open={open}
      onClose={() => setOpen(false)}
      ModalProps={{
        keepMounted: true,
      }}
      anchor="right"
    >
      <Box width={250}>
        <IconButton sx={{ width: "fit-content", ml: "auto" }} onClick={() => setOpen(false)}>
          <Close />
        </IconButton>
        <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
          <Typography variant='h4'>BlogApp</Typography>
          {isLoggedIn && <Button color="inherit" onClick={() => navigate("/home")} >Home</Button>}
          {isLoggedIn && <Button color="inherit" onClick={() => {
            logout();
            setIsLoggedIn(false);
            navigate("/");
          }}>Logout</Button>}
        </Box>
      </Box>
    </Drawer>
  )
}

