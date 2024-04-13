import { Avatar } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { makeRequest } from '~/axios';

function ListCommentFriend({user_follower}) {
    const getUserFetch = useQuery({
        queryKey: ["users", user_follower],
        queryFn: async () => {
          const res = await makeRequest.get(`/user/find?idUser=`+user_follower);
          return res.data;
        },
        
      });
    return (
        <>
        {getUserFetch.isSuccess &&
            <Avatar sx={{ width: 22, height: 22 }} src= {getUserFetch.data.avatar}/>
        }
        </>
    );
}

export default ListCommentFriend;