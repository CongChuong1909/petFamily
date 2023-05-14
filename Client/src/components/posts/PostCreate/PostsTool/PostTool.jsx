import React from 'react';
import PostTag from '../PostTag/PostTag';
import { useSelector } from 'react-redux';

function PostTool(props) {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <div className='item mt-5'>
            <div className='flex justify-between'>
            <div className='rounded-[50%] w-[60px] h-[50px] overflow-hidden'>
                <img className='w-[50px] rounded-full' src={currentUser.avatar} alt="" />
                </div>
                <input onFocus={props.onOpenCreatePost} className='p-3 w-full outline-none border-b border-[#ccc]' type="text" name="" id="" placeholder={`What is your mind ${currentUser.name}?`} />
                <div className='flex gap-2 items-center'>
                    <i className="text-[#999] text-[22px] fa-light fa-grid"></i>
                    <i className="text-[#999] text-[22px] fa-light fa-images"></i>
                    <i className="text-[#999] text-[22px] fa-regular fa-face-smile"></i>
                </div>
            </div>
            <PostTag/>
        </div>
    );
}

export default PostTool;