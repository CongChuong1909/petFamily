import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeRequest } from "~/axios";
import { io } from "socket.io-client";
import { addList } from "~/redux/chatSlices";
import OnlineFriend from "~/components/Rightbar/OnlineFriends/OnlineFriend";

function ChatBox(props) {
   
  const { choiseConversation,  user } = props;
  const { currentUser } = useSelector((state) => state.user);
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);
  const { listOnline } = useSelector((state) => state.chat);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    return () => {
      socket.current.disconnect();
    };
  }, []);

  console.log(listOnline);

  const messagesFetch = useQuery({
    queryKey: ["messages", choiseConversation],
    queryFn: async () => {
      const res = await makeRequest.get(
        `/messages?idConversation=${choiseConversation}`
      );
      setMessages(res.data);
      return res.data;
    },
  });

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setMessages((prevMessages) => {
        return [...prevMessages, data];
      });
    });
  }, []);


  useEffect(() => {
    if (messagesFetch.data) {
      setMessages(messagesFetch.data);
    }
  }, [messagesFetch.data]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesFetch.data, messages]);

//   const userFetch = useQuery({
//     queryKey: ["users", choiseConversation[0].user_id],
//     queryFn: async () => {
//         const res = await makeRequest.get(`/user/find?idUser=${item[0].user_id}`);
//         return res.data;
//     },
// });

  return (
    <div className="flex flex-col scroll-div h-[550px]">
      {choiseConversation !== null ? (
        <>
          {messagesFetch.isLoading ? (
            <></>
          ) : (
            <>
              {messages?.map((message, index) => (
                <div key={index} ref={scrollRef}>
                  <MessageComponent message={message} currentUser={user} />
                </div>
              ))}
              <div ref={scrollRef} />
            </>
          )}
        </>
      ) : (
        <p>No Conversation Choise</p>
      )}
      
    </div>
  );
}

const MessageComponent = ({ message, currentUser }) => {
    if (message.idsender === currentUser.idUser) {
        return (
            <div
                key={message.idmesage}
                className="flex justify-end p-2 text-[#fff]"
            >
                <div className="flex py-2 px-4 flex-col rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl bg-[#1467ec]">
                    <p>{message.textcontent}</p>
                    <p className="text-[12px] text-[#ccc] ">{moment(message.created_at).fromNow()}</p>
                </div>
            </div>
        );
    } else {
        return (
            <div
                key={message.idmesage}
                className="flex justify-start p-2 text-[#fff] "
            >
                <div className="flex flex-col py-2 px-4 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl bg-[#e2641b]">
                    <p>{message.textcontent}</p>
                    <p className="text-[12px] text-[#ccc] ">{moment(message.created_at).fromNow()}</p>
                </div>
                
            </div>
        );
    }''
};
export default ChatBox;
