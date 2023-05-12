import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "~/axios";
import { loginFailure, loginStart, loginSuccess } from "~/redux/userSlices";


function Login(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [login, setLogin] = useState({
        email: "",
        password:""
    })


    const handleChangeValue = (e) =>{
        setLogin(prev =>({...prev, [e.target.name]: e.target.value }))
    }   

    const handleLogin = async(e)=>{
        e.preventDefault();
        dispatch(loginStart());
       try {
            const res = await makeRequest.post("auth/login", login,{
                withCredentials:true,
                credentials: 'include'
            });
           if(res.status === 200)
           {
            
            navigate("/")
            dispatch(loginSuccess(res.data));
           }
            
           
       } catch (error) {
            dispatch(loginFailure());
       }
    }

    return (
        <div className="min-h-screen bg-purple-200 flex items-center justify-center">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg flex w-1/2">
                <div className="bg-[#5179ba] p-8 flex flex-col justify-center text-white flex-1">
                    <h1 className="text-6xl leading-none mb-6">Hello World.</h1>
                    <p className="mb-6">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Libero cum, alias totam numquam ipsa exercitationem
                        dignissimos, error nam, consequatur.
                    </p>
                    <span className="text-sm">Don't you have an account?</span>
                    <Link
                        to="/register"
                        className="bg-white text-purple-800 py-2 px-4 rounded-lg mt-4 hover:bg-gray-200 transition duration-300 ease-in-out"
                    >
                        Register
                    </Link>
                </div>
                <div className="p-8 flex flex-col justify-center flex-1">
                    <h1 className="text-4xl font-bold text-gray-700 mb-6">Login</h1>
                    <form className="flex flex-col">
                        <input
                            type="text"
                            placeholder="email"
                            name="email"
                            onChange={handleChangeValue}
                            className="border-b border-gray-400 py-2 px-4 mb-4 focus:outline-none focus:border-purple-800"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChangeValue}
                            className="border-b border-gray-400 py-2 px-4 mb-4 focus:outline-none focus:border-purple-800"
                        />
                        {/* {err && err} */}
                        <button
                            onClick={handleLogin}
                            className="bg-purple-800 text-white py-2 px-4 rounded-lg mt-6 hover:bg-purple-700 transition duration-300 ease-in-out"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
