import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGOUT } from '../../redux/actions';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MapIcon from '@mui/icons-material/Map';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';

const Navbar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const user = useSelector(state => state.userReducer.user);
    const matches = useMediaQuery('(max-width:576px)');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    const handleLogout = () => dispatch({ type: LOGOUT });

    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

    const setPage = (page) => {
        navigate(`/${page}`);
        setIsDrawerOpen(false);
    }

    const backHome = () => navigate('/');
    
    return (
        <Box sx={{ position: 'fixed', width: '100vw', zIndex: 999 }}>
            <AppBar sx={{ display:'flex', justifyContent:'center', height: '50px', width:'100%' }} position="static">
                <Toolbar>
                    <Box sx={{ display:'flex', alignItems:'center', flexGrow: 1 }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 1 }}
                        >
                            <MenuIcon onClick={toggleDrawer} sx={{ width:26, height:26 }}/>
                        </IconButton>
                        <Typography onClick={backHome} variant="h5" component="div" sx={{ border:'1px solid', cursor:'pointer', fontFamily:'Montserrat', fontWeight:'400', userSelect:'none', fontSize:'17px', padding:'5px 15px', borderRadius:'15px' }}>
                            Dark Mall
                        </Typography>
                    </Box>
                    <Typography omponent="div" sx={{ display: matches ? 'none' : 'block', fontFamily:'Roboto Mono', mr: 1.5, fontSize:'16px', userSelect:'none', letterSpacing:'-1px' }}>
                        {user?.name}
                    </Typography>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar src={user?.avatar} sx={{ border:'1px solid white', width: 32, height: 32 }}>{user?.name[0]}</Avatar>
                        </IconButton>
                    </Tooltip>
                </Toolbar>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'hidden',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.8,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 15,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={() => setPage('profile')}>
                        <Avatar sx={{ height:32, width:32, cursor:'pointer' }} alt="user-avatar" src={user?.avatar}>
                            {user?.name[0]}
                        </Avatar>
                        <Typography sx={{fontFamily:'Roboto Mono', fontSize:'16px', ml: 1, letterSpacing:'-1px'}}>
                            {user?.name}
                        </Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add another account
                    </MenuItem>
                    <MenuItem onClick={() => setPage('settings')}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </AppBar>
            <Drawer open={isDrawerOpen} onClose={toggleDrawer}>
                <Box role="presentation">
                    <List>
                        <ListItem disablePadding onClick={() => setPage('profile')}>
                            <ListItemButton sx={{pr: 5}}>
                                <ListItemIcon>
                                    <AccountCircleIcon sx={{width:36, height:36}} />
                                </ListItemIcon>
                                <Typography sx={{ fontSize:'18px', fontWeight:'500'}}>
                                    Profile
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem disablePadding onClick={() => setPage('settings')}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <SettingsIcon sx={{width:22, height:22}} />
                                </ListItemIcon>
                                <Typography sx={{ fontSize:'12px', fontWeight:'500'}}>
                                    Settings
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding onClick={() => setPage('map')}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <MapIcon sx={{ width:22, height:22 }} />
                                </ListItemIcon>
                                <Typography sx={{ fontSize:'12px', fontWeight:'500'}}>
                                    Map
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}

export default Navbar;