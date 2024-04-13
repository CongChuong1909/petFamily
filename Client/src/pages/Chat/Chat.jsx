import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeRequest } from '~/axios';
import LoadingMessenger from '~/components/Loading/MessageLoading';
import ChatBox from '~/components/Messages/ChatBox/ChatBox';
import ChatInput from '~/components/Messages/ChatBox/ChatInput/ChatInput';
import Conversations from '~/components/Messages/Conversations/Conversations';
import ListFriendAddGroup from '~/components/Messages/ListFriendAddGroup/ListFriendAddGroup';

function Chat(props) {
    const {socket} =props
    const { currentUser } = useSelector((state) => state.user);
    const [listConversation, setListConversation] = useState([]);
    const [showEmoji, setShowEmoji] = useState(false);
    const [showAddGroup, setShowAddGroup] = useState(false);
    const [choiseConversation, setChoiseConversation] = useState(null);
    const [nameConversation, setNameConversation] = useState('');
    const conversationFetch = useQuery({
        queryKey: ["conversation"],
        queryFn: async () => {
            const res = await makeRequest.get(
                `/conversations`,
            );
            
            return res.data;
        },
    });

    useEffect(()=>{
        if(conversationFetch.isSuccess)
        {
            if(conversationFetch.data.length > 0)
            {
                const mergedConversation = conversationFetch.data.reduce((arr, item) => {
                    const existingItem = arr.find((arr) => arr[0].idconversation === item.idconversation);
                    if (existingItem) {
                      existingItem.push(item);
                    } else {
                      arr.push([item]);
                    }
                    return arr;
                  }, []);
                  setListConversation(mergedConversation)
            }
        }
    },[currentUser, conversationFetch.isSuccess, conversationFetch.data])



    return (
        <div>
            {
                conversationFetch.isLoading ? <LoadingMessenger/> :
            
            <div className='grid grid-cols-12 px-20 h-[90vh] gap-5'>
                <div className='col-span-4 item'>
                    <div className='border_bottom mb-4 flex justify-between items-center p-2 text-[#333] text-[24px]'>
                        <p className='font-bold'>Chat</p>
                        <i onClick={()=> setShowAddGroup(!showAddGroup)} className="fa-sharp fa-regular fa-users-medical"></i>
                    </div>
                    {
                        showAddGroup &&
                        <div className=' px-6 py-3 flex gap-5 items-center'>
                            <div className="w-12 h-12 rounded-full bg-[#f2f2f2] flex justify-center items-center">
                                <i className="text-2xl fa-sharp fa-regular fa-users-medical"></i>
                            </div>
                            <div className='flex flex-col '>
                                <p className='text-[12px]'>Name Group</p>
                                <input value={nameConversation} onChange={(e) =>setNameConversation(e.target.value)} type="text" className='outline-none border-b border-[#ccc]'/>
                            </div>
                            
                        </div>
                    }
                        {/* <OnlineFriend/> */}
                    <div className=' scroll-div h-[75vh]'>
                        {
                        listConversation.map((item, index)=>(
                                <Conversations choiseConversation = {(choise)=> {setChoiseConversation(choise); setShowAddGroup(false)}} key = {index} item = {item}/>
                            ))
                        }
                    </div>
                       
                </div>
                <div className='col-span-8 item'>
                    {
                        showAddGroup ? <ListFriendAddGroup setShowAddGroup = {setShowAddGroup} nameConversation = {nameConversation}/>
                        :
                        <div onClick={()=> setShowEmoji(false)} className='flex h-full justify-between  flex-col'>
                            <ChatBox socket = {socket} choiseConversation = {choiseConversation} user = {currentUser}/>
                            {choiseConversation !== null && <ChatInput socket = {socket} choiseConversation = {choiseConversation} showEmoji = {showEmoji} setShowEmoji = {setShowEmoji}/>} 
                        </div>
                    }
                </div>  
            </div>
            }
        </div>
        
    );
}

export default Chat;