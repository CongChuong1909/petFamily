
import React, { useState } from "react"
import { makeRequestAuth } from "~/axios";
function GmailInput(props) {
    const [email, setEmail]= useState(''); 
    // const [searchParams, setSearchParams] = useSearchParams();
    // const emailToken= searchParams.get("emailToken")
    const [res, setRes] = useState(null)
    const verifyEmail = async (email) => {
            try {
                const res = await makeRequestAuth.post('auth/updateTokenEmail', { email });
                    setRes(res.data)
                    return res.data;
              } catch (error) {
                throw new Error(res.error)
              }
      };
    const handleSendEmail = ()=>{
        verifyEmail(email);
        console.log(res);
    }


    return (
        <div className="min-h-screen bg-[#f2f3f5] text-[#111827] flex justify-center">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-[#fff] shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <p className="pb-2">Nhập e-mail của bạn</p>
                    <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-[#f3f4f6] border border-[#ddd] placeholder-gray-500 text-sm focus:outline-none focus:border-[#aaa] focus:bg-[#fff]"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <button onClick={handleSendEmail} className="mt-5 tracking-wide font-semibold bg-[#6366f1] text-[#eee] w-full py-2 rounded-lg hover:bg-[#4338ca] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">            
                        <span className="ml-3">Gửi mã xác nhận</span>
                    </button>
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

export default GmailInput;