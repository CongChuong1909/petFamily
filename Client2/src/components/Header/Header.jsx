import React from 'react';
import HeaderLeft from './HeaderLeft/HeaderLeft';
import HeaderRight from './HeaderRight/HeaderRight';

function Header(props) {
    return (
        <div className='header flex justify-between w-full h-[70px] px-8 border-b border-[#ccc]'>
           <HeaderLeft/>
           <HeaderRight/>
        </div>
    );
}

export default Header;