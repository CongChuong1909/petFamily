import Picker from "@emoji-mart/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from 'react';
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { makeRequest } from "~/axios";

function ChatInput(props) {
    const {choiseConversation, showEmoji, setShowEmoji, socket} = props
    const [textChat, setTextChat] = useState('')
    const { currentUser } = useSelector((state) => state.user);
    const queryClient = useQueryClient();
     const { listOnline } = useSelector((state) => state.chat);
    
    const inputRef = useRef();
    // const socket= useRef(io("http://localhost:4000")); 
    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setTextChat(textChat + emoji);
    };

    const mutation = useMutation(
        (newMessage) => {
            return makeRequest.post("/messages/sendMessage", newMessage);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["messages"]);
            },
        },
    );

    const conversationFetch = useQuery({
        queryKey: ["participants", choiseConversation],
        queryFn: async () => {
            const res = await makeRequest.get(
                `/conversations/getParticipants?idconversation=${choiseConversation}`,
            );
            
            return res.data;
        },
    });

    const handleSendMessage = () =>{
        if(textChat === '')
        {
            inputRef.current.focus();
        }
        else{
            const receiverId = listOnline.find(
                (member) => member.userId !== currentUser.idUser
              );
            socket.current.emit("sendMessage",{
                senderId: currentUser.idUser,
                receiverId,
                textcontent: textChat,
            })
            
            const values = {
                idConversation: choiseConversation,
                textContent: textChat
            }
            mutation.mutate(values);
            setTextChat('');
            inputRef.current.focus();
        }

    }
    const handleKeyDown = (event)=>{
        if (event.key === "Enter") {
            handleSendMessage();
        }
    }
    return (
        <div>
            <div className='flex gap-3 items-center'>
                <input ref={inputRef} value={textChat} onKeyDown={handleKeyDown} onChange={(e) => setTextChat(e.target.value)} type="text" placeholder='Type your message' className='text-[#333] px-5 py-2 rounded-4xl outline w-full outline-1 outline-[#1635ff]' />
                <i onClick={(e) => { setShowEmoji(!showEmoji); e.stopPropagation(); }} className="fa-sharp fa-light fa-face-smile text-[26px] cursor-pointer"></i>
                <i onClick={handleSendMessage} className="fa-sharp fa-solid fa-paper-plane-top text-[26px] text-[#1467ec] cursor-pointer" ></i>
            </div>
            {showEmoji && (
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            previewposition="none"
                            className="absolute  bottom-[10%] h-[60%]  z-50 right-[10%]"
                        >
                            <Picker onEmojiSelect={addEmoji} />
                        </div>
                    )}
        </div>
    );
}

export default ChatInput;