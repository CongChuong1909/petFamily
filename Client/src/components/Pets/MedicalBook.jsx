import { Box, Button, Checkbox, Collapse, FormControl, FormControlLabel, FormGroup, FormLabel, Popover, Radio, RadioGroup, Step, StepContent, StepLabel, Stepper, BottomNavigation } from '@mui/material';
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
import CreateFindPost from './FindPet/CreateFindPost';
import { useMutation } from '@tanstack/react-query';
import { makeRequest } from '~/axios';
// Component tùy chỉnh cho biểu tượng của bước

function MedicalBook(props) {
    const {pet, isView} = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [showFindPet, setShowFindPet] = useState(false);
    const [valueChoice, setValueChoice] = useState('');
    const [text, setText] = useState('');
    const [viewImage, setViewImage] = useState(false);
    const [image, setImage] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const mutationUpdate = useMutation(
        (updateValue)=>{
        return makeRequest.put("findpet/update", updateValue)
        },{
        onSuccess:()=>{
        }
      })

    const handleChangeStatus = () =>{
        setViewImage(true);
        console.log(valueChoice);
        const values = {
            idPet: pet.id_pet,
            method: valueChoice,
        }
        if(valueChoice === 'isfind')
        {
            setText('Chúc mừng bạn đã tìm thấy thú cưng của mình 😊')
            setImage('https://res.cloudinary.com/dohmfb8tt/image/upload/v1690093501/z4540213622240_ed5c10d767fe30a03fc4598566a99bdc_jdcjg8.jpg')
            mutationUpdate.mutate(values);
        }
        if(valueChoice === 'isKeepPostLost')
        {
            setText('Chúng tôi sẽ cố gắng hết sức 😓')
            setImage('https://res.cloudinary.com/dohmfb8tt/image/upload/v1690093501/banner-ads6_jdlyb9.png')
            
        }
        if(valueChoice === 'isDeletePostLost')
        {
            setText('Xin lỗi, chúng tôi đã cố gắng hết sức 😓')
            setImage('https://res.cloudinary.com/dohmfb8tt/image/upload/v1690093500/woman-giving-comfort-support-friend_74855-5301_pgr6bz.avif')
            mutationUpdate.mutate(values);
        }
    }
    
    return (
        <div className='border grid border-[#f5f5f5] rounded-md'>
            {
                showFindPet && <CreateFindPost pet = {pet} handleCloseFindPost = {()=> setShowFindPet(false)} showFindPet = {showFindPet}/>
            }
            {
                !isView &&
                    <div className=' pb-3 border-b border-[#ccc] relative'>
                        <div className=' flex flex-col justify-center items-center'>
                            <div className="flex justify-center items-center w-[60px] h-[60px] rounded-xl overflow-hidden">
                                <img className="object-cover w-full h-full" src={pet.avatar} alt="" />
                            </div>
                            <h1 className='text-[#222] text-[22px] font-bold'>{pet.name}</h1>
                        </div> 
                        <div className='absolute right-0 top-0 p-2 bg-[#fd5454cc] rounded-md text-[#fff]'>
                           {pet.status_lost === 0 ? <button onClick={()=> setShowFindPet(true)} className='flex gap-2 items-center'><img width={30} src="https://media.istockphoto.com/id/1451599281/vi/vec-to/loa-3d-loa-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-th%E1%BB%B1c-t%E1%BA%BF-bi%E1%BB%83u-ng%E1%BB%AF-tin-t%E1%BB%A9c-kinh-doanh-th%C3%B4ng-b%C3%A1o-%C6%B0u-%C4%91%C3%A3i-gi%E1%BA%A3m-gi%C3%A1-b%E1%BA%B1ng-loa.jpg?s=170667a&w=0&k=20&c=ydFg1e2_ckxeJ-JjBSCe159F1En9tKCQPxEnAtamQ34=" alt="" /> Báo mất thú cưng</button>:
                           <button onClick={(e)=> setAnchorEl(e.currentTarget)} className='flex gap-2 items-center'><img width={30} src="https://media.istockphoto.com/id/1451599281/vi/vec-to/loa-3d-loa-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-th%E1%BB%B1c-t%E1%BA%BF-bi%E1%BB%83u-ng%E1%BB%AF-tin-t%E1%BB%A9c-kinh-doanh-th%C3%B4ng-b%C3%A1o-%C6%B0u-%C4%91%C3%A3i-gi%E1%BA%A3m-gi%C3%A1-b%E1%BA%B1ng-loa.jpg?s=170667a&w=0&k=20&c=ydFg1e2_ckxeJ-JjBSCe159F1En9tKCQPxEnAtamQ34=" alt="" /> Cập nhật tình trạng</button>
                           
                           }
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={()=> setAnchorEl(null)}
                                anchorPosition={{ top: 0, left: 443 }}
                                anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                                }}
                                sx={{
                                    top: '14px'
                                }}
                            >
                                <div className='p-3'>
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label">Tình trạng thú cưng được báo mất</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                            onChange={(e)=> setValueChoice(e.target.value)}
                                        >
                                            <FormControlLabel value="isfind" control={<Radio />} label="Đã tìm thấy" />
                                            <FormControlLabel value="isKeepPostLost" control={<Radio />} label="Chưa tìm thấy (giữ bài viết tìm kiếm)" />
                                            <FormControlLabel value="isDeletePostLost" control={<Radio />} label="Chưa tìm thấy (Xóa bài viết tìm kiếm)" />
                                        </RadioGroup>
                                        <button onClick={handleChangeStatus} className='flex p-2 bg-[#ccc] text-[#333] rounded-md justify-center hover:bg-[#bbb] transition-all'>Xác nhận</button>
                                    </FormControl>
                                </div>
                                </Popover>

                        </div>
                    </div>

            }
            
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
                            <PetWeight isView = {isView} petId = {pet.id_pet}/>
                            <PetVaccination isView = {isView} petId = {pet.id_pet}/>
                            <PetHealth isView = {isView} petId = {pet.id_pet}/>
                        </div>
                        {/* Sổ giun */}
                        <div className='col-span-1 '>
                            <PetMedicine isView = {isView} petId = {pet.id_pet}/>
                            <PetFood isView = {isView} petId = {pet.id_pet}/>
                            <PetAllergy isView = {isView} petId = {pet.id_pet}/>
                        </div>
                        <PetCharacter isView = {isView} petId = {pet.id_pet}/>
                    </div>
                </div>
            </div>
            <div onClick={()=> setViewImage(false)} className={`${viewImage ? ' opacity-1 block' : 'opacity-0 hidden'}  modal overflow-hidden fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.75)] z-[999] flex justify-center items-center`}>
                <div
                    onClick={(e)=> {e.stopPropagation();}}
                    className={` ${viewImage ? ' fadeDown translate-x-[0]' : ' translate-x-[-100%]'} modal-content bg-[#fff] p-5 rounded-md shadow-2xl max-w-[700px] max-h-[92%] thin-scroll overflow-y-auto overflow-x-visible z-10 w-full relative`}
                >
                    <h1 className='text-[#333] font-bold text-[22px]'>{text}</h1>
                    <img src={image} alt="" />
                </div>
            </div>
        </div>
    );
}

export default MedicalBook;