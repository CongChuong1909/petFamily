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
import { Link } from 'react-router-dom';
import { Badge, CardHeader, Skeleton, Tab, Tabs } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { makeRequest } from '~/axios';
import { useQuery } from '@tanstack/react-query';
import NotificationItem from './NotificationItem';
export default function Notification(props) {
    const {setMinus} = props
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState('all');
  const [listPost, setListPost] = React.useState([]);
  const [listFriend, setListFriend] = React.useState([]);
  const [listSystem, setListSystem] = React.useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMinus(true)
  };
  const handleClose = () => {
    setAnchorEl(null);
    setMinus(false)
  };
    const notiFetch = useQuery({
        queryKey: ["notification"],
        queryFn: async () => {
        const res = await makeRequest.get(`/notification`);
        
        return res.data;
        },
    });

    React.useEffect(()=>{
        if(notiFetch.isSuccess)
        {
            notiFetch.data.map((item)=>{
                if(item.type === 'post')
                    setListPost((pre)=>[...pre, item])
                if(item.type === 'friend')
                    setListFriend((pre)=>[...pre, item])
                if(item.type === 'system')
                setListSystem((pre)=>[...pre, item])
            })
        }
        
    }, [notiFetch.isSuccess, notiFetch.data])
    const filteredNotiFetch = notiFetch.isSuccess ? notiFetch.data.filter((item) => item.status === 1) : 0;
    // notiFetch.isSuccess && console.log(listPost, listFriend, listSystem);
    return (
        <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Account settings">
                    <Badge className='cursor-pointer' onClick={handleClick} color="secondary" badgeContent={filteredNotiFetch.length}>
                        <NotificationsIcon/>
                    </Badge>
            </Tooltip>
        </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
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
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="wrapped label tabs example"
            >
                <Tab value="all" label="Tất cả" />
                <Tab value="system" label="Hệ thống" />
                <Tab    
                value="post"
                label="Bài viết"
                />
                <Tab value="friend" label="Bạn bè" />
            </Tabs>
            </Box>
        {value === 'all' ? 
            <div className='overflow-y-auto thin-scroll h-[400px] '>
                {
                    notiFetch.isLoading ?
                    <Skeleton animation="wave" />
                    :
                    notiFetch.data.map((item, index)=>(
                        <NotificationItem key = {index} notification = {item}/>
                    ))
                }
            </div>:
            value === 'friend'?
            <div className='overflow-y-auto thin-scroll h-[400px] '>
                {
                    notiFetch.isLoading ?
                    <Skeleton animation="wave" />
                    :
                    listFriend.map((item, index)=>(
                        <NotificationItem key = {index} notification = {item}/>
                    ))
                }
            </div>:
            value === 'system'?
            <div className='overflow-y-auto thin-scroll h-[400px] '>
                {
                    notiFetch.isLoading ?
                    <Skeleton animation="wave" />
                    :
                    listSystem.map((item, index)=>(
                        <NotificationItem key = {index} notification = {item}/>
                    ))
                }
            </div>
            :
            <div className='overflow-y-auto thin-scroll h-[400px] '>
                {
                    notiFetch.isLoading ?
                    <Skeleton animation="wave" />
                    :
                    listPost.map((item, index)=>(
                        <NotificationItem key = {index} notification = {item}/>
                    ))
                }
            </div>
        }    
        
        
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Hiển thị tất cả
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}