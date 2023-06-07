import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { makeRequest } from '~/axios';

function FriendAddGroup(props) {
    const {item, setListPaticipant, listPaticipant} = props;
    
   
    const userFetch = useQuery({
        queryKey: ["users", item],
        queryFn: async () => {
            const res = await makeRequest.get(`/user/find?idUser=${item}`);
            return res.data;
        },
    });

    

    const handleAddFriendChat = () =>{
        setListPaticipant([...listPaticipant, item])
    }
    return (
        <div className='w-full'>
            {
                userFetch.isLoading ? <></> :
                    <div className='flex justify-between items-center py-3'>
                        <div className='flex items-center gap-2'>
                                <div><img className='w-[40px] h-[40px] rounded-full' src={userFetch.data.avatar} alt="" /></div>
                                <p className='font-semibold text-[18px]'>{userFetch.data.name}</p>
                                {userFetch.data.userid === 'kaiuIQFPw4' && <div><img className='w-[20px] h-[20px]' src="https://cdn-icons-png.flaticon.com/512/807/807262.png" alt="" /></div>}
                        </div>
                        <i onClick={handleAddFriendChat} className= " text-[24px] cursor-pointer text-[#008ce8] fa-solid fa-circle-plus"></i>
                    </div>
            }
        </div>
    );
}

export default FriendAddGroup;