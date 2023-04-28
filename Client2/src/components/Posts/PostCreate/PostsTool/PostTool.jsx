import React from 'react';
import PostTag from '../PostTag/PostTag';

function PostTool(props) {
    return (
        <div className='item mt-5'>
            <div className='flex justify-between'>
                <img className='w-[50px] h-[50px] rounded-full' src="https://hips.hearstapps.com/hmg-prod/images/close-up-of-cat-wearing-sunglasses-while-sitting-royalty-free-image-1571755145.jpg?crop=0.675xw:1.00xh;0.147xw,0&resize=1200:*" alt="" />
                <input onFocus={props.onOpenCreatePost} className='p-3 w-full outline-none border-b border-[#ccc]' type="text" name="" id="" placeholder='What is your mind Công Chương?' />
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