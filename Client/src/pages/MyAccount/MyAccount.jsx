import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeRequest } from '~/axios';
import { getAddressFromCoordinates } from "~/API/openCageGeocodingAPI";
import AddressApi from '~/components/Vererinarian/BecomeMember/Form/AddressApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyAccount(props) {
    const [address, setAddress]  =useState('');
    const { currentUser } = useSelector((state) => state.user);
    const [nameUser, setNameUser] = useState(currentUser?.name);
    const [birthday, setBirthday]= useState(currentUser?.birthday);
    const [viewUpdatePass, setViewUpdatePass] = useState(false);
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [phone, setPhone] = useState(currentUser?.phoneNumber);
    const [gender, setGender] = useState(currentUser?.gender);
    const [addressInput, setAddressInput] = useState('');
    const [isViewButton, setIsViewButton] = useState(true);
    const [ViewAddNewPass, setViewAddNewPass] = useState(false);
    const [newPassError , setNewPasswordError] = useState(false);

    const [valueCurrentLocation, setValueCurrentLocation] = useState("");
    const [isViewLocation, setIsViewLocation] = useState(false);
    const queryClient = useQueryClient();
    const handleClickGetCurrentLocation = async () => {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            const { latitude, longitude } = position.coords;
            const address = await getAddressFromCoordinates(
                latitude,
                longitude,
            );
            setValueCurrentLocation(address);
            setIsViewLocation(true);
            setAddress('');
            setAddressInput('');
        } catch (error) {
            console.error("Lỗi khi truy cập vị trí: " + error.message);
        }
    };
    const handleChangeAddress = () => {
        setIsViewButton(false)
    };
    const mutationUpdateUser = useMutation(
        (updateUser) => {
            return makeRequest.put("/user/update", updateUser);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["users"]);
            },
        },
        
    );
    const handleChangeInfo = () =>{
        const values ={
            name: nameUser,
            birthday: birthday,
            phoneNumber: phone,
            gender: gender,
            avatar: currentUser.avatar,
            address: valueCurrentLocation === '' ? addressInput + ',' + address: valueCurrentLocation,
        }
        mutationUpdateUser.mutate(values)
    }
    // const checkPassFetch = useQuery({
    //     queryKey: ["pass", currentPass],
    //     queryFn: async () => {
    //         const res = await makeRequest.get(`/user/checkPass?password=${currentPass}`);
    //         return res.data;
    //     },
    // });
    const mutationCheckPass = useMutation(
        (pwd) => {
            return makeRequest.post("/user/checkPass", pwd);
        },
        {
            onSuccess: () => {
                setViewUpdatePass(false);
                setViewAddNewPass(true);

            },
        },
        
    );
    const mutationUpdatePass = useMutation(
        (pwd) => {
            return makeRequest.post("/user/updatePass", pwd);
        },
        {
            onSuccess: () => {
                setViewAddNewPass(false);
                toast.success("Cập nhật mật khẩu thành công");
            },
        },
        
    );
    const handleCheckPass = ()=>{
        mutationCheckPass.mutate({password:currentPass});
    }
    const handleUpdatePass=()=>{
        if(newPass === '' || newPass.length <6)
            {setNewPasswordError(true)}
        mutationUpdatePass.mutate({password:newPass});
    }
    return (
        <div className='flex items-center justify-center '>
            <ToastContainer />
            <div className='flex flex-col w-[70%] item'>
                <div className='mb-4 flex justify-between border-b border-[#ccc]'>
                    <h1 className='text-[24px] text-[#666] font-semibold py-5 '>Cài đặt tài khoản</h1>
                    
                </div>
                <div className='grid grid-cols-2 gap-2  '>
                    <div className='col-span-1 flex flex-col gap-1'>
                        <p className='text-[#888] text-[14px]'>Tên của bạn</p>
                        <input value={nameUser} onChange={(e)=> setNameUser(e.target.value)} type="text" className='p-2 outline-none border border-[#ccc] rounded-md text-[#666] bg-[#f1f1f1]' />
                    </div>
                    <div className='col-span-1 flex flex-col gap-1'>
                        <p className='text-[#888] text-[14px]'>Ngày sinh</p>
                        <input type="date" value={birthday} onChange={(e)=> setBirthday(e.target.value)} className='p-2 outline-none border border-[#ccc] rounded-md text-[#666] bg-[#f1f1f1]' />
                    </div>
                </div>
                <div className='grid grid-cols-1'>
                    <div className='flex justify-start flex-col gap-1 pb-2'>
                        <p className='text-[#888] text-[14px]'>Email</p>
                        <input type="email" disabled placeholder={currentUser.email} className='p-2 cursor-not-allowed outline-none border border-[#ccc] rounded-md text-[#666] bg-[#f1f1f1]' />
                        <div>
                            <button onClick={()=> setViewUpdatePass(true)} className='text-[#1877f2] underline'><i className="fa-light fa-key"></i>Đổi mật khẩu</button>
                        </div>
                        {
                            viewUpdatePass && !ViewAddNewPass &&
                            <div className=' flex flex-col justify-end gap-2 w-[50%]'>
                                <div className='flex items-center gap-2'>
                                    <p className='text-[#444] '>Nhập mật khẩu hiện tại:</p>
                                    <div className='flex flex-col items-end'>
                                        <input value={currentPass} onChange={(e)=> setCurrentPass(e.target.value)} type="password" className='outline-none border border-[#ccc] rounded-md text-[#666] p-2 bg-[#f1f1f1]' />
                                        {mutationCheckPass.isError && <p className='text-[#f00] text-[13px]'>{mutationCheckPass.error.response.data}</p>}
                                    </div>
                                </div>
                                <div className='flex justify-end gap-2'>
                                    <button onClick={()=> setViewUpdatePass(false)} className='px-5 py-2 cursor-pointer bg-[#d7d7d7] text-[#000] rounded-md'>Thoát</button>
                                    <button onClick={handleCheckPass} className='px-5 py-2 cursor-pointer bg-[#1f31f4] text-[#fff] rounded-md'>Xác nhận</button>
                                </div>
                            </div>
                            
                        }
                        {
                            ViewAddNewPass &&
                            <div className=' flex flex-col justify-end gap-2 w-[50%]'>
                                <div className='flex items-center gap-2'>
                                    <p className='text-[#444] '>Nhập mật khẩu mới:</p>
                                    <div className='flex flex-col items-end'>
                                        <input value={newPass} onChange={(e)=> setNewPass(e.target.value)} type="text" className='outline-none border border-[#ccc] rounded-md text-[#666] p-2 bg-[#f1f1f1]' />
                                        {newPassError && <p className='text-[#f00] text-[13px]'>Mật khẩu phải trên 6 ký tự và không được bỏ trống</p>}
                                    </div>
                                </div>
                                <div className='flex justify-end gap-2'>
                                    <button onClick={()=> setViewAddNewPass(false)} className='px-5 py-2 cursor-pointer bg-[#d7d7d7] text-[#000] rounded-md'>Thoát</button>
                                    <button onClick={handleUpdatePass} className='px-5 py-2 cursor-pointer bg-[#1f31f4] text-[#fff] rounded-md'>Xác nhận</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className='grid grid-cols-2'>
                    <div className='col-span-1 flex flex-col gap-1'>
                        <p className='text-[#888] text-[14px]'>Số điện thoại</p>
                        <input type="number" value={phone} onChange={(e)=> setPhone(e.target.value)} className='p-2 outline-none border border-[#ccc] rounded-md text-[#666] bg-[#f1f1f1]' />
                    </div>
                    <div className='col-span-1 flex gap-7 mb-3 items-end justify-center'>
                        <div class="flex items-center">
                            <input id="default-radio-1" checked={gender === "nam"} type="radio" value="nam" onChange={(e)=> setGender(e.target.value)} name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nam</label>
                        </div>
                        <div class="flex items-center">
                            <input id="default-radio-2" checked={gender === "nu"} type="radio" value="nu" onChange={(e)=> setGender(e.target.value)} name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nữ</label>
                        </div>
                    </div>
                </div>
                {
                    (currentUser.address !== null) &&
                    <div className='py-3'>
                        <span className='text-[#888]'>Địa chỉ của bạn:</span> <span className='text-[#555]'>{currentUser.address}</span>
                     </div>
                }
                <div>
                    <div className='flex flex-col gap-1'>
                        <p className='text-[#888] text-[14px]'>Cập nhật địa chỉ </p>
                        <input type="text" value={addressInput} onChange={e=> setAddressInput(e.target.value)} className='p-2 outline-none border border-[#ccc] rounded-md text-[#666] bg-[#f1f1f1]' />
                    </div>
                    <AddressApi isFind = {true} number= {1} setAddressApi = {setAddress}/>
                </div>
                <div className='pt-5 flex  gap-2'>
                    <p className='font-semibold '>Hoặc</p>
                    {
                        !isViewLocation && (
                            <p
                                onClick={
                                    handleClickGetCurrentLocation
                                }
                                className=" text-center select-none underline cursor-pointer  text-[#1877f2] "
                            >
                                Chọn để cập nhật địa chỉ bằng định vị
                            </p>
                        )
                    }
                    {isViewLocation && (
                            <div className='w-full'>
                                <div className="flex items-center gap-2 w-full">
                                    <div className="flex text-[16px] text-[#333] font-semibold">
                                        Địa chỉ:
                                    </div>
                                    <input
                                        type="text"
                                        value={valueCurrentLocation}
                                        onChange={(e) =>
                                            setValueCurrentLocation(
                                                e.target.value,
                                            )
                                        }
                                        className="p-2 outline-none border w-[80%] border-[#ccc] rounded-md text-[#666] bg-[#f1f1f1]"
                                    />
                                </div>
                                {
                                    isViewButton &&
                                    <>
                                        <button
                                            onClick={handleChangeAddress}
                                            className="bg-[#ccc] rounded-lg px-4 mx-3 py-2"
                                        >
                                            Đúng
                                        </button>
                                        <button
                                            onClick={()=> setIsViewLocation(false)}
                                            className="bg-[#ccc] rounded-lg px-4 py-2"
                                        >
                                            Thoát
                                        </button>
                                    </>
                                }
                            </div>
                        )}
                </div>
                <div className='w-full flex justify-end'>
                    <div className='px-8 py-2 cursor-pointer bg-[#1f31f4] text-[#fff] rounded-md' onClick={handleChangeInfo}>
                        Lưu
                    </div>
                </div>
                {mutationUpdateUser.isError && <p className='text-[#ff2121]'>Có lỗi xảy ra vui lòng thử lại hoặc liên lạc với quản trị viên</p>}
            </div>
           
        </div>
    );
}

export default MyAccount;