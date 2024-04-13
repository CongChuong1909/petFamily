import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from '~/axios';

function ViewListFriendItem({item}) {
    const navigate = useNavigate();
    const userFetch = useQuery({
        queryKey: ["users", item],
        queryFn: async () => {
            const res = await makeRequest.get(`/user/find?idUser=${item}`);
            return res.data;
        },
    });
    return (
        <>
            {
                userFetch.isSuccess &&
                <div key= {item} className='col-span-6 flex gap-3 items-center my-4 justify-between cursor-pointer' onClick={()=>{navigate(`/profile/${item}`)}}>
                    <div className='flex gap-3 items-center'>
                        <img className='w-[40px] h-[40px] rounded-full ' src={userFetch.data.avatar} alt="" />
                        <h3 className='text-[16px] font-semibold'>{userFetch.data.name}</h3> 
                    </div>
                    <div>
                        <p className='text-[13px] text-[#333]'>Following</p>
                    </div>
                </div>
            }
        </>
        
    );
}

export default ViewListFriendItem;