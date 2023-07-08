import { Box, Button, Checkbox, Collapse, FormControl, FormControlLabel, FormGroup, FormLabel, Step, StepContent, StepLabel, Stepper } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import StepIcon from '@mui/material/StepIcon';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PetWeight from './PetDetail/PetWeight';
import PetVaccination from './PetDetail/PetVaccination';
import PetHealth from './PetDetail/PetHealth';
import PetMedicine from './PetDetail/petMedicine';
import PetFood from './PetDetail/PetFood';
import PetAllergy from './PetDetail/PetAllergy';
import PetCharacter from './PetDetail/PetCharacter';
// Component tùy chỉnh cho biểu tượng của bước

function MedicalBook(props) {
    const {pet} = props;
    const steps = [
        {
          label: 'Lần gần nhất',
          date: `12/01/2023`,
        },
        {
          label: 'Lần tiếp theo',
          date:
            '12/04/2023',
        },
      ];
      
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
                <div className='h-full'>
                    <div className='grid grid-cols-2 gap-6'>
                        {/* weight */}
                        <div className='col-span-1'>
                            <PetWeight petId = {pet.id_pet} steps = {steps}/>
                            <PetVaccination petId = {pet.id_pet} steps = {steps}/>
                            <PetHealth petId = {pet.id_pet} steps = {steps}/>
                        </div>
                        {/* Sổ giun */}
                        <div className='col-span-1 '>
                            <PetMedicine petId = {pet.id_pet} steps = {steps}/>
                            <PetFood petId = {pet.id_pet}/>
                            <PetAllergy petId = {pet.id_pet} steps = {steps}/>
                        </div>
                        <PetCharacter/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MedicalBook;