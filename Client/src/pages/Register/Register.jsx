
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {makeRequestAuth } from '~/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Register(props) {
        const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: "",
      });
    const [err, setErr] = useState(null);
    const navigate = useNavigate();

      const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if(inputs.password.length < 6)
        {
            setErr("Password must be more than 6 characters!");
        }
        else if (!isValidCookieName(inputs.name)){
            setErr("Please enter name valid!");
        }
        else{
            try {
          const res = await  makeRequestAuth.post("auth/register", inputs);
          console.log(res);
          if(res.status === 200)
            {
                toast("Regiter successfully!")
                navigate("/login")
            }
        } catch (err) {
            if(err.response)
                setErr(err.response.data);
        }
        }

      };
      const isValidCookieName = (name) =>{
        if (!name || typeof name !== 'string') return false;
        if (name.length > 4096)return false;
        if (/^\s|\s$|\(|\)|\<|\>|\@|\,|\;|\\|\"|\:|\/|\[|\]|\?|\=/.test(name)) return false;
        if (!/^[\x20-\x7E]*$/.test(name)) return false;
        return true;
      }
    return (
        <div>
            <div className="min-h-screen bg-[#e5e7eb] text-[#111827] flex  justify-center">
                 <ToastContainer
                    position="top-center"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <div className="max-w-screen-xl m-0 sm:m-10 bg-[#fff] shadow sm:rounded-lg flex-row-reverse flex justify-center flex-1">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <div className="mt-5 flex flex-col items-center">
                            <h1 className="text-2xl xl:text-3xl font-extrabold">
                                Sign up
                            </h1>
                            <div className="w-full flex-1 mt-8">
                                <div className="flex flex-col items-center"></div>
                                <div className="my-12 border-b border-[#ddd] text-center">
                                    <div className="leading-none px-2 inline-block text-sm text-[#4b5563] tracking-wide font-medium bg-[#fff] transform translate-y-1/2">
                                        Sign up up with e-mail
                                    </div>
                                </div>
                                <div className="mx-auto max-w-xs">
                                    <form onSubmit={handleSubmit} action="">
                                        <input
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-[#e5e7eb] border border-[#d1d3d7] placeholder-[#6b7280] text-sm focus:outline-none focus:border-[#9ca3af] focus:bg-[#fff]"
                                            type="name"
                                            placeholder="Full Name"
                                            name='name'
                                            value={inputs.name}
                                            onChange={handleChange}
                                        />
                                        <input
                                            className="w-full px-8 py-4 mt-5 rounded-lg font-medium bg-[#e5e7eb] border border-[#d1d3d7] placeholder-[#6b7280] text-sm focus:outline-none focus:border-[#9ca3af] focus:bg-[#fff]"
                                            type="email"
                                            placeholder="Email"
                                            name='email'
                                            value={inputs.email}
                                            onChange={handleChange}
                                        />
                                        <input
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-[#e5e7eb] border border-[#d1d3d7] placeholder-[#6b7280] text-sm focus:outline-none focus:border-[#9ca3af] focus:bg-[#fff] mt-5"
                                            type="password"
                                            name='password'
                                            placeholder="Password"
                                            value={inputs.password}
                                            onChange={handleChange}
                                        />
                                        <button type='submit' className="mt-5 tracking-wide font-semibold bg-[#6366f1] text-[#e5e7eb] w-full py-4 rounded-lg hover:bg-[#4338ca] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                            <svg
                                                className="w-6 h-6 -ml-2"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                                                <circle
                                                    cx="8.5"
                                                    cy="7"
                                                    r="4"
                                                ></circle>
                                                <path d="M20 8v6M23 11h-6"></path>
                                            </svg>
                                            <span className="ml-3">Sign up</span>
                                        </button>
                                        {err && <span className="text-[rgb(243,41,41)]">{err}</span>}
                                    </form>
                                    <div className="mt-6 text-xs text-[#4b5563] text-center">
                                        I agree to abide by SnapShare's
                                        <p
                                            href="#"
                                            className=" border-[#6b7280] border-dotted"
                                        >
                                            Terms of Service
                                        </p>
                                        <p className="mx-auto mt-4">
                                            Do you already have an account?{" "}
                                            <Link to="/login">
                                                <strong className="cursor-pointer">
                                                    Sign in
                                                </strong>
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-[#e0e7ff] text-center hidden lg:flex">
                        <div
                            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                            style={{ 
                                backgroundImage: `url("https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp")` 
                            }}
                            
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
