
import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import Account from '~/components/Header/HeaderRight/Account/Account';
import Notification from './Notification/Notification';
function HeaderRight(props) {
    const { currentUser } = useSelector((state) => state.user);
    const [minus, setMinus] = useState(false);
    return (
        <div className={`flex justify-between gap-4 items-center pr-4 ${minus ? 'mr-[5px]': ''}`}>
                <i className="fa fa-user text-[18px] font-bold cursor-pointer p-2"></i>
               <Link to={"/chat"}>
                <i className="fa fa-commenting font-bold text-[18px] cursor-pointer p-2"></i>  
               </Link>
               <Notification setMinus = {setMinus}/>
                
                {/* <Link className='flex justify-center items-center' to={`/profile/${currentUser.idUser}`}>
                    <div className='flex justify-between  gap-2 items-center cursor-pointer'>
                        <div className='rounded-[50%] w-[40px] h-[40px] overflow-hidden'>
                         <img className='w-[40px] border border-[#ccc]' src={currentUser.avatar} alt="" />
                        </div>
                        <span>{currentUser.name}</span>
                    </div>
                </Link> */}
                <Account setMinus = {setMinus} minus = {minus} currentUser = {currentUser} name = {currentUser.name} avatar = {currentUser.avatar}/>
        </div>
    );
}

export default HeaderRight;