import React from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
function HeaderRight(props) {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <div className='flex justify-between gap-4 items-center'>
                <i className="fa fa-user text-[18px] font-bold cursor-pointer p-2"></i>
               <Link to={"/chat"}>
                <i className="fa fa-commenting font-bold text-[18px] cursor-pointer p-2"></i>  
               </Link>
                <i className="fa fa-bell text-[18px] font-bold cursor-pointer p-2"></i>
                <Link className='flex justify-center items-center' to={`/profile/${currentUser.idUser}`}>
                    <div className='flex justify-between  gap-2 items-center cursor-pointer'>
                        <div className='rounded-[50%] w-[40px] h-[40px] overflow-hidden'>
                         <img className='w-[40px] border border-[#ccc]' src={currentUser.avatar} alt="" />
                        </div>
                        <span>{currentUser.name}</span>
                    </div>
                </Link>
        </div>
    );
}

export default HeaderRight;