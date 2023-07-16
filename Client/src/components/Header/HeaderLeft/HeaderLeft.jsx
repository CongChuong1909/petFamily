import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { makeRequest } from '~/axios';
import Search from '~/components/Search/Search';

function HeaderLeft(props) {
    // const [anchorEl, setAnchorEl] = useState(null);
    const {viewSearch, setViewSearch} = props
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    const [searchTerm, setSearchTerm] = useState('');
    const historyFecth = useQuery({
        queryKey: ["history"],
        queryFn: async () => {
          const res = await makeRequest.get(`/search`);
          return res.data;
        },
      });
    const mutationAdd = useMutation((searchTerm)=>{
        return makeRequest.post("/search/add", searchTerm)
    },
    {
        onSuccess:()=>{
            queryClient.invalidateQueries(["history"]);
        }
    })
    const handleSearh = (event)=>{
        if (event.key === "Enter") {
            mutationAdd.mutate({history: searchTerm});
            const encodeSearch = encodeURIComponent(searchTerm)
            navigate(`/search/${encodeSearch}`)
            setViewSearch(false)
        }
    }
    return (
        <div className='header-left flex justify-between gap-5 items-center'>
            <div className="logo">
                <h2 className='text-[18px] font-bold flex gap-1 items-center'><img width={50}  src="https://res.cloudinary.com/dohmfb8tt/image/upload/v1685933682/img_pet_social/f8jpd6lm1kkialof5lgx.png" alt="" />PETFAMILY</h2>
            </div>
            <div className='flex justify-between gap-5'>
                <Link to ='/'>
                    <i className="fa-duotone fa-house-chimney cursor-pointer p-3 text-[18px]"></i>
                </Link>
                <i className="fa-light fa-moon cursor-pointer p-3 text-[18px]"></i>
                <i className="fa-solid fa-grid-2 cursor-pointer p-3 text-[18px]"></i>
            </div>
            <div className='relative'>
                <div className="search flex items-center gap-[10px] border border-[#5c6d82] rounded-lg pl-[14px] ">
                    <i className="fa-regular fa-magnifying-glass"></i>
                    <input onChange={(e)=> setSearchTerm(e.target.value)} onKeyDown={handleSearh} onClick={()=> setViewSearch(true)} className='border-none outline-none w-[500px] bg-[#49596e] text-[#fff] py-2 px-3'  type="text" placeholder="Tìm kiếm..." />
                </div>
               {viewSearch && historyFecth.isSuccess && <Search history = {historyFecth.data} setViewSearch = {setViewSearch} searchTerm = {searchTerm} />} 
            </div>
        </div>
    );
}

export default HeaderLeft;