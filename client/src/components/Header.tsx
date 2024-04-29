import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signOut } from "../api-helper";

import { AppBar, Box, Button, Container, Divider, MenuItem, Toolbar, Typography, Drawer } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/images/logo.png';
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('An error occurred:', error)
    }
  };

  return (
    <>
      <div id="header">
        <AppBar
          position="fixed"
          sx={{
            boxShadow: 0,
            bgcolor: 'transparent',
            backgroundImage: 'none',
            mt: 2,
          }} >
          <Container maxWidth="lg">
            <Toolbar
              variant="regular"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
                borderRadius: '999px',
                bgcolor: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(24px)',
                maxHeight: 40,
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
              }} >
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  ml: '-18px',
                  px: 0,
                  height: '60px',
                }} >
                <img src={logo} alt="logo for Oregon Mycological Society" style={{ maxHeight: '100%', maxWidth: '100%' }} />
              </Box>

              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <MenuItem
                  component={Link}
                  to="/dashboard"
                  sx={{ py: '6px', px: '12px' }} >
                  <Typography variant="body2" color="text.primary">dashboard</Typography>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/trips"
                  sx={{ py: '6px', px: '12px' }} >
                  <Typography variant="body2" color="text.primary">trips</Typography>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/resources"
                  sx={{ py: '6px', px: '12px' }} >
                  <Typography variant="body2" color="text.primary">resources</Typography>
                </MenuItem>
              </Box>

              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  gap: 0.5,
                  alignItems: 'center',
                }} >
                <Button color="success"
                  variant="contained"
                  size="small"
                  onClick={handleLogout}>Sign out</Button>
              </Box>

              <Box sx={{ display: { sm: '', md: 'none' } }}>
                <Button
                  variant="text"
                  color="success"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                  sx={{ minWidth: '30px', p: '4px' }}>
                  <MenuIcon />
                </Button>
                <Drawer
                  anchor="right"
                  open={open}
                  onClose={toggleDrawer(false)}>
                  <Box
                    sx={{
                      minWidth: '60vw',
                      p: 2,
                      backgroundColor: 'background.paper',
                      flexGrow: 1,
                    }} >
                    <MenuItem
                      component={Link}
                      to="/dashboard">
                      <Typography>dashboard</Typography>
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/trips"
                    >
                      <Typography>trips</Typography>
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/resources">
                      <Typography>resources</Typography>
                    </MenuItem>

                    <Divider />
                    <MenuItem>
                      <Button
                        color="success"
                        variant="contained"
                        size="small"
                        onClick={handleLogout}>Sign out</Button>
                    </MenuItem>
                  </Box>
                </Drawer>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </>
  )
}
export default Header;