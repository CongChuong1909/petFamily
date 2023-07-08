

import { Box, Collapse, Step, StepLabel, Stepper } from '@mui/material';
import React, { useState } from 'react';
import CustomStepIcon from './UI/CustomstepIcon';
function PetHealth(props) {
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10));
    const [isDetail, setIsDetail] = useState(false);
        const handleAddNew = () => {
        setIsAddingNew(true);
        };
    
        const handleCancel = () => {
        setIsAddingNew(false);
        };
    return (
        <div>
            <div className="item">
            <div className='flex justify-between'>
            <div className='flex gap-2 items-center'>
                <img className='w-[32px]' src="https://cdn.pixabay.com/photo/2020/05/22/19/51/corona-5206905_1280.png" alt="" />
                <span>Dị ứng</span>
            </div>
                <div onClick={()=>{setIsDetail(!isDetail);setIsAddingNew(false)}} className="flex gap-2 items-center cursor-pointer select-none">
                    <span>Chi tiết</span>
                    <i className="fa-light fa-angle-right"></i>
                </div>
            </div>
            {true ? (
                <div>
                    <Box>
                    <Stepper activeStep={2} orientation="vertical">
                        {props.steps.map((item) => (
                        <Step key={item.label}>
                            <StepLabel StepIconComponent={CustomStepIcon}>
                            <div className="flex justify-between">
                                <span>{item.label}</span> <span>{item.date}</span>
                            </div>
                            </StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                    </Box>
                    {!isDetail && !isAddingNew &&  <div className='w-full flex justify-center'><button onClick={handleAddNew} className='text-[#00a60b] rounded-lg border border-[#00a60b] px-2 mt-2'>Thêm mới</button></div>}
                </div>

            ) : (
                !isDetail && !isAddingNew &&
                <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-[#666] text-[14px]">Hiện tại chưa có dữ liệu</p>
                    <button
                        className="text-[#c6c602] rounded-lg border border-[#c6c602] px-2"
                        onClick={handleAddNew}
                    >
                        Thêm
                    </button>
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
                        ></textarea>
                    </div>

                    <div className="flex w-full gap-2">
                        <div className="text-[#fff] flex items-center justify-center rounded-md cursor-pointer p-1 bg-[#ffae00] w-[70%]">
                        Lưu
                        </div>
                        <div
                        className="text-[#000] flex items-center justify-center rounded-md p-1 cursor-pointer bg-[#ddd] w-[30%]"
                        onClick={handleCancel}
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
                            {props.steps.map((item) => (
                            <Step key={item.label}>
                                <StepLabel StepIconComponent={CustomStepIcon}>
                                <div>
                                    <div className="flex justify-between">
                                        <span>{item.label}</span> <span>{item.date}</span>
                                    </div>
                                    <div className='text-[13px] text-[#888]'>
                                        description1
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
        </div>
    );
}

export default PetHealth;