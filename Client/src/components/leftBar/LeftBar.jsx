import React from 'react';
import { useSelector } from "react-redux";
function Leftbar(props) {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <div className='grid grid-cols-1 bg-[#fff] px-5'>
            <div className='flex items-center gap-3 pt-4'>
                <div className='flex items-center gap-3 pl-2 pr-10 w-[200px] py-1 left-bar-item'>
                <div className='rounded-[50%] w-[40px] h-[40px] overflow-hidden'>
                    <img className='w-[40px] rounded-full border border-[#ccc]' src={currentUser.avatar} alt="" />
                    </div>
                    <span className='text-[#333]'>{currentUser.name}</span>
                </div>
            </div>
            <div className='flex items-center gap-3 pt-4'>
                <div className='flex items-center gap-3 pl-2 pr-10 w-[200px] py-1 left-bar-item'>
                    <img className='w-[40px] rounded-full opacity-[0.8] ' src="https://cdn2.iconfinder.com/data/icons/celer-iconset/128/Messages.png" alt="" />
                    <span className='text-[#333]'>Message</span>
                </div>
            </div>
            <div className='flex items-center gap-3 pt-4'>
                <div className='flex items-center gap-3 pl-2 pr-10 w-[200px] opacity-[0.8] py-1 left-bar-item'>
                    <img className='w-[40px] rounded-full' src="https://cdn4.iconfinder.com/data/icons/miscellaneous-icons-1/200/misc_game_multiplayer-512.png" alt="" />
                    <span className='text-[#333]'>Friends</span>
                </div>
            </div>
            
            <div className='flex items-center gap-3 pt-4'>
                <div className='flex items-center gap-3 pl-2 pr-10 w-[200px] opacity-[0.8] py-1 left-bar-item'>
                    <img className='w-[40px] rounded-full ' src="https://cdn4.iconfinder.com/data/icons/miscellaneous-icons-3/200/misc_users-512.png" alt="" />
                    <span className='text-[#333]'>Groups</span>
                </div>
            </div>

            <div className='flex items-center gap-3 pt-4'>
                <div className='flex items-center gap-3 pl-2 pr-10 w-[200px] opacity-[0.8] py-1 left-bar-item'>
                    <img className='w-[40px] rounded-full ' src="https://cdn4.iconfinder.com/data/icons/miscellaneous-icons-2-1/200/misc_picture-64.png" alt="" />
                    <span className='text-[#333]'>pictures</span>
                </div>
            </div>

            <div className='flex items-center gap-3 pt-4'>
                <div className='flex items-center gap-3 pl-2 pr-10 w-[200px] opacity-[0.8] py-1 left-bar-item'>
                    <img className='w-[40px] rounded-full ' src="https://cdn1.iconfinder.com/data/icons/digital-marketing-351/52/29-64.png" alt="" />
                    <span className='text-[#333]'>Videos</span>
                </div>
            </div>

        </div>
    );
}

export default Leftbar;