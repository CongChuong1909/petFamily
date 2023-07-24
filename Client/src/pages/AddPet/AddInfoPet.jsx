import React, { useEffect, useRef, useState } from 'react';
import ListPets from './ListPets';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import uploadImages from '~/API/uploadAPI';
import { makeRequest } from '~/axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function AddInfoPet(props) {
    const {infoPet} = props;
    const [birthday, setBirthday] = useState('');
    const [selectedGender, setSelectedGender] = useState('male');
    const [showListPet, setShowListPet] = useState(false);
    const [avatar, setAvatar] = useState([]);
    const [namePet, setNamePet]= useState('');
    const [weight, setWeight] = useState(0);
    const [description, setDescription] = useState('');
    const [listImageUrl, setListImageUrl] = useState([]);
    const [crossbred, getCrossbred] = useState(null);
    const inputRef = useRef();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    const handleChooiseFile = ()=>{
        inputRef.current.click();
    }

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setBirthday(formattedDate);
  }, []);

  const handleGetCrossbred = (pet)=>{
    getCrossbred(pet);
  }
  const uploadFilesMutation = useMutation(uploadImages, {
    onSuccess: (data) => {
        setListImageUrl(data);
        queryClient.invalidateQueries('uploads');
    },
  });
  
  const handleFileChange = async (event) => {
    const fileList = event.target.files;
    const imagesArray = Array.from(fileList);
    setAvatar(imagesArray);
    const filesToSend = imagesArray.length === 1 ? [imagesArray[0]] : imagesArray;
    uploadFilesMutation.mutate(filesToSend);
  };

  const mutationAddPet = useMutation(
    (newPet)=>{
        return makeRequest.post("pet/addPet", newPet)
    },{
    onSuccess:()=>{
        queryClient.invalidateQueries(["pets"]);
        navigate(`/profile/${currentUser.idUser}`)
    }
  })

  

  const handleAddPet = (e)=>{
    e.preventDefault();
    const value = {
           name: namePet,
           age: birthday,
           avatar: listImageUrl.length > 0 ? listImageUrl[0] : 'https://res.cloudinary.com/dohmfb8tt/image/upload/v1684070431/img_pet_social/uxzqgnp4aulckzxlat63.jpg',
           gender: selectedGender,
           weight: weight,
           description: description,
           crossbred: crossbred !== null ? crossbred.name : '',
           breed: infoPet.name,
           type: infoPet.kind
    }
    mutationAddPet.mutate(value);
    toast("Create pet profile successfully!");
  }

    return (
        <div className='bg-[#fff] mt-10 item h-[800px]'>
             
            {
                showListPet &&
                <div>
                    <ListPets kind = {infoPet.kind} closeListPet = {()=>setShowListPet(false)} getCrossbred = {handleGetCrossbred}/>
                </div>
            }
            <div className='relative'>
                <div className='flex justify-center items-center'>
                    <div className='flex w-[30%] justify-center flex-col items-center'>
                        {/* src={infoPet.kind === 'dog'? infoPet.image.url : `https://cdn2.thecatapi.com/images/${infoPet.reference_image_id}.jpg`} */}
                        <img className='w-28' src={infoPet.kind === 'dog'? infoPet.image.url : `https://cdn2.thecatapi.com/images/${infoPet.reference_image_id}.jpg`}  alt="" />
                        <h3 className='text-[#333] font-semibold text-[18px] my-2'>{infoPet.name}</h3>
                    </div>
                    {
                        crossbred === null?
                        <></>:
                        <>
                            <div>
                                <i className="text-[24px] fa-sharp fa-light fa-transgender"></i>
                            </div>
                            <div className='flex w-[30%] justify-center flex-col items-center'>
                                {/* src={infoPet.kind === 'dog'? infoPet.image.url : `https://cdn2.thecatapi.com/images/${infoPet.reference_image_id}.jpg`} */}
                                <img className='w-28' src={crossbred.kind === 'dog'? crossbred.image.url : `https://cdn2.thecatapi.com/images/${crossbred.reference_image_id}.jpg`}  alt="" />
                                <h3 className='text-[#333] font-semibold text-[18px] my-2'>{crossbred.name}</h3>
                            </div>
                        </> 
                    }
                
                </div>
                <div onClick={()=>{setShowListPet(true);}} className='flex justify-center items-center gap-2 absolute top-[30%] right-[10%] cursor-pointer'>
                        <i className="text-[#666] text-[32px] fa-solid fa-circle-plus"></i>
                        <h4 className='font-light'>Mixed With</h4>
                </div>
            </div>
            <div >
                <form action="" onSubmit={handleAddPet}>
                {
                    avatar && avatar.length !== 0 ?
                    <></>
                    :
                    <div onClick={handleChooiseFile} className='cursor-pointer flex items-center flex-col gap-2 py-2 rounded-lg bg-[#f5f5f5] justify-center'>
                        <div className='bg-[#fff] rounded-full'>
                            <i className="text-[28px] p-5 fa-duotone fa-camera"></i>
                        </div>
                        <p className='text-[#333] text-[14px]'>
                            Chọn ảnh đại diện thú cưng của bạn
                        </p>
                        <input type="file" multiple className='hidden' ref = {inputRef} onChange={handleFileChange}/>
                    </div>
                }
                <div className='flex justify-center item gap-8'>
                        {
                            avatar && avatar.length !== 0 &&
                            <div>
                                <div className='h-32 w-32 rounded-full overflow-hidden'>
                                    <img
                                        src={URL.createObjectURL(avatar[0])}
                                        className="h-32 w-32 object-cover"
                                    />
                                </div>
                            </div>
                        }
                    <div className='grid grid-cols-2 w-[70%]  bg-[#f5f5f5] p-6'>
                        <div className='flex flex-col w-full col-span-1'>
                            <p className='text-[12px] text-[#333] m-0'>Name your pet</p>
                            <input onChange={(e)=>setNamePet(e.target.value)} required value={namePet} type="text" className='outline-none p-2 border border-[#ccc] w-[70%]' placeholder='Mỹ Diệu'  />
                        </div>
                        <div className='flex flex-col w-full row-span-2'>
                            <p className='text-[12px] text-[#333] m-0'>Description your pet:</p>
                            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows={4} type="text" className='outline-none p-2 border border-[#ccc] w-[70%]' placeholder='Rất thân thiện và tăng động, dáng ngồi huyền thoại'  />
                        </div>
                        <div className='flex flex-col mt-4 w-full col-span-1'>
                            <p className='text-[12px] text-[#333] m-0'>Birthday</p>
                            <input required type="date" value={birthday} onChange={(e)=>setBirthday(e.target.value)} className='outline-none p-2 border border-[#ccc] w-[70%]'  />
                        </div>
                        <div className='flex flex-col mt-4 w-full col-span-1'>
                            <p className='text-[12px] text-[#333] m-0'>Gender</p>
                            <div className='flex gap-4'>
                                <label className='flex items-center gap-2'>
                                    <input type="radio" name="gender" value="male" checked={selectedGender === 'male'} onChange={(e)=>setSelectedGender(e.target.value)} />
                                    Male
                                </label>
                                <label className='flex items-center gap-2'>
                                    <input type="radio" name="gender" value="female" checked={selectedGender === 'female'} onChange={(e)=>setSelectedGender(e.target.value)} />
                                    Female
                                </label>
                            </div>
                        </div>
                        <div className='flex flex-col mt-4 w-full col-span-1'>
                            <p className='text-[12px] text-[#333] m-0'>Weight</p>
                            <input onChange={(e)=>setWeight(e.target.value)} value={weight}  type="number" className='outline-none p-2 border border-[#ccc] w-[70%]'  />
                        </div>

                        <button type='submit' className='flex p-2 my-4 rounded-lg justify-center items-center col-span-2 bg-[#f8b84a] text-[#fff] font-semibold cursor-pointer'>
                            ADD PET
                        </button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    );
}

export default AddInfoPet;