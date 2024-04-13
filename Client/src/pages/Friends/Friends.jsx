import {Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FriendItem from '~/components/ViewListFriend/FriendItem';

function Friends(props) {
    const { list } = useSelector((state) => state.relationship);
    const {currentUser} = useSelector((state)=>(state.user));
    const [arrFriend, setArrFriend] = useState([]);
    const [arrFriendFollower, setArrFriendFollower] = useState([]);
    const [arrFriendFollowed, setArrFriendFollowed] = useState([]);
    const [value, setValue] = useState('one');
    useEffect(() => {
        if (list.length > 0) {
            const followedById = new Set();
            const outputSet = new Set();
            for (const item of list) {
                if (item.user_followed === currentUser.idUser) {
                    followedById.add(item.user_follower);
                }
                
            }
            for(const item of list){
                if((item.user_follower === currentUser.idUser && followedById.has(item.user_followed)))
                {
                    outputSet.add(item.user_followed);
                }
            }
            const output = Array.from(outputSet);
            setArrFriend(output);
            const filteredFollowed = list.filter(item => item.user_followed === currentUser.idUser);
            const userFolloweds = filteredFollowed.map(item => item.user_follower);
            const filteredFollower = list.filter(item => item.user_follower === currentUser.idUser);
            const userFollowers = filteredFollower.map(item => item.user_followed);
            setArrFriendFollowed(userFolloweds);
            setArrFriendFollower(userFollowers);
        }
    }, [list, currentUser]);

    return (
        <div className='item'>
            <Tabs
                value={value}
                onChange={(e, newValue)=>setValue(newValue)}
                textColor="primary"
                indicatorColor="primary"
                aria-label="primary tabs example"
            >
                <Tab value="one" label="Follower" />
                <Tab value="two" label="Followed" />
                <Tab value="three" label="Friend" />
            </Tabs>

            {
                value === 'one'?
                arrFriendFollowed.map((item)=>(
                    <FriendItem key = {item} viewFollow = {'followed'} friend = {item}/> 
                ))
                :
                value === "two"?
                arrFriendFollower.map((item)=>(
                    <FriendItem key = {item} viewFollow = {'follower'} friend = {item}/> 
                ))
                :
                arrFriend.map((item)=>(
                    <FriendItem key = {item} viewFollow = {'friend'} friend = {item}/> 
                ))
            }
        </div>
    )
    
}

export default Friends;
 
