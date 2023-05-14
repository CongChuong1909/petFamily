import React from 'react';
import { Link } from 'react-router-dom';

function HeaderLeft(props) {
    return (
        <div className='header-left flex justify-between gap-5 items-center'>
            <div className="logo">
                <h2 className='text-[18px] font-bold'>CONGCHUONG</h2>
            </div>
            <div className='flex justify-between gap-5'>
                <Link to ='/'>
                    <i className="fa-duotone fa-house-chimney cursor-pointer p-3 text-[18px]"></i>
                </Link>
                <i className="fa-light fa-moon cursor-pointer p-3 text-[18px]"></i>
                <i className="fa-solid fa-grid-2 cursor-pointer p-3 text-[18px]"></i>
            </div>
            <div>
                <div className="search flex items-center gap-[10px] border border-[#ccc] rounded-lg p-[5px] ">
                    <i className="fa-regular fa-magnifying-glass"></i>
                    <input className='border-none outline-none w-[500px] text-[#333]' type="text" placeholder="Search..." />
                </div>
            </div>
        </div>
    );
}

export default HeaderLeft;