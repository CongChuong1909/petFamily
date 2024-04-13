
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";;
import { makeRequestAuth } from "../../axios";
import "./Login.css"
function Login(props) {
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
       try {
            const res = await makeRequestAuth.post("auth/login", login,{
                withCredentials:true,
                credentials: 'include'
            });
           if(res.status === 200)
           {
                navigate("/")
           }
       } catch (error) {
            setErr(error.response.data)
       }finally {
        setLoading(false); 
      }
    }
    const google = () =>{
        window.open("http://petfamily.click/google","_self");
    }


    return ( <div className="container">
    <div className="content-container">
      <div className="form-container">
        <h1 className="heading">Sign In</h1>
        <button className="button-google">
          <div className="button-google-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M20 10a10 10 0 11-20 0 10 10 0 0120 0zm-9.5 3.7a.9.9 0 01-.9.9H10v3.6a.9.9 0 01-.9.9.9.9 0 01-.9-.9V14h-3.6a.9.9 0 01-.9-.9.9.9 0 01.9-.9H8v-3.6a.9.9 0 01.9-.9.9.9 0 01.9.9V12h3.6a.9.9 0 01.9.9z"
              />
            </svg>
          </div>
          <span className="button-google-text">Sign in with Google</span>
        </button>
        <button className="button-github">
          <div className="button-github-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12 2a10 10 0 00-3.162 19.487c.5.09.682-.215.682-.48 0-.237-.01-.867-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.15-1.11-1.457-1.11-1.457-.906-.618.068-.606.068-.606 1 .07 1.525 1.028 1.525 1.028.89 1.525 2.34 1.085 2.91.83.09-.648.35-1.085.636-1.335-2.225-.25-4.558-1.112-4.558-4.943 0-1.09.388-1.983 1.028-2.682-.102-.25-.446-1.268.098-2.643 0 0 .838-.267 2.75 1.024A9.712 9.712 0 0112 6.415c.838-.003 1.682-.113 2.472-.334 1.912-1.29 2.75-1.024 2.75-1.024.544 1.375.202 2.393.1 2.643.64.7 1.03 1.593 1.03 2.682 0 3.84-2.336 4.688-4.572 4.932.36.31.678.922.678 1.858 0 1.34-.013 2.42-.013 2.75 0 .267.18.573.688.474A9.993 9.993 0 0022 12c0-5.523-4.477-10-10-10"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="button-github-text">Sign in with GitHub</span>
        </button>
        <div className="or-divider">
          <div className="or-divider-line"></div>
          <div className="or-divider-text">or</div>
          <div className="or-divider-line"></div>
        </div>
        <form className="form">
          <input type="email" name = "email" value={login.email} onChange={handleChangeValue} placeholder="Email" required />
          <input type="password" name="password" value={login.password} onChange={handleChangeValue} placeholder="Password" required />
          <button type="submit" onClick={handleLogin}>
              
            {loading ? (
                <img src="../../../public/" alt="" />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                        fillRule="evenodd"
                        d="M18.707 4.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 011.414-1.414L10 10.586l6.293-6.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                  </svg>
                  Sign In
                </>
              )}
          </button>
        </form>
        <div className="error-message"></div>
        <div className="additional-info">
          <a href="#">Forgot password?</a>
          <div className="signup-link">
            Don't have an account? <strong>Sign up</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
        
    );
}

export default Login;