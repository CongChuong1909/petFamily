import React from 'react';
import PetCharacterItem from './UI/PetCharacterItem';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '~/axios';

function PetCharacter(props) {
    const queryClient = useQueryClient();
    const {petId, isView} = props

    const fetchPetCharacter = async () => {
      const res = await makeRequest.get(`/petdetail/getpetcharacter?id=${petId}`);
      return res.data;
    };
  
    const petFetch = useQuery(['petCharacter', petId], fetchPetCharacter);
    // petFetch.isSuccess && console.log(petFetch.data[0]);
    // =>{
    //     id:"1",
    //     idpet:"4cEMIr5i5r",
    //     isActive:0,
    //     isFriendlyWithCat:0,
    //     isFriendlyWithChild:0,
    //     isFriendlyWithDog:0,
    //     isShy:0,
    //     isToiletRightPlace:0
    // }
    const petCharacterItems = petFetch.isSuccess ?[
        { name: 'isFriendlyWithDog', value: petFetch.data[0].isFriendlyWithDog },
        { name: 'isFriendlyWithCat', value: petFetch.data[0].isFriendlyWithCat },
        { name: 'isFriendlyWithChild', value: petFetch.data[0].isFriendlyWithChild },
        { name: 'isToiletRightPlace', value: petFetch.data[0].isToiletRightPlace },
        { name: 'isShy', value: petFetch.data[0].isShy },
        { name: 'isActive', value: petFetch.data[0].isActive },
      ]:[];
    return (
        <div className='col-span-2 item'>
            <div className='flex gap-1 items-center'><img className='w-[32px]' src="https://cdn-icons-png.flaticon.com/512/1509/1509840.png" alt="" /><p>Tính cách</p></div>
            {petFetch.isSuccess &&
               <div className='grid grid-cols-2'>
                    <div className='col-span-1 flex items-start ml-5 flex-col gap-4'>
                        {petCharacterItems.slice(0, 3).map(item => (
                        <PetCharacterItem isView = {isView} key={item.name} item = {item} data = {petFetch.data[0]}/>
                        ))}
                    </div>
                    <div className='col-span-1 flex items-start ml-5 flex-col gap-4'>
                        {petCharacterItems.slice(3, 6).map(item => (
                        <PetCharacterItem isView = {isView} key={item.name} item = {item} data = {petFetch.data[0]}/>
                        ))}
                    </div>
             </div>
            }
        </div>
    );
}

export default PetCharacter;