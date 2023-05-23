import moment from 'moment';
import React from 'react';

function MedicalBook(props) {
    const {pet} = props;
    console.log(pet);
    return (
        <div className='border grid border-[#f5f5f5] rounded-md'>
             <div className=' flex justify-center items-center pb-3 border-b border-[#ccc]'>
                <div className="flex justify-center items-center w-[60px] h-[60px] rounded-xl overflow-hidden">
                    <img className="object-cover w-full h-full" src={pet.avatar} alt="" />
                </div>
                <h1>{pet.name}</h1>
            </div> 
            <div className=''>
                <div className='flex gap-5 justify-center'>
                    <div className='flex flex-col justify-center items-center item'>
                        <img className='w-10 h-10' src="https://cdn-icons-png.flaticon.com/512/1186/1186539.png" alt="" />
                        <p className='text-[#333] font-semibold text-[14px]'>{pet.breed}</p>
                    </div>
                    <div className='flex flex-col justify-center items-center item'>
                        <img className='w-10 h-10' src="https://cdn-icons-png.flaticon.com/512/2545/2545910.png" alt="" />
                        <p className='text-[#333] font-semibold text-[14px]'>{pet.gender}</p>
                    </div>
                    <div className='flex flex-col justify-center items-center item'>
                        <img className='w-10 h-10' src="https://cdn-icons-png.flaticon.com/512/4525/4525667.png" alt="" />
                        <p className='text-[#333] font-semibold text-[14px]'>{moment(pet.age).format("DD/MM/YYYY")}</p>
                    </div>
                </div>
                <div className='h-[400px]'>
                    Updating.....
                </div>
            </div>
           
        </div>
    );
}

export default MedicalBook;