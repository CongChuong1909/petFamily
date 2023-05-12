import React from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
function HeaderRight(props) {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <div className='flex justify-between gap-4 items-center'>
                <i className="fa-light fa-user text-[18px] font-normal cursor-pointer p-2"></i>
                <i className="fa-light fa-messages text-[18px] font-normal cursor-pointer p-2"></i>
                <i className="fa-light fa-bell text-[18px] font-normal cursor-pointer p-2"></i>
                <Link className='flex justify-center items-center' to="/profile">
                    <div className='flex justify-between gap-2 items-center cursor-pointer'>
                        <img className='w-[40px] rounded-full border border-[#ccc]' src={currentUser.avatar} alt="" />
                        <span>{currentUser.name}</span>
                    </div>
                </Link>
        </div>
    );
}

export default HeaderRight;