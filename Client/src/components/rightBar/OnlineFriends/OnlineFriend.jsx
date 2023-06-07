import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { addList } from '~/redux/chatSlices';
import OnlineItem from './OnlineItem';

function OnlineFriend(props) {
    const { listOnline } = useSelector((state) => state.chat);
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [listOnlineFriend, setListOnlineFriend] = useState(null);
  
    const socket = useRef(null);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("error", (error) => {
      console.log(error);
    });

    return () => {
      // Cleanup function to remove the event listener
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", currentUser.idUser);

    socket.current.on("getUsers", (users) => {
        console.log(users);
      dispatch(addList(users))
      setListOnlineFriend(users);
    });
  }, [currentUser]);

  console.log(listOnline);
    return (
        <div className='item w-16 h-[100vh] fixed top-0 right-0 flex items-center justify-between flex-col' style={{padding:"0px"}}>
            <div className='pt-4 flex items-center justify-between flex-col'>
                <div>
                    <img src="https://res.cloudinary.com/dohmfb8tt/image/upload/v1685933682/img_pet_social/f8jpd6lm1kkialof5lgx.png" alt="" />
                </div>
                {
                    listOnline && listOnline.map((item, index)=>(
                        <OnlineItem key={index} item = {item}/>
                    ))
                }
            </div>
            <div className='bg-[#fa6342] rounded-full fixed bottom-5 right-2 cursor-pointer'>
                <i className="p-4 fa-regular fa-arrow-up text-[18px] -rotate-[30deg] hover:rotate-0 duration-300 text-[#fff]"></i>
            </div>
        </div>
    );
}

export default OnlineFriend;