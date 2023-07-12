
import { Box, Collapse, Step, StepLabel, Stepper } from '@mui/material';
import React, { useState } from 'react';
import CustomStepIcon from './UI/CustomstepIcon';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '~/axios';
import moment from 'moment';
function PetHealth(props) {
    const {petId, isView} = props
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [description, setDescription] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10));
    const [isDetail, setIsDetail] = useState(false);
    const queryClient = useQueryClient();

    const petFetch = useQuery({
        queryKey: ["health", petId],
        queryFn: async () => {
            const res = await makeRequest.get(`/petdetail/health/${petId}`);
            return res.data;
        },
        });

    const mutationAdd = useMutation(
        (newItem)=>{
        return makeRequest.post("/petdetail/add/health", newItem)
        },{
        onSuccess:()=>{
            queryClient.invalidateQueries(["health"]);
        }
        })
    const mutationDelete = useMutation(
        (id)=>{
            return makeRequest.delete(`/petDetail/delete/health/${id}`)
        },
        {
            onSuccess:()=>{
                queryClient.invalidateQueries(["health"])
            }
        }
    )
    const handleAdd = ()=>{
        const values = {
            idpet: petId,
            description: description === '' ? null: description,
            date: moment(currentDate).format('DD/MM/YYYY')
        }
        mutationAdd.mutate(values);
        setDescription('');
        setIsAddingNew(false);
       
    }

    const handleDelete = (id) =>{
        mutationDelete.mutate(id);
    }
    return (
        <div>
            {petFetch.isSuccess &&
            <div className="item">
            <div className="flex justify-between">
                <div className='flex gap-2 items-center'>
                    <img className='w-[32px]' src="https://www.nicepng.com/png/detail/799-7998911_placeholder-health-icons-png.png" alt="" />
                    <span>Tình trạng sức khỏe</span>
                </div>
                <div onClick={()=>{setIsDetail(!isDetail);setIsAddingNew(false)}} className="flex gap-2 items-center cursor-pointer select-none">
                    <span>Chi tiết</span>
                <i className="fa-light fa-angle-right"></i>
                </div>
            </div>
            {petFetch.data.length > 0 ? (
                <div>
                    {
                        !isDetail &&
                        <Box>
                        <Stepper activeStep={2} orientation="vertical">
                            {petFetch.data.map((item) => (
                            <Step key={item.description}>
                                <StepLabel StepIconComponent={CustomStepIcon}>
                                <div className="flex justify-between">
                                    <span>{item.description}</span> <span>{item.date}</span>
                                </div>
                                </StepLabel>
                            </Step>
                            ))}
                        </Stepper>
                        </Box>
                    }
                    
                    {!isDetail && !isAddingNew && !isView && <div className='w-full flex justify-center'><button onClick={()=>setIsAddingNew(true)} className='text-[#00a60b] rounded-lg border border-[#00a60b] px-2 mt-2'>Cập nhật</button></div>}
                </div>

            ) : (
                !isDetail && !isAddingNew &&
                <div className="flex flex-col items-center justify-center gap-2">
                    {!isView ?
                    <> <p className="text-[#666] text-[14px]">Hiện tại chưa có dữ liệu</p>
                    <button
                        className="text-[#c6c602] rounded-lg border border-[#c6c602] px-2"
                        onClick={()=>setIsAddingNew(!isAddingNew)}
                    >
                        Thêm
                    </button>
                    </>:
                    <div>Không có dữ liệu được hiển thị</div>
                    }
                </div>
            )}
            {/* Add new */}
            <Collapse in={isAddingNew} timeout="auto" unmountOnExit>
                
                <div className="flex flex-col justify-start">
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
                        <div onClick={handleAdd} className="text-[#fff] flex items-center justify-center rounded-md cursor-pointer p-1 bg-[#ffae00] w-[70%]">
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
                            <Step key={item.description}>
                                <StepLabel StepIconComponent={CustomStepIcon}>
                                <div>
                                    <div className="flex justify-between">
                                        <span>{item.description}</span> <span className='flex gap-2'>{item.date}<button><i onClick={()=>handleDelete(item.idpetvaccination)} className="fa-thin fa-circle-xmark"></i></button></span>
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

export default PetHealth;