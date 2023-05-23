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
            <li className='flex mx-[1px]'>
                <div className='flex'>
                    <img className='w-[20px] h-[20px] rounded-full ' src={getUserFetch.data.avatar} alt="" />
                </div>
            </li>
        }
        </>
    );
}

export default ListCommentFriend;