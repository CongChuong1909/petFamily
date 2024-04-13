import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';


function ListPets(props) {

    console.log(props.kind);

       const dogFetch = useQuery({
            queryKey: ["apidog"],
                queryFn: async () => {
                    const res = await axios(`https://api.thedogapi.com/v1/breeds`);
                    return res.data;
                },
                enabled: props.kind === 'dog'
            });

       const catFetch = useQuery({
            queryKey: ["apicat"],
                queryFn: async () => {
                    const res = await axios(`https://api.thecatapi.com/v1/breeds`);
                    return res.data;
                },
                enabled: props.kind === 'cat'
            });
    

    const handleChoisePet = (item, kind)=>{
        props.getCrossbred({...item, kind});
        props.closeListPet();
    }
    return (
        <div>
            {
                props.kind === 'dog'?
                <div className='flex justify-center'>
                    <div className='bg-[#fff] w-[50%] rounded-xl overflow-auto h-[600px] thin-scroll'>
                        {dogFetch.isLoading ?
                            <Loading/> :
                            dogFetch.data.map((item)=>(
                                <div onClick={()=>handleChoisePet(item,'dog')} key={item.id} className='flex item mx-4 items-center px-10 py-3 cursor-pointer item-kind '>
                                    <img className='w-20' src={`https://cdn2.thedogapi.com/images/${item.reference_image_id}.jpg`} alt="" />
                                    <h1 className='ml-3 text-[#333] font-semibold text-[18px]'>{item.name}</h1>
                                </div>
                            ))    
                        }
                    </div>
                </div>
                :
                <div className='flex justify-center'>
                    <div className='bg-[#fff] w-[50%] rounded-xl overflow-auto h-[600px] thin-scroll'>
                        {catFetch.isLoading ?
                            <Loading/> :
                            catFetch.data.map((item)=>(
                                <div onClick={()=>handleChoisePet(item,'cat')} key={item.id} className='flex item mx-4 items-center px-10 py-3 cursor-pointer'>
                                    <img className='w-20' src={`https://cdn2.thecatapi.com/images/${item.reference_image_id}.jpg`} alt="" />
                                    <h1 className='ml-3 text-[#333] font-semibold text-[18px]'>{item.name}</h1>
                                </div>
                            ))    
                        }
                    </div>
                </div>

            }
        </div>
    );
}

export default ListPets;