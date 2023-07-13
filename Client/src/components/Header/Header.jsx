import React, { useEffect, useState } from 'react';
import HeaderLeft from './HeaderLeft/HeaderLeft';
import HeaderRight from './HeaderRight/HeaderRight';

const MemoizedHeaderLeft = React.memo(HeaderLeft);
const MemoizedHeaderRight = React.memo(HeaderRight);

function Header(props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [viewSearch, setViewSearch] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const handleScroll = () => {
      if (isMounted) {
        const currentScrollPos = window.pageYOffset;
        const visibleThreshold = 100;

        setIsScrolled(
          currentScrollPos > prevScrollPos && currentScrollPos > visibleThreshold
        );
        setPrevScrollPos(currentScrollPos);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      isMounted = false;
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div
      className={`header ${isScrolled && !viewSearch ? 'scroll-up' : ''} bg-[#34465d] text-[#f5f5f5] flex justify-between w-full h-[70px] px-8 border-b border-[#ccc]`}
    >
      <MemoizedHeaderLeft viewSearch = {viewSearch} setViewSearch = {setViewSearch}/>
      <MemoizedHeaderRight />
    </div>
  );
}

export default Header;
