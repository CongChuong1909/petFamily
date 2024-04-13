
import React from 'react';
import SuggesstFollowItem from './SuggesstFollowItem';

function FollowRecommendations({data, idUser , userData}) {

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

        const suggestedUsersList = Object.keys(suggestedUsersMap);

        const additionalUsers = userData.filter((user) => {
            return !suggestedUsersList.includes(user.idUser) && user.idUser !== idUser;
        });

        const filteredAdditionalUsers = additionalUsers.filter((user) => {
            return !data.some((item) => item.user_followed === user.idUser && item.user_follower === idUser);
        });

        filteredAdditionalUsers.forEach((user) => {
            suggestedUsersMap[user.idUser] = [];
        });
    
        return suggestedUsersMap;
      }, [idUser]); 

    //   một website mạng xã hội đã có bảng user lưu trữ thông tin người dùng bảng post lưu trữ thông tin bài viết của người dùng bảng friendlist để lưu mối quan hệ giữa 2 user với nhau và bảng comment,like, share thiết kế bảng thông báo như thế nào để khi một người dùng follow người dùng khác và khi họ đăng bài thì người 

      const followersNotFollowed = data
      .filter((item) => item.user_followed === idUser)
      .filter(
        (follower) =>
          !data.some(
            (item) =>
              item.user_followed === follower.user_follower &&
              item.user_follower === idUser
          )
      )
      .map((follower) => follower.user_follower);
    //*** suggestedUsers***
    // An:(3) ['Henry', 'Dan', 'Marry']
    // Andrew:(2) ['Marry', 'Henry']
    // Bob:['Dan']
    // Henry:['Marry']
    // John:(4) ['Marry', 'Dan', 'Andrew', 'Kevin']

  return (
    <div className='h-[220px] overflow-x-auto thin-scroll'>
       { suggestedUsers &&
        Object.keys(suggestedUsers).map((suggestedUser) => ( ///// thay vì dùng map 2 lần bị lặp thì dùng objectkey
        <SuggesstFollowItem followersNotFollowed = {followersNotFollowed} key={suggestedUser} suggestedUsers = {suggestedUsers} suggestedUser = {suggestedUser}/>
      ))}
    </div>
  );
}
export default FollowRecommendations;
