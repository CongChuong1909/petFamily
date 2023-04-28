import React from 'react';

function Suggets(props) {
    return (
        <div className='item mt-5'>
            <h4 className='text-[#999] pb-2  border-b border-[#ccc]'>Suggestions For You</h4>
           <div className='flex gap-3 justify-between pb-3 pt-3'>
                <div className='flex gap-3 items-center'>
                    <img className='w-[40px] h-[40px] rounded-full ' src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
                    <span>Jane Doe</span>   
                </div>
                <div className='flex gap-3 items-center'>
                    <button className='border-none outline-none px-3 py-1 text-[12px] text-[#fff] bg-[#5271ff] rounded-md'>follow</button>
                    <button className='border-none outline-none px-3 py-1 text-[12px] text-[#fff] bg-[#f0544f] rounded-md'>Dismiss</button>
                </div>
           </div>
           <div className='flex gap-3 justify-between pb-3'>
                <div className='flex gap-3 items-center'>
                    <img className='w-[40px] h-[40px] rounded-full ' src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
                    <span>Jane Doe</span>   
                </div>
                <div className='flex gap-3 items-center'>
                    <button className='border-none outline-none px-3 py-1 text-[#fff] text-[12px] bg-[#5271ff] rounded-md'>follow</button>
                    <button className='border-none outline-none px-3 py-1 text-[#fff] text-[12px] bg-[#f0544f] rounded-md'>Dismiss</button>
                </div>
           </div>
        </div>
    );
}

export default Suggets;