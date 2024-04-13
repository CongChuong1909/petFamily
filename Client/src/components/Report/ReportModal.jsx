import { Box, Button, CardHeader, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { makeRequest } from '~/axios';

function ReportModal(props) {
    const { idpost ,setShowReport, showReport } = props;
    const [otherChecked, setOtherChecked] = useState(false);
    const [selectedValues, setSelectedValues] = useState([]);
    const [other, setOther] = useState('');
    const [description, setDescription] = useState('');
    const [isReported, setIsReported] = useState(false);
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (name === 'other') {
            setOtherChecked(true);
            setOther(checked ? event.target.value : '');
        } else {
            if (checked) {
                setSelectedValues((prevValues) => [...prevValues, event.target.value]);
            } else {
                setSelectedValues((prevValues) => prevValues.filter((value) => value !== event.target.value));
            }
        }
    };

    const mutationAddReport = useMutation(
        (newReport) => {
            return makeRequest.post("/report/addReport", newReport);
        }
    );

    const handleSendReport = () => {
        // Lấy các giá trị được chọn dưới dạng văn bản
        const reportValues = [...selectedValues];
        if (other) {
            reportValues.push(other);
        }
        const reportString = reportValues.join(', ');
        const value = {
            decription: description,
            idpost: idpost,
            content: reportString,
        }

        mutationAddReport.mutate(value);

        // setShowReport(false);
        setIsReported(true);
    };

    return (
        <div onClick={() => { setShowReport(false) }} className={`${showReport ? ' opacity-1 block' : 'opacity-0 hidden'}  modal overflow-hidden fixed top-0 left-0 w-full h-full bg-rgba_background-button_header z-[999] flex justify-center items-center`}>
            <div
                onClick={(e) => e.stopPropagation()}
                className={` ${showReport ? ' fadeDown translate-x-[0]' : ' translate-x-[-100%]'} modal-content bg-[#fff] p-5 rounded-md shadow-2xl max-w-[540px] max-h-[92%] thin-scroll overflow-y-auto overflow-x-visible z-10 w-full relative`}
            >
                {
                    !isReported ?
                    <>
                        <CardHeader title="BÁO CÁO BÀI VIẾT" subtitle="Mô tả nội dung cần báo cáo" />
                            <FormGroup>
                                <FormControlLabel control={<Checkbox value="Ảnh khỏa thân" />} label="Ảnh khỏa thân" onChange={handleCheckboxChange} />
                                <FormControlLabel control={<Checkbox value="Spam" />} label="Spam" onChange={handleCheckboxChange} />
                                <FormControlLabel control={<Checkbox value="Thông tin sai sự thật" />} label="Thông tin sai sự thật" onChange={handleCheckboxChange} />
                                <FormControlLabel control={<Checkbox value="Bán hàng trái phép" />} label="Bán hàng trái phép" onChange={handleCheckboxChange} />
                                <FormControlLabel control={<Checkbox value="Bạo lực" />} label="Bạo lực" onChange={handleCheckboxChange} />
                                <FormControlLabel control={<Checkbox value="Quấy rối, bôi nhọ" />} label="Quấy rối, bôi nhọ" onChange={handleCheckboxChange} />
                                <FormControlLabel control={<Checkbox value="Khủng bố" />} label="Khủng bố" onChange={handleCheckboxChange} />
                                <FormControlLabel control={<Checkbox value="Ngôn từ gây thù ghét" />} label="Ngôn từ gây thù ghét" onChange={handleCheckboxChange} />
                                <FormControlLabel control={<Checkbox value="Lạm dụng trẻ em" />} label="Lạm dụng trẻ em" onChange={handleCheckboxChange} />
                                <Box display="flex" alignItems="center">
                                    <FormControlLabel
                                        control={<Checkbox checked={otherChecked} onChange={handleCheckboxChange} name="other" />}
                                    />
                                    {otherChecked && (
                                        <TextField
                                        placeholder="Mô tả vấn đề"
                                        value={other}
                                        onChange={(e) => setOther(e.target.value)}
                                        />
                                    )}
                                </Box>

                                <TextField
                                    placeholder="Mô tả vấn đề chi tiết cần báo cáo"
                                    multiline
                                    rows={3}
                                    value={description}
                                    onChange={(e)=> setDescription(e.target.value)}
                                />
                                <div className='flex justify-end mt-3'>
                                    <button className=' bg-[#066eff] rounded-lg py-3 px-5 text-[#fff]' onClick={handleSendReport}>Gửi</button>
                                </div>
                            </FormGroup>
                    </> :
                    <div className='flex flex-col items-center justify-center'>
                                  <i  onClick={setShowReport(false)} className=" method-share_  close fa-solid fa-xmark p-3 rounded-lg cursor-pointer"></i>
                        <img className='w-32 h-32' src="https://res.cloudinary.com/dohmfb8tt/image/upload/v1686812338/img_pet_social/esjbltukicdcrggwhyh4.jpg" alt="" />
                        <p className='flex justify-center'>Cảm ơn đã báo cáo,<br/> Chúng tôi sẽ xem xét và đưa ra giải pháp thích hợp</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default ReportModal;
