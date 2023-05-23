import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { makeRequest } from '~/axios';
import Loading from '../Loading/Loading';
import useDeleteFriend from '~/Hooks/useDeleteFriend';
import useAddFriend from '~/Hooks/useAddFriend';
import { useSelector } from 'react-redux';

function FriendItem(props) {
    const {friend} = props;
    const addMutation = useAddFriend();
    const [follow, setShowFollow] = useState(false);
    const [follower, setShowFollower] = useState(true);
    const deleteMutation = useDeleteFriend();
    const { list } = useSelector((state) => state.relationship);
    const {currentUser} = useSelector((state)=>(state.user));
    const [arrFriendFollower, setArrFriendFollower] = useState([]);
    const friendId = useSelector((state) => state.friend.friendId);
    const [arrFriendNonFollow, setArrFriendNonFollow] = useState([]);
    const userFetch = useQuery({
        queryKey: ["users", friend],
        queryFn: async () => {
            const res = await makeRequest.get(`/user/find?idUser=${friend}`);
            return res.data;
        },
    });

    const handleUnFollow = ()=>{
        deleteMutation.mutate(friend);
        setShowFollow(true);
        setShowFollower(true);
    }
    const handleFollow = ()=>{
        addMutation.mutate(friend);
        setShowFollow(false);
        setShowFollower(false);
    }
    useEffect(() => {
        if (list.length > 0) {
            const filteredFollowed = list.filter(item => item.user_followed === currentUser.idUser);
            const userFollowers = filteredFollowed.map(item => item.user_follower);
            const filteredFollower = list.filter(item => item.user_follower === currentUser.idUser);
            const userFolloweds = filteredFollower.map(item => item.user_followed);
            setArrFriendFollower(userFollowers)
            const result = userFollowers.filter(item => !userFolloweds.includes(item));
            setArrFriendNonFollow(result);
        }
    }, [list, currentUser]);


    console.log(!follow);
    const ViewButton = () =>{
       
        if (props.viewFollow === 'followed') {
            return (
              <>
                {arrFriendNonFollow.includes(friend) ? 
                follower ? <div onClick={handleFollow} className='flex items-center gap-3 border rounded-md text-[#008ce8] select-none  cursor-pointer p-1'>
                        <p>Follow</p>
                        <i className='fa-light fa-user-plus'></i>
                    </div>
                    
                  : <div onClick={handleUnFollow} className='flex items-center gap-3 border rounded-md text-[#008ce8] select-none cursor-pointer p-1'>
                        <p>Unfollow</p>
                        <i className='fa-light fa-user-minus'></i>
                    </div>
                    
                 : <></>}
              </>
            );
          }
        
        if(props.viewFollow === 'follower' || props.viewFollow === 'friend') 
        {
             return (
                   follow ? <div onClick={handleFollow} className='flex items-center gap-3 border rounded-md text-[#008ce8] select-none cursor-pointer p-1'>
                        <p>Follow</p>
                        <i className="fa-light fa-user-plus"></i>
                    </div>
                    :
                    <div onClick={handleUnFollow} className='flex items-center gap-3 border rounded-md text-[#008ce8] select-none cursor-pointer p-1'>
                        <p>Unfollow</p>
                        <i className="fa-light fa-user-minus"></i>  
                    </div>
                    
                )
        }
        
    }

    return (
        <div>
            {
                userFetch.isLoading?
                <Loading/>:
                <div className='flex justify-between items-center py-3'>
                    <div className='flex items-center gap-2'>
                            <div><img className='w-[40px] h-[40px] rounded-full' src={userFetch.data.avatar} alt="" /></div>
                            <p className='font-semibold text-[18px]'>{userFetch.data.name}</p>
                            {userFetch.data.userid === 'kaiuIQFPw4' && <div><img className='w-[20px] h-[20px]' src="https://cdn-icons-png.flaticon.com/512/807/807262.png" alt="" /></div>}
                    </div>
                    <ViewButton/>
                </div>

            }
            
        </div>
    );
}

export default FriendItem;