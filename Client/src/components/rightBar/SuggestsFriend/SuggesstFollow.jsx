
import React from 'react';
import SuggesstFollowItem from './SuggesstFollowItem';

function FollowRecommendations({data, idUser }) {

  const suggestedUsers = React.useMemo(() => { /// Dùng reactMemo tránh lặp lại khi không cần thiết khi dependence không thay đổi 
        const userFollowedByCurrent = data.filter((item) => item.user_follower === idUser);
        const followedByUser = userFollowedByCurrent.map((item) => item.user_followed);
    
        const suggestedUsersMap = {};
    
        data.forEach((item) => {
          const { user_followed, user_follower } = item;
    
          if (user_follower !== idUser && user_followed !== idUser && !followedByUser.includes(user_followed)) {
            if (!suggestedUsersMap.hasOwnProperty(user_followed)) {
              suggestedUsersMap[user_followed] = [];
            }
    
            if (followedByUser.includes(user_follower)) {
              suggestedUsersMap[user_followed].push(user_follower);
            }
          }
        });
    
        const followersNotFollowed = data
          .filter((item) => item.user_followed === idUser)
          .filter((follower) => !data.some((item) => item.user_followed === follower.user_follower && item.user_follower === idUser))
          .map((follower) => follower.user_follower);
    
        followersNotFollowed.forEach((follower) => {
          if (!suggestedUsersMap.hasOwnProperty(follower)) {
            suggestedUsersMap[follower] = [];
          }
        });
    
        return suggestedUsersMap;
      }, [idUser]); 
  

    //*** suggestedUsers***
    // An:(3) ['Henry', 'Dan', 'Marry']
    // Andrew:(2) ['Marry', 'Henry']
    // Bob:['Dan']
    // Henry:['Marry']
    // John:(4) ['Marry', 'Dan', 'Andrew', 'Kevin']

  return (
    <div className='h-[220px] overflow-x-auto thin-scroll'>
      {Object.keys(suggestedUsers).map((suggestedUser) => ( ///// thay vì dùng map 2 lần bị lặp thì dùng objectkey
        <SuggesstFollowItem key={suggestedUser} suggestedUsers = {suggestedUsers} suggestedUser = {suggestedUser}/>
      ))}
    </div>
  );
}
export default FollowRecommendations;

// từ thuật toán trước đó của bạn hãy làm theo yêu cầu của tôi
// input:
// data:[
//     {id_friend_list: '1', user_followed: 'kaiuIQFPw4', user_follower: 'SGKChRP72l'}
//     {id_friend_list: '2', user_followed: 'kaiuIQFPw4', user_follower: 'VDIQ-VuUf8'}
//     {id_friend_list: '3', user_followed: 'SGKChRP72l', user_follower: 'kaiuIQFPw4'}
//     {id_friend_list: '4', user_followed: 'SGKChRP72l', user_follower: 'KEWZ9g7TNA'}
//     {id_friend_list: '5', user_followed: 'VDIQ-VuUf8', user_follower: 'KEWZ9g7TNA'}
// ]
// output:
//     user: kaiuIQFPw4 đề xuất VDIQ-VuUf8 (vì chưa follow lại) , KEWZ9g7TNA ( vì có SGKChRP72l follow )
//     user: SGKChRP72l đề xuất KEWZ9g7TNA (vì chưa follow lại)
//     user: VDIQ-VuUf8 đề xuất KEWZ9g7TNA (vì chưa follow lại)
//     user: KEWZ9g7TN đề xuất kaiuIQFPw4 (vì có SGKChRP72l và KEWZ9g7TNA cùng follow)
