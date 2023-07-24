import * as React from 'react';
import CssBaseline from "@mui/material/CssBaseline";

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { makeRequestAuth } from '~/axios';

export default function Account(props) {
    const {name, avatar, setMinus, currentUser, minus} = props
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMinus(true)
  };
  const handleClose = () => {
    setAnchorEl(null);
    setMinus(false)
  };
  const handleLogout = async()=>{
    setAnchorEl(null);
    setMinus(false);
    const res = await makeRequestAuth.post("auth/logout",{
        withCredentials:true,
        credentials: 'include'
    });
    localStorage.removeItem('userPetFamily');
    navigate('/login');
  }
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            >
              <span className='text-[#fff] text-[14px] px-2'>{name}</span>
            <Avatar sx={{ width: 40, height: 40  }} src={avatar}/>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
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
              right: 14,
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
            <Link to={`/profile/${currentUser.idUser}`}>
                <MenuItem onClick={handleClose}>
                        <Avatar src={avatar}/> Trang cá nhân
                </MenuItem>
            </Link>
            <Link to={`/myAccount`}>
                <MenuItem onClick={handleClose}>
                        <Avatar /> Tài khoản của tôi
                </MenuItem>
            </Link>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Cài đặt
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}