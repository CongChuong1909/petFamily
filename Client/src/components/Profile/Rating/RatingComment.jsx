import { Button, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { makeRequest } from '~/axios';

function RatingComment(props) {
    const {item} = props;
    const { currentUser } = useSelector((state) => state.user);
    const [showOptionRating, setShowOptionRating] = useState(false);
    const [showUpdateRating, setShowUpdateRating] = useState(false);
    const [titleUpdate, setTitleUpdate] = useState(item.title);
    const [commentUpdate, setComentUpdate] = useState(item.comment);
    const [ratingUpdate, setRatingUpdate] = useState(item.rating);
    const queryClient = useQueryClient();
    const handleRating = (rating)=>{
        setRatingUpdate(rating);
    }
    const mutationUpdateRating = useMutation(
        (rating) => {
            return makeRequest.put("/rating/updateRating", rating);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["rating"]);
            },
        },
    );

    const handleUpdateRating = ()=>{
        const values = {
            rating: ratingUpdate,
            comment: commentUpdate,
            title: titleUpdate,
            idfeedback: item.idfeedback,
            
        }
        mutationUpdateRating.mutate(values);
        setShowUpdateRating(false)
    }
    return (
        <article onClick={()=> setShowOptionRating(false)} className='border_bottom py-2'>
            <div className="flex relative items-center mb-4 space-x-4">
                <img className="w-10 h-10 rounded-full" src={item.avatar} alt=""/>
                <div className="space-y-1 font-medium dark:text-white">
                    <p>{item.name} <time dateTime="2014-08-16 19:00" className="block text-sm text-gray-500 dark:text-gray-400">Tham gia PetFamily vào {}{moment( item.date_create).format("MM/YYYY")}</time></p>
                </div>
                {item.iduser === currentUser.idUser &&
                    <div className='absolute right-0'>
                        <i onClick={(e)=>{e.stopPropagation();setShowOptionRating(!showOptionRating)}} className="fa-regular cursor-pointer fa-ellipsis"></i>
                    </div>
                }
                
                {showOptionRating&&
                    <div className="absolute z-30 right-0 top-[60%] mt-2 w-36 bg-[#fff] rounded-md shadow-lg">
                    <button
                        className="block select-none w-full text-left px-4 py-2 hover:bg-gray-100"
                         onClick={(e) => {e.stopPropagation(); setShowOptionRating(false); setShowUpdateRating(true)}}
                    >
                        Update
                    </button>
                    </div>
                }
            </div>
            
            {
                !showUpdateRating ?
                <>
                    <div className="flex items-center mb-1">
                        <svg aria-hidden="true" className={`w-5 h-5 ${item.rating >= 1?'text-[#e3a008]': 'text-[#ccc]' }`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className={`w-5 h-5 ${item.rating >= 2?'text-[#e3a008]': 'text-[#ccc]' }`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className={`w-5 h-5 ${item.rating >= 3?'text-[#e3a008]': 'text-[#ccc]' }`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className={`w-5 h-5 ${item.rating >= 4?'text-[#e3a008]': 'text-[#ccc]' }`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className={`w-5 h-5 ${item.rating >= 5?'text-[#e3a008]': 'text-[#ccc]' }`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <p className="ml-2 text-sm font-medium text-[#ccc] dark:text-white">{item.rating} out of 5</p>
                    </div>
                    <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400"><p>Đã đánh giá vào <time dateTime={moment(item.created_at).format('LLLL')}>{moment(item.created_at).format('LLLL')}</time></p></footer>
                    <p className="mb-2 text-[#222] font-semibold dark:text-gray-400">{item.title}</p>
                    <p className="mb-3 text-[#444] dark:text-gray-400">{item.comment}</p>
                </>:
                <>
                    <p>Đánh giá của bạn là</p>
                    <div className="flex items-center mb-1">
                        <svg aria-hidden="true" onClick={()=>handleRating(1)} className={`w-5 h-5 ${ratingUpdate >= 1?'text-[#e3a008]': 'text-[#ccc]' }`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"> </path></svg>
                        <svg aria-hidden="true" onClick={()=>handleRating(2)} className={`w-5 h-5 ${ratingUpdate >= 2?'text-[#e3a008]': 'text-[#ccc]' }`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" onClick={()=>handleRating(3)} className={`w-5 h-5 ${ratingUpdate >= 3?'text-[#e3a008]': 'text-[#ccc]' }`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" onClick={()=>handleRating(4)} className={`w-5 h-5 ${ratingUpdate >= 4?'text-[#e3a008]': 'text-[#ccc]' }`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" onClick={()=>handleRating(5)} className={`w-5 h-5 ${ratingUpdate >= 5?'text-[#e3a008]': 'text-[#ccc]' }`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    </div>
                        <TextField
                            label="Tiêu đề đánh giá"
                            fullWidth
                            autoComplete="cc-name"
                            variant="standard"
                            value={titleUpdate}
                            onChange={(e) => setTitleUpdate(e.target.value)}
                        />
                        <TextField
                            label="Nội dung đánh giá"
                            fullWidth
                            autoComplete="cc-name"
                            variant="standard"
                            multiline
                            rows={4}
                            value={commentUpdate}
                            onChange={(e) => setComentUpdate(e.target.value)}
                        />
                         <div className='mt-5 flex justify-center'>
                            <Button onClick={handleUpdateRating} variant="contained">Chỉnh sửa</Button>
                        </div>
                </>

            }
        </article>
    );
}

export default RatingComment;