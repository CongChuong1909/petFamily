import React from 'react';
import ViewListFriendItem from './ViewListFriendItem';

function ViewListFriend(props) {
    const {listUser, setShowList} = props
    return (
        <div onClick={()=> setShowList(false)} className={` modal overflow-hidden fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.75)] z-50 flex justify-center items-center`}>
            <div
                onClick={(e)=> {setShowEmoji(false); e.stopPropagation();}}
                className={`modal-content bg-[#fff] p-5 rounded-md shadow-2xl max-w-[540px] max-h-[92%] thin-scroll overflow-y-auto overflow-x-visible z-10 w-full relative`}
            >
                <div className='border_bottom p-3 '>
                    <p className='text-[#333] font-semibold text-[20px]'>Friends:</p>
                </div>
                <div className='overflow-x-auto thin-scroll h-[200px]'>
                    {
                        listUser.map((item)=>(
                           <ViewListFriendItem item = {item} key = {item}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default ViewListFriend;