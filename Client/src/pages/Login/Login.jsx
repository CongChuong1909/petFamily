
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest, makeRequestAuth } from "~/axios";
import { loginFailure, loginStart, loginSuccess } from "~/redux/userSlices";
function Login(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [err, setErr]= useState(null);
        const [login, setLogin] = useState({
        email: "",
        password:""
    })
    const [loading, setLoading] = useState(false);

    

    const handleChangeValue = (e) =>{
        setLogin(prev =>({...prev, [e.target.name]: e.target.value }))
    }

    const handleLogin = async(e)=>{
        e.preventDefault();
        setLoading(true);
        dispatch(loginStart());
       try {
            const res = await makeRequestAuth.post("auth/login", login,{
                withCredentials:true,
                credentials: 'include'
            });
            console.log(res);
           if(res.status === 200)
           {
            if(res.data.status === 0)
            {
                alert("tài khoản của bạn đã bị khóa")
            }
            else{
                // localStorage.removeItem('userPetFamily')
                navigate("/")
                dispatch(loginSuccess(res.data))
            };
           }
           

       } catch (error) {
        console.log(error);
            setErr(error)
            dispatch(loginFailure());
       }
       finally {
        setLoading(false);
      }
    }
    const google = () =>{
        window.open("https://api.petfamily.click/google","_self");
    }


    return (
        <div className="min-h-screen bg-[#f2f3f5] text-[#111827] flex justify-center">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-[#fff] shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="mt-5 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">Đăng nhập</h1>
                        <div className="w-full flex-1 mt-8">
                            <div className="flex flex-col items-center">
                                <button onClick={google} className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-[#e0e7ff] text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                    <div className="bg-[#fff] p-2 rounded-full">
                                        <svg className="w-4" viewBox="0 0 533.5 544.3">
                                            <path
                                                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                                fill="#4285f4"
                                            ></path>
                                            <path
                                                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                                fill="#34a853"
                                            ></path>
                                            <path
                                                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                                fill="#fbbc04"
                                            ></path>
                                            <path
                                                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                                fill="#ea4335"
                                            ></path>
                                        </svg>
                                    </div>
                                    <span className="ml-4">Đăng nhập với Google</span>
                                </button>
                                <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-[#e0e7ff] text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                                    <div className="bg-white p-1 rounded-full">
                                        <svg className="w-6" viewBox="0 0 32 32">
                                            <path
                                                fillRule="evenodd"
                                                d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <span className="ml-4 ">Đăng nhập với github</span>
                                </button>
                            </div>
                            <div className="my-12 border-b border-[#eee] text-center">
                                <div className="leading-none px-2 inline-block text-sm text-[#666] tracking-wide font-medium bg-[#fff] transform translate-y-1/2">
                                    Đăng nhập với e-mail
                                </div>
                            </div>
                            <div className="mx-auto max-w-xs">
                                <form action="">
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-[#f3f4f6] border border-[#ddd] placeholder-gray-500 text-sm focus:outline-none focus:border-[#aaa] focus:bg-[#fff]"
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={login.email}
                                    onChange={handleChangeValue}
                                />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-[#f3f4f6] border border-[#ddd] placeholder-gray-500 text-sm focus:outline-none focus:border-[#aaa] focus:bg-[#fff] mt-5"
                                    type="password"
                                    placeholder="Password"
                                    value={login.password}
                                    name="password"
                                    onChange={handleChangeValue}
                                />
                                <Link to={'/input-gmail'}><p className="text-[#3539ff] underline">Quên mật khẩu?</p></Link>
                                {loading && <div className="flex items-center"><img width={40} src="../../../public/loading login.gif" alt="" /></div>}
                                <button onClick={handleLogin} className="mt-5 tracking-wide font-semibold bg-[#6366f1] text-[#eee] w-full py-4 rounded-lg hover:bg-[#4338ca] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-log-in"
                                    >
                                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                                        <polyline points="10 17 15 12 10 7"></polyline>
                                        <line x1="15" y1="12" x2="3" y2="12"></line>
                                    </svg>
                                    <span className="ml-3">ĐĂNG NHẬP</span>
                                </button>
                                {err && <p className="text-[#f00] text-[14px] py-4">{err.response.data}</p>}
                                </form>
                                <div className="mt-6 text-xs text-gray-600 text-center">
                                    I agree to abide by SnapShare's
                                    <p
                                        href="#"
                                        className=" border-gray-500 border-dotted"
                                    >
                                        Terms of Service
                                    </p>
                                    <p className="mx-auto mt-4">
                                        Do not have an account?{" "}
                                       <Link to={"/register"}>
                                            <strong className="cursor-pointer">
                                                Sign up
                                            </strong>
                                       </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
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
    );
}

export default Login;