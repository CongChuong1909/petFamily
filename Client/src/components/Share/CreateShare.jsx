import React, { useState } from 'react';
import Post from '../Posts/Post/Post';
import { useSelector } from 'react-redux';
import PostMethodShare from '../Posts/PostCreate/PostMethodShare/PostMethodShare';
import PostCategory from '../Posts/PostCreate/PostCategory/PostCategory';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '~/axios';

function CreateShare({postItem,isShare, setShowShare}) {
    const { currentUser } = useSelector((state) => state.user);
    const [listCategory, setListCategory] = useState([]);
    const { list } = useSelector((state) => state.relationship);
    const [textContent, setTextContent] = useState('');
    const queryClient = useQueryClient();
    console.log(listCategory);
    const mutationAddShare = useMutation(
        (newShare)=>{
        return makeRequest.post("share/addShare", newShare)
        },{
        onSuccess:()=>{
            setShowShare(false);
            queryClient.invalidateQueries(["posts"]);
        }
      })
      console.log(postItem);
    const handleAddShare = () =>{
        const values = {
            textContent: textContent,
            listFriend: list.filter((user) => user.user_followed === currentUser.idUser),
            listCategory: listCategory,
            idPostShare: postItem.idposts,
            idUserPost: postItem.idUser
        }
        mutationAddShare.mutate(values);
        setShowShare(false);
        setTextContent("");
        setListCategory([]);
    }
    return (
        <div className='popup_image' onClick={()=> setShowShare(false)}>
            <div onClick={(e)=> e.stopPropagation()} className='bg-[#fff] w-[600px] h-[700px] overflow-y-auto thin-scroll border border-[#333] rounded-md'>
                    <div className='w-[100%]   m-0 p-0 flex justify-between flex-col'>
                    <div className="grid grid-cols-9 mt-5 p-5">
                        <div className="row-span-2 col-span-1">
                            <img className="w-[50px] h-[50px] rounded-full" src={currentUser.avatar} alt="" />
                        </div>
                        <h1 className="col-span-8 text-[18px] font-semibold">{currentUser.name}</h1>
                        <PostMethodShare />
                    </div>
                        <div className='p-5'>
                            <textarea value={textContent} onChange={(e)=> setTextContent(e.target.value)} className='outline-none border-b border-[#999] w-full' rows={2} type="text" placeholder='Cảm nghĩ của bạn về bài viết...' />
                            <div>
                                Chọn chủ đề bài viết: <PostCategory setListCategory = {setListCategory}/>
                                <div onClick={handleAddShare} className='cursor-pointer p-2 flex justify-center items-center w-full mt-1 text-[#fff] bg-[#ffa000] rounded-lg'>
                                    CHIA SẺ
                                </div>
                            </div>
                        </div>
                        <div className='px-5'>
                            <div className='border border-[#333] rounded-md p-2'>
                                <Post postItem = {postItem} isShare = {isShare}/>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default CreateShare;