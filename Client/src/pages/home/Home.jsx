
import React from 'react';
import Header from '~/components/Header/Header';
import Leftbar from '~/components/Leftbar/Leftbar';
import Posts from '~/components/Posts/Posts';
import Rightbar from '~/components/Rightbar/Rightbar';
function Home(props) {
    return (
        <>
            <Header/>
            <div className='grid grid-cols-11 gap-8 bg-[#f6f3f3]'>
                <div className='col-span-2'>
                    <Leftbar/>
                </div>
                <div className='col-span-6'>
                    <Posts/>
                </div> 
                <div className='col-span-3'>
                    <Rightbar/>
                </div>                 
            </div>
        </>
    );
}

export default Home;