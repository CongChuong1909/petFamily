import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { makeRequest } from "~/axios";

function Conversations(props) {
    const {item} = props
    const [online, setOnline] = useState(true);

    const { listOnline } = useSelector((state) => state.chat);
    const isUserOnline = listOnline.some((onlineUser) => onlineUser.userId === item[0].user_id);
    const view = () =>{
        const handleClickConversation = () =>{
            props.choiseConversation(item[0].idconversation)
        }  
        if(item.length === 1)
        {
            const userFetch = useQuery({
                queryKey: ["users", item[0].user_id],
                queryFn: async () => {
                    const res = await makeRequest.get(`/user/find?idUser=${item[0].user_id}`);
                    return res.data;
                },
            });
            return (
                <>
                    {
                        userFetch.isSuccess && 
                        <div onClick={handleClickConversation} className="follower conversation bg-[#fff] hover:bg-[#f1f2f3] transition-all duration-300 cursor-pointer">
                        <div className="gap-4  grid grid-cols-6 items-center px-6 py-3">
                            <div className="col-span-2">
                                {isUserOnline ? <div className="bg-[#51e200] z-[10] rounded-full absolute w-4 h-4"></div>: <div className="bg-[#999] z-[10] rounded-full absolute w-4 h-4"></div>}
                                <img
                                    src={userFetch.data.avatar}
                                    alt="Profile"
                                    className="w-[50px] h-[50px] rounded-full"
                                />
                            </div>
                            <div className="flex col-span-4 flex-col">
                                <span className="font-semibold">
                                    {userFetch.data.name}
                                </span>
                                <span style={{ color: isUserOnline ? "#51e200" : "" }}>
                                    {isUserOnline ? "Online" : "Offline"}
                                </span>
                            </div>
                        </div>
                    </div>        
                    }
                </>    
            )
        } else{
           
            return (
                <div onClick={handleClickConversation} className="follower conversation bg-[#fff] hover:bg-[#f1f2f3] transition-all duration-300 cursor-pointer">
                    <div className="grid grid-cols-6 gap-4 items-center px-6 py-3">
                        <div className="w-[100px] h-[50px] relative col-span-2">
                            {online && <div className="bg-[#51e200] z-[10] rounded-full absolute w-4 h-4"></div>}
                            <div className="absolute left-0 w-[100px] h-[50px]">
                                <div className="relative left-0 w-[90%] h-[50px]">
                                    {
                                        item.map((conversation, index)=>(
                                            <GroupConversation key = {index} index = {index} conversation = {conversation}/>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col col-span-4">
                            <span className="font-semibold">
                                {item[0].nameconversation}
                            </span>
                            <span style={{ color: online ? "#51e200" : "" }}>
                                {online ? "Online" : "Offline"}
                            </span>
                        </div>
                    </div>
                </div>
            )
        }
        
    }
    const GroupConversation = ({index, conversation}) =>{
        const userFetch = useQuery({
            queryKey: ["users", conversation.user_id],
            queryFn: async () => {
                const res = await makeRequest.get(`/user/find?idUser=${conversation.user_id}`);
                return res.data;
            },
        });
        return (
            <>
            {
              userFetch.isSuccess &&                    
               <div className={`absolute w-[50px] h-[50px] ${index === 0 ? 'right-3': index === 1 ? 'right-6': index === 2 ? 'right-9': 'right-0'} `}>
                    <img
                        src={userFetch.data.avatar}
                        alt="Profile"
                        className="w-[50px] h-[50px] rounded-full"
                    />
                </div> 
            }
            </>
        )
    }

    
    return (
        <>
            {view()}
        </>
    );
}

export default Conversations;
