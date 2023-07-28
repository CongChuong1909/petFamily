import { Alert, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { makeRequestAuth } from '~/axios';
import { loginSuccess } from '~/redux/userSlices';

function VerifiedEmail(props) {
    const { currentUser } = useSelector((state) => state.user);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setError] = useState(null);
    const dispatch = useDispatch();
    const emailToken= searchParams.get("emailToken")
    const navigate = useNavigate();

   useEffect(() => {
  const verifyEmail = async () => {
    localStorage.removeItem('userPetFamily')
    if (currentUser?.isVerify === 1) {
        console.log(1);
      setTimeout(() => {
       return navigate('/login');
      }, 3000);
    } else {
      if (emailToken) {
        setIsLoading(true);
        try {
            const res = await makeRequestAuth.post('auth/verifyEmail', { emailToken });
            setIsLoading(false);
            if (res.error) {
              return setError(res);
            } else {
                
              const valueUpdate = {
                ...currentUser,
                isVerify: res.data.isVerfied,
              };
              dispatch(loginSuccess(valueUpdate));
            }
          } catch (error) {
            setError(error.response.data);
            setIsLoading(false);
          }
      } else {
        setError('Token is not valid');
      }
    }
  };
  verifyEmail();
}, [emailToken, currentUser]); 

    return (
        <div>
            {
                isLoading ? <CircularProgress/>:
                <div className='flex w-full h-[100vh] items-center justify-center'>
                    {
                        currentUser?.isVerify === 1 ? 
                        <div className=" flex flex-col wrapper p-4 border-4 border-[#7ac142]"> 
                                <div>
                                    <img width={200} src="https://res.cloudinary.com/dohmfb8tt/image/upload/v1685933682/img_pet_social/f8jpd6lm1kkialof5lgx.png" alt="" />
                                </div>
                                <div className='flex gap-3 items-center'>
                                    <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
                                    Xác nhận thành công, đang chuyển hướng đến trang đăng nhập!
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
                </div>
            }
        </div>
    );
}

export default VerifiedEmail;