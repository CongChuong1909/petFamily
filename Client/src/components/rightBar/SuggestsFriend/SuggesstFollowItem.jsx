import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { makeRequest } from '~/axios';
import ListCommentFriend from './ListCommentFriend';
import ViewListFriend from '~/components/ViewListFriend/ViewListFriend';
import { useSelector } from 'react-redux';

function SuggesstFollowItem({suggestedUser, suggestedUsers, followersNotFollowed}) {
    const [showList, setShowList] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const [showFollowing, setShowFollowing] = useState(false);
    const queryClient = useQueryClient();
    const getUserFetch = useQuery({
        queryKey: ["users", suggestedUser],
        queryFn: async () => {
          const res = await makeRequest.get(`/user/find?idUser=`+suggestedUser);
          return res.data;
        },
        
      });
      const handleShowDetailCommonFriend = ()=>{
        setShowList(true);
      }
      const followerExistsInSuggested = followersNotFollowed.map((item) => suggestedUser === item);

      const mutation = useMutation(
        (following) => {
            if (following)
              return makeRequest.delete("/relationships/deleteRelationship?idUser=" + suggestedUser);
            else{
                const followerExistsInSuggested = followersNotFollowed.map((item) => suggestedUser === item)[0];
                if(followerExistsInSuggested)
                {
                    console.log('Last');
                    return makeRequest.post("/relationships/addRelationshipLast", { idUser : suggestedUser });
                }
                else {
                    console.log('first');
                    return makeRequest.post("/relationships/addRelationshipFirst", { idUser : suggestedUser });  
                }
            } 
          },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["relationship"]);
          },
        }
      );
    
      const handleFollow = () => {
        mutation.mutate(false);
        setShowFollowing(true);
      };
      const handleUnfollow = () => {
        mutation.mutate(true);
        setShowFollowing(false);
      }
    return (
        <>
            {
                getUserFetch.isSuccess &&
                    <div className='grid grid-cols-10 py-2'>
                        <div className='col-span-7 flex gap-3 items-center'>
                            <img className='w-[40px] h-[40px] rounded-full ' src={getUserFetch.data.avatar} alt="" />
                            <div>
                                <h3 className='text-[16px] font-semibold'>{getUserFetch.data.name}</h3> 
                                {
                                    suggestedUsers[suggestedUser].length === 0 ?
                                    <></>:
                                    <p className='flex text-[#555] text-[12px]'>
                                        ({suggestedUsers[suggestedUser].length} common follower)
                                    </p>
                                }  
                                <ul onClick={handleShowDetailCommonFriend} className='flex'>
                                    {suggestedUsers[suggestedUser].map((user_follower) => (
                                        <ListCommentFriend  key={user_follower} user_follower = {user_follower}/>
                                    ))}
                                </ul>
                            </div> 
                        </div>
                        
                        <div className='col-span-3 flex gap-3 items-center'>
                            {
                                !showFollowing &&
                                <button onClick={handleFollow} className='border-none outline-none px-3 py-1 text-[12px] text-[#fff] bg-[#5271ff] rounded-md'>
                                    Follow
                                    <i className="pl-1 fa-thin fa-user-plus"></i>
                                </button>
                            }
                            {
                                showFollowing && 
                                <button onClick={handleUnfollow} className='border-none outline-none px-3 py-1 text-[12px] text-[#fff] bg-[#5271ff] rounded-md'>Following <i className="pl-1 fa-light fa-check"></i></button>
                            }
                        </div>
                    </div>
            }
            <ViewListFriend show = {showList}/>
        </>
    );
}

export default SuggesstFollowItem;