import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { makeRequest } from '~/axios';

function NotificationSystem(props) {
    const idNoti = useLocation().pathname.split("/")[2];
    const notiFetch = useQuery({
        queryKey: ["noti", idNoti],
        queryFn: async () => {
          const res = await makeRequest.get(`/notification/getContent?idNoti=${idNoti}`);
          return res.data[0];
        },
    });  
    notiFetch.isSuccess&& console.log(notiFetch.data);

    return (
        <div className='bg-[#fff] p-6 flex justify-center'>
            <div className='w-[70%]'>
                {notiFetch.isSuccess &&  <p className='notiPage' dangerouslySetInnerHTML={{ __html: notiFetch.data.content }}/>}
            </div>
        </div>
    );
}

export default NotificationSystem;