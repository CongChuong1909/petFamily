import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FriendAddGroup from './FriendAddGroup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '~/axios';

function ListFriendAddGroup(props) {
    const {nameConversation, setShowAddGroup} = props;
    const { currentUser } = useSelector((state) => state.user);
    const { list } = useSelector((state) => state.relationship);
    const [listPaticipant, setListPaticipant] = useState([]);
    const [arrFriend, setArrFriend] = useState([]);
    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newConversation) => {
            return makeRequest.post("/conversations/addConversation", newConversation);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["conversation"]);
            },
        },
    );

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
        }
    }, [list, currentUser]);
    const hadleAddConversation = () =>{
        if(nameConversation === '')
        {
            if(listPaticipant.length === 0)
            {
                alert("please select member in group")
            }else{
                const value = {
                    nameConversation : 'Group',
                    paticipant: listPaticipant
                }
                mutation.mutate(value);
                setShowAddGroup(false);
            }
        }
        else{
            if(listPaticipant.length === 0)
            {
                alert("please select member in group")
            }else{
                const value = {
                    nameConversation,
                    paticipant:listPaticipant
                }
                mutation.mutate(value)
                setShowAddGroup(false);
            }
        }
    }

    return (
        <div className='flex overflow-auto h-full flex-col items-center justify-between'>
            <div className='w-[60%] p-0 scroll-div'>
                {
                    arrFriend.map((item, index)=>(
                        <FriendAddGroup key = {index} setListPaticipant = {setListPaticipant} listPaticipant = {listPaticipant} item = {item}/>
                    ))
                }
            </div>
            <div>
                <button onClick={hadleAddConversation} className='bg-[#aaa] hover:bg-[#ccc] duration-300 rounded-md p-2'>Add group conversation</button>
            </div>
        </div>
    );
}

export default ListFriendAddGroup;