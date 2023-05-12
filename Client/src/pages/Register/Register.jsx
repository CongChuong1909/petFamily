import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { makeRequest } from '~/axios';
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
          const res = await  makeRequest.post("auth/register", inputs);
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
        <div className="h-screen bg-purple-200 flex items-center justify-center">
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
        <div className="w-1/2 bg-white rounded-md overflow-hidden flex flex-row-reverse h-4/5">
          <div className="flex-1 bg-[#5179ba] from-purple-800 via-purple-800 to-transparent bg-center bg-cover p-10 flex flex-col gap-4 text-white">
            <h1 className="text-8xl leading-none">Lama Social.</h1>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
              alias totam numquam ipsa exercitationem dignissimos, error nam,
              consequatur.
            </p>
            <span>Do you have an account?</span>
            <Link to="/login">
              <button className="w-1/2 py-2 px-4 bg-white text-purple-700 font-bold rounded-full mt-auto">
                Login
              </button>
            </Link>
          </div>
          <div className="flex-1 p-10 flex flex-col gap-8 justify-center">
            <h1 className="text-4xl text-gray-700">Register</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                className="border-b-2 border-gray-400 py-2 px-4 focus:outline-none focus:border-purple-700"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                className="border-b-2 border-gray-400 py-2 px-4 focus:outline-none focus:border-purple-700"
              />
              <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={handleChange}
                className="border-b-2 border-gray-400 py-2 px-4 focus:outline-none focus:border-purple-700"
              />
              {err && <span className="text-[rgb(243,41,41)]">{err}</span>}
              <button
                type='submit'
                className="w-1/2 py-2 px-4 bg-purple-700 text-white font-bold rounded-full mt-auto"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
      
    );
}

export default Register;