import React from 'react';

function ViewListFriend(props) {
    return (
        <div className={`${props.show ? ' opacity-1 block' : 'opacity-0 hidden'}  modal overflow-hidden fixed top-0 left-0 w-full h-full bg-rgba_background-button_header z-50 flex justify-center items-center`}>
            <div
                onClick={(e)=> {setShowEmoji(false); e.stopPropagation();}}
                className={` ${props.show ? ' fadeDown translate-x-[0]' : ' translate-x-[-100%]'} modal-content bg-[#fff] p-5 rounded-md shadow-2xl max-w-[540px] max-h-[92%] thin-scroll overflow-y-auto overflow-x-visible z-10 w-full relative`}
            >
                <div className='border_bottom p-3 '>
                    <p className='text-[#333] font-semibold text-[20px]'>Friends:</p>
                </div>
                <div className='overflow-x-auto thin-scroll h-[200px]'>
                    <div className='col-span-6 flex gap-3 items-center my-4 justify-between'>
                                <div className='flex gap-3 items-center'>
                                    <img className='w-[40px] h-[40px] rounded-full ' src='https://res.cloudinary.com/dohmfb8tt/image/upload/v1683941671/img_pet_social/sriai4tzvxmj8poni39x.jpg' alt="" />
                                    <h3 className='text-[16px] font-semibold'>aaaa</h3> 
                                </div>
                                <div>
                                    <p className='text-[13px] text-[#333]'>Following</p>
                                </div>
                    </div>
                    <div className='col-span-6 flex gap-3 items-center my-4 justify-between'>
                                <div className='flex gap-3 items-center'>
                                    <img className='w-[40px] h-[40px] rounded-full ' src='https://res.cloudinary.com/dohmfb8tt/image/upload/v1683941671/img_pet_social/sriai4tzvxmj8poni39x.jpg' alt="" />
                                    <h3 className='text-[16px] font-semibold'>aaaa</h3> 
                                </div>
                                <div>
                                    <p className='text-[13px] text-[#333]'>Following</p>
                                </div> 
                    </div>
                    <div className='col-span-6 flex gap-3 items-center my-4 justify-between'>
                                <div className='flex gap-3 items-center'>
                                    <img className='w-[40px] h-[40px] rounded-full ' src='https://res.cloudinary.com/dohmfb8tt/image/upload/v1683941671/img_pet_social/sriai4tzvxmj8poni39x.jpg' alt="" />
                                    <h3 className='text-[16px] font-semibold'>aaaa</h3> 
                                </div>
                                <div>
                                    <p className='text-[13px] text-[#333]'>Following</p>
                                </div> 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewListFriend;