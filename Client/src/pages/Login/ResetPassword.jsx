import { Alert, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { makeRequest, makeRequestAuth } from '~/axios';
import { loginSuccess } from '~/redux/userSlices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function VerifiedEmail(props) {
    const { currentUser } = useSelector((state) => state.user);
    const [searchParams, setSearchParams] = useSearchParams();
    const [password, setPassword] = useState('');
    const [newPasswordError,setNewPasswordError] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setError] = useState(null);
    const dispatch = useDispatch();
    const emailToken= searchParams.get("emailToken")
    const id= searchParams.get("idUser")
    const navigate = useNavigate();
    const [isVerify, setIsVerify] = useState(false);
    console.log(emailToken, id);
    // console.log(currentUser?.isVerfied === true);
  useEffect(()=>{
    const verifyEmail = async () => {
          if (emailToken) {
            setIsLoading(true);
            try {
                const res = await makeRequestAuth.post('auth/verifyEmail', { emailToken });
                setIsLoading(false);
                console.log(res);
                if (res.error) {
                    return setError(res);
                } 
                else setIsVerify(true);
              } catch (error) {
                setError(error.response.data);
                setIsLoading(false);
              }
          } else {
            setError('Token is not valid');
          }
        }
      verifyEmail();
  }, [emailToken])

  const handleResetPass = () => {
    if (password === '' || password.length < 6) {
      setNewPasswordError(true);
      return;
    }

    makeRequest
      .post("/user/resetPass", { password: password, id: id})
      .then((response) => {
        console.log(response);
        toast.success("Cập nhật mật khẩu thành công");
        setTimeout(() => {
           navigate("/login"); 
          }, 3000); 
      })
      .catch((error) => {
        console.error(error);
        toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
      });
  };

    return (
        <div>
            <ToastContainer/>
            {
                isLoading ? <CircularProgress/>:
                    <div className="min-h-screen bg-[#f2f3f5] text-[#111827] flex justify-center">
                        <div className="max-w-screen-xl m-0 sm:m-10 bg-[#fff] shadow sm:rounded-lg flex justify-center flex-1">
                        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                                {
                                isVerify ? 
                                <div className=" flex flex-col wrapper"> 
                                        <div>
                                            <img width={200} src="https://res.cloudinary.com/dohmfb8tt/image/upload/v1685933682/img_pet_social/f8jpd6lm1kkialof5lgx.png" alt="" />
                                        </div>
                                        <div className='flex gap-3 items-center'>
                                            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
                                            <p>Xác nhận thành công</p>
                                        </div>
                                </div>:
                                <div className=" flex flex-col wrapper p-4 border-4 border-[#d52828] px-20"> 
                                    <div>
                                        <img width={200} src="https://png.pngtree.com/png-vector/20190118/ourlarge/pngtree-pet-cartoon-pet-dog-cartoon-expression-crying-cartoon-expression-png-image_461884.jpg" alt="" />
                                    </div>
                                    
                                    <div className='flex gap-3 items-center'>
                                        <img width={40} src="https://cdn0.iconfinder.com/data/icons/shift-interfaces/32/Error-512.png" alt="" />
                                        {isError ? isError.message : null}
                                    </div>
                                </div>
                            }
                            {
                                isVerify && <>
                                    <p  className="pb-2 mt-3">Nhập mật khẩu mới của bạn</p>
                                        <input
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-[#f3f4f6] border border-[#ddd] placeholder-gray-500 text-sm focus:outline-none focus:border-[#aaa] focus:bg-[#fff]"
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={password}
                                            onChange={(e)=>setPassword(e.target.value)}
                                        />
                                        {newPasswordError && <p className='text-[#f00] text-[13px]'>Mật khẩu phải trên 6 ký tự</p>}
                                        <button onClick={handleResetPass} className="mt-5 tracking-wide font-semibold bg-[#6366f1] text-[#eee] w-full py-2 rounded-lg hover:bg-[#4338ca] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">            
                                            <span className="ml-3">Xác nhận</span>
                                        </button>
                                </>
                            }
                        </div>

                        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                            <div
                                className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                                style={{ 
                                    backgroundImage: `url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")` 
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default VerifiedEmail;