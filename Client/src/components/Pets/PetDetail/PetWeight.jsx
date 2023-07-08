import { Box, Collapse, Step, StepLabel, Stepper } from '@mui/material';
import React, { useState } from 'react';
import CustomStepIcon from './UI/CustomstepIcon';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '~/axios';
import moment from 'moment';

function PetWeight(props) {
    const {petId} = props
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [weight, setWeight] = useState('');
    const [description, setDescription] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10));
    const [isDetail, setIsDetail] = useState(false);
    const queryClient = useQueryClient();

    const petFetch = useQuery({
        queryKey: ["weight", petId],
        queryFn: async () => {
            const res = await makeRequest.get(`/petdetail/weight/${petId}`);
            return res.data;
        },
        });

    const mutationAdd = useMutation(
        (newWeight)=>{
        return makeRequest.post("/petdetail/add/weight", newWeight)
        },{
        onSuccess:()=>{
            queryClient.invalidateQueries(["weight"]);
        }
        })
    const mutationDelete = useMutation(
        (id)=>{
            return makeRequest.delete(`/petDetail/delete/weight/${id}`)
        },
        {
            onSuccess:()=>{
                queryClient.invalidateQueries(["weight"])
            }
        }
    )
    const handleAddWeight = ()=>{
        const values = {
            idpet: petId,
            weight,
            description: description === '' ? null: description,
            date: moment(currentDate).format('DD/MM/YYYY')
        }
        if(weight === '')
        {
            alert("vui lòng nhập cân nặng")
        }
        else{
            mutationAdd.mutate(values);
            setDescription('');
            setIsAddingNew(false);
            setWeight('');
        }
       
    }

    const handleDelete = (id) =>{
        mutationDelete.mutate(id);
    }
    return (
        <div>
           {
            petFetch.isSuccess && 
            <div className='item'>
                <div className='flex justify-between'>
                        <div className='flex gap-2 items-center'>
                            <img className='w-[32px]' src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-weight-machine-icon-for-your-project-png-image_1541394.jpg" alt="" />
                            <span>Cân nặng</span>
                        </div>
                        <div onClick={()=> {setIsDetail(!isDetail);setIsAddingNew(false)}} className='flex gap-2 items-center cursor-pointer select-none'>
                            <span>Chi tiết</span>
                            <i className="fa-light fa-angle-right"></i>
                        </div>
                    </div>
                    { petFetch.data.length > 0 ? 
                    <div className='flex flex-col items-center'>
                        <div>
                            <span className='text-[26px] font-bold'>{petFetch.data[petFetch.data.length-1].weight}.00</span><span> kg</span>
                        </div>
                        <div className='text-[#666] text-[14px]'>
                            {petFetch.data[0].date}
                        </div>
                        {!isDetail && !isAddingNew &&  <button onClick={()=> setIsAddingNew(true)} className='text-[#00a60b] rounded-lg border border-[#00a60b] px-2 mt-2'>Cập nhật</button>}
                    </div>:
                    <div className='flex flex-col items-center'>
                        <button onClick={()=> setIsAddingNew(true)} className='text-[#00a60b] rounded-lg border border-[#00a60b] px-2 mt-2'>Thêm</button>
                    </div>
                    }
                    <Collapse in={isAddingNew} timeout="auto" unmountOnExit>
                    
                            <div className="flex flex-col justify-start">
                                <div className="flex flex-col justify-start">
                                    <p className="text-[14px] font-semibold">Cân nặng</p>
                                    <input
                                        type="text"
                                        className="border outline-none border-[#ccc] bg-[#f1f1f1] p-1"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col justify-start">
                                    <p className="text-[14px] font-semibold">Vào ngày</p>
                                    <input
                                        type="date"
                                        className="border outline-none border-[#ccc] bg-[#f1f1f1] p-1"
                                        value={currentDate}
                                        onChange={(e) => setCurrentDate(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <p className="text-[14px] font-semibold">Ghi chú</p>
                                    <textarea
                                    className="border outline-none border-[#ccc] bg-[#f1f1f1] p-1 w-full"
                                    name=""
                                    id=""
                                    rows="3"
                                    placeholder="Nhập ghi chú..."
                                    value={description}
                                    onChange={(e)=> setDescription(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="flex w-full gap-2">
                                    <div onClick={handleAddWeight} className="text-[#fff] flex items-center justify-center rounded-md cursor-pointer p-1 bg-[#ffae00] w-[70%]">
                                    Lưu
                                    </div>
                                    <div
                                    className="text-[#000] flex items-center justify-center rounded-md p-1 cursor-pointer bg-[#ddd] w-[30%]"
                                    onClick={()=> setIsAddingNew(false)}
                                    >
                                    Hủy
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                        <Collapse in={isDetail} timeout="auto" unmountOnExit>
                            
                            <div className="flex flex-col justify-start">
                            <Box>
                                    <Stepper activeStep={2} orientation="vertical">
                                        {petFetch.data.map((item) => (
                                        <Step key={item.weight}>
                                            <StepLabel StepIconComponent={CustomStepIcon}>
                                            <div>
                                                <div className="flex justify-between">
                                                    <span>{item.weight} kg</span> <span className='flex gap-2'>{item.date} <button><i onClick={()=>handleDelete(item.idpetweight)} className="fa-thin fa-circle-xmark"></i></button></span>
                                                </div>
                                                <div className='text-[13px] text-[#888]'>
                                                    {item.description? item.description : ''}
                                                </div>
                                            </div>
                                            </StepLabel>
                                        </Step>
                                        ))}
                                    </Stepper>
                                    </Box>
                                <div className="flex w-full gap-2">
                                    <div
                                    className="text-[#000] flex items-center justify-center rounded-md p-1 cursor-pointer bg-[#ddd] w-full"
                                    onClick={()=> setIsDetail(false)}
                                    >
                                    Thoát
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                </div>
           }
        </div>
    );
}

export default PetWeight;