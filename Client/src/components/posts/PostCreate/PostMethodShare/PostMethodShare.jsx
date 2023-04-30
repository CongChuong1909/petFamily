import React, { useEffect, useState } from 'react';

function PostMethodShare(props) {

    const [viewMethodShare, setViewMethodShare] = useState(false);
    const [methodShare, setMethodShare] = useState('public')
    const handleViewOptionMethodShare = () =>{
        setViewMethodShare(!viewMethodShare);
    }

    return (
        <div className='relative col-span-2'>
            {methodShare === 'public' ? 
                <div onClick={handleViewOptionMethodShare} className=' flex items-center bg-[#ddd] px-2 rounded-lg cursor-pointer'>
                    <i className="fa-solid fa-earth-americas text-[14px]"></i>
                    <p className='pl-2  pr-3 text-[14px]'>Public</p>
                    <i className="fa-sharp fa-solid fa-caret-down text-[14px]"></i>
                </div> :
                <div onClick={handleViewOptionMethodShare} className=' flex items-center bg-[#ddd] px-2 rounded-lg cursor-pointer'>
                    <i className="fa-solid fa-users-line text-[14px]"></i>
                    <p className='pl-2  pr-3 text-[14px]'>Private</p>
                    <i className="fa-sharp fa-solid fa-caret-down text-[14px]"></i>
                </div> 
            
            }
            
            <div
                className={`${
                viewMethodShare ? 'block' : 'hidden'
                } origin-top-right absolute left-0 mt-2 w-80 rounded-md shadow-lg bg-[#fff] ring-1 ring-black ring-opacity-5 z-20 transition ease-out duration-100`}
            >
                <div className="py-1 pl-2 pr-6" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <div onClick={()=> setViewMethodShare(false)} className='absolute right-0 flex justify-end p-2 cursor-pointer method-share_close rounded-md'><i className="fa-light fa-x"></i></div>
                    <div onClick={()=>{setMethodShare('public'); setViewMethodShare(false)}} className='py-2 method-share cursor-pointer'>
                        <div className='flex gap-3 items-center px-2 text-[#555] font-bold'>
                            <i className="fa-solid fa-earth-americas "></i> <h2>Share Public</h2>
                        </div>
                        <div className='px-2'>
                            <p className='text-[13px] text-[#999]'>Everyone on petFamily see post</p>
                        </div>
                    </div>
                    
                    
                    <div onClick={()=>{setMethodShare('private'); setViewMethodShare(false)}} className='py-2 method-share cursor-pointer'>
                        <div className='flex gap-3 items-center px-2 text-[#555] font-bold'>
                        <i className="fa-solid fa-users-line"></i> <h2>Share Private</h2>
                        </div>
                        <div className='px-2'>
                        <p className='text-[13px] text-[#999]'>Only your friend see post</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostMethodShare;