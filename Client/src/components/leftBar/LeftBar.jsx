import React from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
function Leftbar(props) {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <div className='h-[90vh] item grid grid-cols-1 bg-[rgb(255,255,255)]'>
           <div className='grid grid-cols-1 h-[50%]'>
                <div className='flex items-center gap-3 pt-4'>
                    <Link to={`/profile/${currentUser.idUser}`}>
                        <div className='flex items-center gap-3 pl-2 pr-10 w-[200px] py-1 left-bar-item'>
                            <div className='rounded-[50%] w-[40px] h-[40px] overflow-hidden'>
                                <img className='w-[40px] rounded-full border border-[#ccc]' src={currentUser.avatar} alt="" />
                            </div>
                            <span className='text-[#333]'>{currentUser.name}</span>
                        </div>
                    </Link>
                </div>
                <Link to={"/chat"}>
                    <div className='flex items-center gap-3 pt-4'>
                        <div className='flex items-center gap-3 pl-2 pr-10 w-[200px] py-1 left-bar-item'>
                            <img className='w-[40px] rounded-full opacity-[0.8] ' src="https://cdn.icon-icons.com/icons2/2770/PNG/512/chat_message_icon_176706.png" alt="" />
                            <span className='text-[#333]'>Tin nhắn</span>
                        </div>
                    </div>
                </Link>
                <div className='flex items-center gap-3 pt-4'>
                    <Link to = {`/friends/${currentUser.idUser}`}>
                        <div className='flex items-center gap-3 pl-2 pr-10 w-[200px] opacity-[0.8] py-1 left-bar-item'>
                            <img className='w-[40px] rounded-full' src="https://static.thenounproject.com/png/1140959-200.png" alt="" />
                            <span className='text-[#333]'> Bạn bè </span>
                        </div>
                    </Link>
                </div>
                
                <div className='flex items-center gap-3 pt-4'>
                    <div className='flex items-center gap-3 pl-2 pr-10 w-[200px] opacity-[0.8] py-1 left-bar-item'>
                        <img className='w-[40px] rounded-full ' src="https://cdn-icons-png.flaticon.com/512/921/921296.png" alt="" />
                        <span className='text-[#333]'>Nhóm</span>
                    </div>
                </div>
                <div className='flex items-center gap-3 pt-4'>
                    <Link to = {`/become-member`}>
                        <div className='flex items-center gap-3 pl-2 pr-10 w-[200px] opacity-[0.8] py-1 left-bar-item'>
                            <img className='w-[40px] rounded-full ' src="https://icons.veryicon.com/png/o/miscellaneous/mlxc-public-icon-library/medical-and-health-work-1.png" alt="" />
                            <span className='text-[#333]'>Bác sĩ, phòng khám</span>
                        </div>
                    </Link>
                </div>
           </div>

        </div>
    );
}

export default Leftbar;