import React from 'react';

function Leftbar(props) {
    return (
        <div className='grid grid-cols-1 bg-[#fff] px-5'>
            <div className='flex items-center gap-3 pt-4'>
                <div className='flex items-center gap-3 pl-2 pr-10 w-[200px] py-1 left-bar-item'>
                    <img className='w-[40px] rounded-full border border-[#ccc]' src="data:image/jpeg;base64,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" alt="" />
                    <span className='text-[#333]'>Công Chương</span>
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