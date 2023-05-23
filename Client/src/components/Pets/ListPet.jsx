import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { makeRequest } from '~/axios';
import Loading from '../Loading/Loading';

function ListPet(props) {
    const {userId} = props;
    const [showMedicalBook, setShowMedicalBook] = useState(false);
    const petFetch = useQuery({
        queryKey: ["pets", userId],
        queryFn: async () => {
            const res = await makeRequest.get(`/pet?idUser=${userId}`);
            return res.data;
        },
        });
    const handleChooiseMedicalBook = (pet)=>{
        setShowMedicalBook(true);
        props.onChooisePet(pet);
        props.onClosePost();
    }
    return (
        <div className='flex flex-col rounded-xl border-[#d9d9d9] mt-4 pb-16 border-b'>
                <div className='flex flex-col gap-4'>
                    <h1 className='text-[#333] text-[16px]'>Pets Family:</h1>
                    {
                        petFetch.isLoading?
                        <Loading/>
                        :
                        petFetch.data.map((pet)=>(
                            <div onClick={()=>handleChooiseMedicalBook(pet)} key = {pet.id_pet} className='flex gap-3 cursor-pointer items-center'>
                                <div className="flex justify-center items-center w-[60px] h-[60px] rounded-xl overflow-hidden">
                                    <img className="object-cover w-full h-full" src={pet.avatar} alt="" />
                                </div>
                                <div className='flex flex-col'>
                                    <h1 className='text-[#333] font-semibold text-[18px]'>{pet.name}</h1>
                                    <p className='text-[#555] text-[13px]'>({pet.breed})</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div>
                    
                </div>
        </div>
    );
}

export default ListPet;