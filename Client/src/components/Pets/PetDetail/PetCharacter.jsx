import React from 'react';
import PetCharacterItem from './UI/PetCharacterItem';

function PetCharacter(props) {
    return (
        <div className='col-span-2 item'>
            <div className='flex gap-1 items-center'><img className='w-[32px]' src="https://cdn-icons-png.flaticon.com/512/1509/1509840.png" alt="" /><p>Tính cách</p></div>
            <div className='grid grid-cols-2'>
                <div className='col-span-1 flex items-center flex-col gap-4'>
                    <PetCharacterItem/>
                    <PetCharacterItem/>
                    <PetCharacterItem/>
                </div>
                <div className='col-span-1 flex items-center flex-col gap-4'>
                    <PetCharacterItem/>
                    <PetCharacterItem/>
                    <PetCharacterItem/>
                </div>
            </div>
        </div>
    );
}

export default PetCharacter;