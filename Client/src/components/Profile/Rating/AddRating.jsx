import { Button, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { makeRequest } from '~/axios';

function AddRating(props) {
    const {idProfileVeterinarian}= props;
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const queryClient = useQueryClient();
    const handleRating = (rating)=>{
        setRating(rating);
    }

    const mutationAddRating = useMutation(
        (rating) => {
            return makeRequest.post("/rating/addRating", rating);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["rating"]);
            },
        },
    );

    const handleAddRating = ()=>{
        if(rating === 0)
            alert("vui lòng đánh giá sao")
        else{
            const value = {
                idVeterinarian:idProfileVeterinarian,
                rating,
                title,
                comment
            };
            mutationAddRating.mutate(value);
            props.onClose();
        }
        
    }

    return (
        <div className='border border-[#999] rounded-lg item'>
            <div className='flex justify-end  '>
                <i onClick={()=>props.onClose()} className="text-[#fff] p-2 cursor-pointer rounded-lg bg-[#ff3939] fa-regular fa-x"></i>
            </div>
            <div className='flex gap-4'>
                <p>Đánh giá của bạn là</p>
                <div className="flex items-center mb-1">
                    <svg aria-hidden="true" onClick={()=>handleRating(1)} className={`w-7 h-7 ${rating >= 1?'text-[#e3a008]': 'text-[#ccc]' }`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"> </path></svg>
                    <svg aria-hidden="true" onClick={()=>handleRating(2)} className={`w-7 h-7 ${rating >= 2?'text-[#e3a008]': 'text-[#ccc]' }`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg aria-hidden="true" onClick={()=>handleRating(3)} className={`w-7 h-7 ${rating >= 3?'text-[#e3a008]': 'text-[#ccc]' }`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg aria-hidden="true" onClick={()=>handleRating(4)} className={`w-7 h-7 ${rating >= 4?'text-[#e3a008]': 'text-[#ccc]' }`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg aria-hidden="true" onClick={()=>handleRating(5)} className={`w-7 h-7 ${rating >= 5?'text-[#e3a008]': 'text-[#ccc]' }`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                </div>
            </div>
            <div>
                <TextField
                    label="Tiêu đề đánh giá"
                    fullWidth
                    autoComplete="cc-name"
                    variant="standard"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Nội dung đánh giá"
                    fullWidth
                    autoComplete="cc-name"
                    variant="standard"
                    multiline
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>
            <div className='mt-5 flex justify-center'>
                <Button onClick={handleAddRating} variant="contained">Thêm</Button>
            </div>
        </div>
    );
}

export default AddRating;