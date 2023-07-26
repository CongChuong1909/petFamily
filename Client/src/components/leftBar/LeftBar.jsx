import React from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Weather from './Weather';
function Leftbar(props) {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <>
        <div className=' item grid grid-cols-1 bg-[rgb(255,255,255)]' style={{padding: 0}}>
            <Weather/>
           <div className='grid grid-cols-1 h-[50%]'>
                <Link to={`/profile/${currentUser.idUser}`}>
                    <div className='flex items-center gap-3 pt-4 hover:bg-[#f5f5f5 shadow-sm hover:shadow-lg font-normal transition transform hover:-translate-y-0.5'>
                            <div className='flex items-center gap-3 pl-2 pr-10 w-[100%] py-1 left-bar-item'>
                                <div className='rounded-[50%] w-[40px] h-[40px] overflow-hidden'>
                                    <img className='w-[40px] rounded-full border border-[#ccc]' src={currentUser.avatar} alt="" />
                                </div>
                                <span className='text-[#333]'>{currentUser.name}</span>
                            </div>
                    </div>
                </Link>
                <Link to={"/"}>
                    <div className='flex items-center gap-3 pt-4 hover:bg-[#f5f5f5 shadow-sm hover:shadow-lg font-normal transition transform hover:-translate-y-0.5 '>
                            <div className='flex items-center gap-3 pl-2 pr-10 w-[100%] py-2 left-bar-item'>
                                <img className='w-[30px] mx-[5px] opacity-[0.8] ' src="https://cdn-icons-png.flaticon.com/256/3917/3917014.png" alt="" />
                                <span className='text-[#333]'>Trang chủ</span>
                            </div>
                    </div>
                </Link>
                <Link to={"/chat"}>
                    <div className='flex items-center gap-3 pt-4 hover:bg-[#f5f5f5 shadow-sm hover:shadow-lg font-normal transition transform hover:-translate-y-0.5'>
                        <div className='flex items-center gap-3 pl-2 pr-10 w-[100%] py-1 left-bar-item'>
                            <img className='w-[40px] rounded-full opacity-[0.8] ' src="https://cdn.icon-icons.com/icons2/2770/PNG/512/chat_message_icon_176706.png" alt="" />
                            <span className='text-[#333]'>Tin nhắn</span>
                        </div>
                    </div>
                </Link>
                <Link to = {`/friends/${currentUser.idUser}`}>
                    <div className='flex items-center gap-3 pt-4 hover:bg-[#f5f5f5 shadow-sm hover:shadow-lg font-normal transition transform hover:-translate-y-0.5'>
                            <div className='flex items-center gap-3 pl-2 pr-10 w-[100%] opacity-[0.8] py-1 left-bar-item'>
                                <img className='w-[40px] rounded-full' src="https://static.thenounproject.com/png/1140959-200.png" alt="" />
                                <span className='text-[#333]'> Bạn bè </span>
                            </div>
                    </div>
                </Link>
                
                <Link to = {`/group`}>
                    <div className='flex items-center gap-3 pt-4 hover:bg-[#f5f5f5 shadow-sm hover:shadow-lg font-normal transition transform hover:-translate-y-0.5'>
                            <div className='flex items-center gap-3 pl-2 pr-10 w-[100%] opacity-[0.8] py-1 left-bar-item'>
                                <img className='w-[40px] rounded-full ' src="https://cdn-icons-png.flaticon.com/512/921/921296.png" alt="" />
                                <span className='text-[#333]'>Nhóm</span>
                            </div>
                    </div>
                </Link>
           </div>
        </div>
            <Link to = {`/become-member`}>
                <div className='w-full item'>
                    <img className='w-[full]' src="https://res.cloudinary.com/dohmfb8tt/image/upload/v1688058805/img_pet_social/leafv5lpysvbwathqhai.jpg" alt="" />
                </div>
            </Link>
        </>
    );
}

export default Leftbar;

    