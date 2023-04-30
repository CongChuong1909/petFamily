import React from 'react';

function SuggestGroups(props) {
    return (
        <div className='item mt-5'>
            <h4 className='text-[#999] pb-2  border-b border-[#ccc]'>Suggestions Groups You</h4>
           <div className='flex gap-3 justify-between pb-3 pt-3'>
                <div className='flex gap-3 items-center w-full'>
                    <img className='w-[40px] h-[40px] rounded-full ' src="https://kimipet.vn/wp-content/uploads/2022/09/cac-mau-cua-meo-anh-long-ngan.jpg" alt="" />
                    <div className='flex flex-col w-full'>
                        <div className='flex justify-between w-full cursor-pointer'>
                            <span className='font-semibold text-[17px]'><i className="fa-light fa-users-medical"></i> British shorthair cat</span>
                            <span className='text-[#008ce8]'>follow <i className="fa-light fa-square-plus text-[#008ce8]"></i></span>
                        </div>
                        <span>British shorthair cat lovers group</span>   
                    </div>
                </div>
           </div>
           <div className='flex gap-3 justify-between pb-3 pt-3'>
                <div className='flex gap-3 items-center w-full'>
                    <img className='w-[40px] h-[40px] rounded-full ' src="https://azpet.com.vn/wp-content/uploads/2022/09/C2765-C13191-5.jpg" alt="" />
                    <div className='flex flex-col w-full'>
                        <div className='flex justify-between cursor-pointer w-full'>
                            <span className='font-semibold text-[17px]'><i className="fa-light fa-users-medical"></i> Poodle dog</span>
                            <span className='text-[#008ce8]'>follow <i className="fa-light fa-square-plus text-[#008ce8]"></i></span>
                        </div>
                        <span>Poodle dog lovers group</span>   
                    </div>
                </div>
           </div>
           <div className='flex gap-3 justify-between pb-3 pt-3'>
                <div className='flex gap-3 items-center w-full'>
                    <img className='w-[40px] h-[40px] rounded-full ' src="https://sieupet.com/sites/default/files/pictures/images/nh%C3%B3m-c%E1%BB%A9u-tr%E1%BB%A3-%C4%91%E1%BB%99ng-v%E1%BA%ADt-SAR.jpg" alt="" />
                    <div className='flex flex-col w-full'>
                        <div className='flex justify-between cursor-pointer w-full'>
                            <span className='font-semibold text-[17px]'><i className="fa-light fa-users-medical"></i> Hard animal rescue station</span>
                            <span className='text-[#008ce8]'>follow <i className="fa-light fa-square-plus text-[#008ce8]"></i></span>
                        </div>
                        <span>Contains top veterinarians with extensive experience</span>   
                    </div>
                </div>
           </div>
        </div>
    );
}

export default SuggestGroups;