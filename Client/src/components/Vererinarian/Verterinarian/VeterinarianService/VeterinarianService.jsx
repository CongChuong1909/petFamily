import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeRequest } from '~/axios';
import VeterinarianServiceItem from './VeterinarianServiceItem';
import { TextField } from '@mui/material';
import uploadImages from '~/API/uploadAPI';
import Loading from '~/components/Loading/Loading';

function VeterinarianService(props) {
    const {idProfile, currentProfile} = props;
    const { currentUser } = useSelector((state) => state.user);
    const [showAddService, setShowAddService] = useState(false);
    const [showButtonUpload, setShowButtonUpload] = useState(true);
    const [image, setImage] = useState('');
    const [text, setText] = useState('');
    const inputRef = useRef();
    const queryClient = useQueryClient();

    const uploadFilesMutation = useMutation(uploadImages, {
        onSuccess: (data) => {
        setImage(data[0]);
        queryClient.invalidateQueries('uploads');
        },
    });
    const serviceFetch = useQuery({
        queryKey: ["service", idProfile],
        queryFn: async () => {
            const res = await makeRequest.get(
                `/veterinarian/getServiceByID?idVeterinarian=${idProfile}`,
            );
            return res.data;
        },
    });

    const mutationAdd = useMutation(
        (service) => {
            return makeRequest.post("/veterinarian/addService", service);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["service"]);
            },
        },
    );

    

    const handleFileInputChange = (e) => {
        const file = e.target.files;
        const imagesArray = Array.from(file);
        const filesToSend =
            imagesArray.length === 1 ? [imagesArray[0]] : imagesArray;
            setShowButtonUpload(false);
        uploadFilesMutation.mutate(filesToSend);
    };

    const handleAddService = () =>{
        const value = {
            name : text,
            image: image,
            idVeterinarian: idProfile
        }
        mutationAdd.mutate(value);
        setShowButtonUpload(true);
        setShowAddService(false);
    }
            
    return (
        <>
        {
            serviceFetch.isSuccess &&
            <div>
                
                    <h1 className='title relative text-[20px] font-bold text-[#777] border_bottom mb-4 p-2'>
                            Dịch vụ của chúng tôi
                        </h1>
                {    currentProfile === currentUser.idUser?
                    <div>
                        
                        <div className='grid gap-5 grid-cols-12 content-center'>
                            {
                                serviceFetch.data.map((service, index)=>(
                                    <VeterinarianServiceItem key = {index} service = {service}/>
                                ))
                            }
                            {
                                !showAddService &&
                                       <div onClick={()=> setShowAddService(true)} className='col-span-3 w-20 h-20 mx-auto my-auto flex items-center justify-center flex-col border border-[#444] bg-[#f5f5f5] cursor-pointer'>
                                            <i className="text-[24px] text-[#444] fa-light fa-plus"></i>
                                            <p className='text-[#777] text-[12px]'>Thêm dịch vụ</p>
                                        </div>
                                
                            }
                            {
                                showAddService &&
                                <div className='col-span-3 relative'>
                                    <div onClick={()=>inputRef.current.click()} className=' cursor-pointer w-40 h-40 rounded-2xl flex items-center justify-center bg-[#ddd]'>
                                        {
                                           showButtonUpload ? <> <i onClick={(e)=>{e.stopPropagation(); setShowAddService(false)}} className="absolute cursor-pointer text-[18px] top-[-10px] right-[-10px] fa-duotone fa-circle-xmark"></i>
                                                                    <i className="text-[26px]  fa-solid fa-images"></i>
                                                                </>:
                                                                uploadFilesMutation.isLoading ? <Loading/>: <div className='w-40 h-40 rounded-2xl bg-cover' style={{backgroundImage: `url(${image})`, backgroundPosition:'center' }} />
                                        }
                                        <input type="file" multiple ref = {inputRef} onChange={handleFileInputChange} hidden />
                                    </div>
                                    <div className='flex'>
                                        <TextField  
                                            required
                                            name="nameService"
                                            label="Dịch vụ"
                                            fullWidth
                                            onChange={(e)=>setText(e.target.value)}
                                            variant="standard"
                                        />
                                        <button onClick={handleAddService} className='bg-[#1a73e8] px-2 rounded-lg text-[#fff]'>Thêm</button>
                                    </div>
                                </div>
                            }
                            
                        </div>
                    </div>:
                    <div className=' grid gap-5 grid-cols-12'>
                            {
                                serviceFetch.data.map((service, index)=>(
                                    <VeterinarianServiceItem key = {index} service = {service}/>
                                ))
                            }
                            
                    </div>
                }
                
            </div>
        }
        </>
        
    );
}

export default VeterinarianService;