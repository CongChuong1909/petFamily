import React, { useEffect, useState } from 'react';
import HeaderLeft from './HeaderLeft/HeaderLeft';
import HeaderRight from './HeaderRight/HeaderRight';

function Header(props) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
  
    useEffect(() => {
        const handleScroll = () => {
          const currentScrollPos = window.pageYOffset;
          const visibleThreshold = 100; // Ngưỡng scroll để hiển thị header
          
          setIsScrolled(currentScrollPos > prevScrollPos && currentScrollPos > visibleThreshold);
          setPrevScrollPos(currentScrollPos);
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [prevScrollPos]);
    return (
        <div className={`header ${isScrolled ? 'scroll-up' : ''} bg-[#34465d] text-[#f5f5f5] flex justify-between w-full h-[70px] px-8 border-b border-[#ccc]`}>
           <HeaderLeft/>
           <HeaderRight/>
        </div>
    );
}

export default Header;