import { ThemeProvider } from '@mui/material/styles'; 
import { Avatar, Paper, Popover, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '~/axios';
import { useNavigate } from 'react-router-dom';
function Search(props) {
    const {searchTerm, history, setViewSearch} = props;
    const queryClient =useQueryClient();
    const navigate = useNavigate();
    const searchFetch = useQuery(["search", searchTerm], async () => {
        if(searchTerm === '') return [];

        const res = await makeRequest.get(`/search/finduser?searchTerm=${searchTerm}`);
        return res.data;
    });
    const mutationDelete = useMutation((id)=>{
        console.log(id);
        return makeRequest.delete(`/search/delete?idSearch=${id}`)
    },
    {
        onSuccess:()=>{
            queryClient.invalidateQueries(["history"]);
        }
    })
    const mutationAdd = useMutation((searchTerm)=>{
        return makeRequest.post("/search/add", searchTerm)
    },
    {
        onSuccess:()=>{
            queryClient.invalidateQueries(["history"]);
        }
    })
    const handleDelete = (id)=>{
        // console.log(id);
        mutationDelete.mutate(id);
    }
    const handleClickResult =(id)=> {
        navigate(`/profile/${id}`); 
        setViewSearch(false);
        mutationAdd.mutate({user: id})
    }
    return (
        <div className='fixed top-[70px] right-0 bottom-0 left-[25%]' onClick={()=>setViewSearch(false)}>   
           {searchFetch.isSuccess && 
           <Paper onClick = {(e)=> e.stopPropagation()} elevation={3} className='item absolute left-0 w-[620px]'>
                
                {
                    searchTerm === '' ?
                    <div>
                    <div className='flex items-center gap-3'>
                         <i className="fa-regular fa-magnifying-glass"></i>
                         <p className='font-bold'>Lịch sử tìm kiếm</p>
                     </div>
                     {
                         history.slice(0,5).map((item)=>{
                            if(item.user === null)
                            return <div key={item.idsearch} className='flex items-center justify-between py-2'><div className='flex items-center justify-between gap-4'><i className="fa-regular fa-clock"></i><span>{item.history}</span></div><i onClick={()=>handleDelete(item.idsearch)} className="fa-light cursor-pointer fa-x"></i></div>
                            else{
                                return <div key={item.idsearch} className='flex items-center justify-between py-2'>
                                        <div className='flex items-center justify-between gap-4'>
                                            <i className="fa-regular fa-clock"></i>
                                            <div className='flex items-center cursor-pointer py-2 gap-2' onClick={()=>handleClickResult(item.user)}>
                                                <Avatar src={item.avatar} />
                                                <p>{item.name}</p>
                                            </div>
                                        </div>
                                        <i onClick={()=>handleDelete(item.idsearch)} className="fa-light cursor-pointer fa-x"></i></div>
                            }
                        })
                     }
                    </div>:
                    <div className='flex font-semibold gap-2 items-center'>
                        <i className="fa-regular fa-magnifying-glass"></i>
                        <p>Tìm kiếm kết quả cho "{searchTerm}"</p>
                    </div> 
                }
                {searchFetch.data.map((item)=>(
                    <div className='flex items-center cursor-pointer py-2 gap-2' onClick={()=>handleClickResult(item.idUser)}>
                        <Avatar src={item.avatar} />
                        <p>{item.name}</p>
                    </div>
                ))}
            </Paper>
            }
        </div>
    );
}

export default Search;