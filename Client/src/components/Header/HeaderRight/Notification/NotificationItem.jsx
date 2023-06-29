import { Avatar, Box, CardHeader, IconButton, MenuItem, Skeleton, Typography } from '@mui/material';
import React from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '~/axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

function NotificationItem({notification}) {
    moment.updateLocale('en', {
        relativeTime: {
          future: 'in %s',
          past: '%s ago',
          s:  '1s',
          ss: '%ss',
          m:  '1m',
          mm: '%dm',
          h:  '1h',
          hh: '%dh',
          d:  '1d',
          dd: '%dd',
          M:  '1M',
          MM: '%dM',
          y:  '1Y',
          yy: '%dY'
        }
      }) 
      console.log(notification);
    const queryClient = useQueryClient();
    const userFetch = useQuery({
        queryKey: ["users", notification.idsender],
        queryFn: async () => {
            const res = await makeRequest.get(`/user/find?idUser=${notification.idsender}`);
            return res.data;
        },
    });
    const postFetch = useQuery({
        queryKey: ["postbyId", notification.description],
        queryFn: async () => {
            try {
                const res = await makeRequest.get(`/posts/getByID?idPost=${notification.description}`);
                if (res.data && res.data.length > 0) {
                  return res.data[0];
                } else {
                  throw new Error("No image data found");
                }
              } catch (error) {
                throw new Error("Failed to fetch image data");
              }
        },
    });
    const imageFetch = useQuery({
        queryKey: ["imagesnoti", notification.description],
        queryFn: async () => {
          try {
            const res = await makeRequest.get(`/images/getImagePost/${notification.description}`);
            if (res.data && res.data.length > 0) {
              return res.data[0];
            } else {
              throw new Error("No image data found");
            }
          } catch (error) {
            throw new Error("Failed to fetch image data");
          }
        },
      });
    const mutationNoti = useMutation((idNoti)=>{
        return makeRequest.put("/notification/update?idnotification="+ idNoti)
    },{onSuccess:()=>{
                queryClient.invalidateQueries(["notification"]);
        }}
    )

    const handleReadNoti = () =>{
        mutationNoti.mutate(notification.idnotification);

    }   
    return (
            <MenuItem onClick={handleReadNoti} className={`w-[400px]`} style={{display:"grid", gridTemplateColumns: "repeat(10, 1fr)", border: '1px solid rgba(0, 0, 0, 0.05)', backgroundColor: notification.status === 1 ? '#f1f1f1' : '' }}>
                {
                    userFetch.isLoading ?
                    <Box sx={{ width: '300px', height: '40px' }} className = 'flex'>
                        <Skeleton className='w-[250px] h-[40px]' animation="wave" />
                    </Box>
                    :
                    <div
                        style={{padding:'6px', paddingLeft: '0px', paddingRight:'0px'}}
                        
                    >
                        <Link to = {`${notification.type === 'post'? `post/${notification.description}`: ``}`}>
                            <div className='flex items-center gap-5 w-[300px] text-nowrap'>
                                 <Avatar src={userFetch.data.avatar} style={{marginRight:'0px'}}>
                                </Avatar>
                                <div className='flex flex-col gap-2'>
                                    <span className=' text-nowrap' style={{ fontSize: '13px', width:'250px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}><span className='font-bold' >{userFetch.data.name}</span> {notification.content}</span>
                                    <div className='flex gap-3 items-center'>
                                        {imageFetch.isSuccess && imageFetch.data !==undefined ? <img width={40} src={imageFetch.data.url} alt="" />:<></>}
                                        <Typography className='w-[270px]' level="body5" style={{ fontSize: '13px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                            {postFetch.isSuccess && postFetch.data.textcontent}
                                        </Typography>
                                    </div>
                                </div>
                            </div>   
                        </Link>               
                    </div>
                }
                
                <div className='col-span-2'>
                    <span className='text-[14px]'> {moment(notification.created_at).fromNow()} {notification.status === 1 ? <FiberManualRecordIcon fontSize='10px' className='text-[#5271ff]'/> : ''}</span>
                </div>
            </MenuItem>
    );
}

export default NotificationItem;