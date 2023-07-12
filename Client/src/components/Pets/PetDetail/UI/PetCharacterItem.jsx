import { Collapse, } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { makeRequest } from '~/axios';

function PetCharacterItem(props) {
    const {data, isView, item} = props
    const [viewUpdate,setViewUpdate] = useState(false);
    const [value, setValue] = useState(null);
    const [name, setName] = useState(item.value === 1? 'có': item.value === 2 ? 'không' : item.value === 3 ? 'bình thường' : '');
    const queryClient = useQueryClient();
    const mutationUpdate = useMutation(
        (item)=>{
            return makeRequest.put("/petdetail/updatePetCharacter", item)
        },{
        onSuccess:()=>{
            queryClient.invalidateQueries(["petCharacter"]);
        }
    })

    const handleChangeValue = (e, name) =>{
        setValue(e.target.value)
        setName(e.target.name)
        console.log(e.target.value === 'yes' ? 1: e.target.value === 'no' ? 2: e.target.value === 'normal' ? 3: 0);
        const updatedData = {
            ...data,
            [name]: e.target.value === 'yes' ? 1: e.target.value === 'no' ? 2: e.target.value === 'normal' ? 3: 0
          };

          console.log(updatedData);
        mutationUpdate.mutate(updatedData);
        setViewUpdate(false)
    }

    return (
      
            <>
                {
                    item.name === 'isFriendlyWithDog'?
                    <div>
                        <span className='text-[#333] text-[14px]'>Có thân thiện với bạn chó khác?</span>
                        {data?.isFriendlyWithDog === 0 && !isView ? 
                        <button onClick={()=> setViewUpdate(!viewUpdate)} className='flex gap-1 items-center text-[#4747f7] font-semibold'><i className="fa-sharp fa-regular fa-pen"></i>Thêm</button>:
                        <button onClick={()=> setViewUpdate(!viewUpdate)} className='flex gap-1 items-center text-[#f98715] font-semibold'>{name}</button>}
                        {data?.isFriendlyWithDog === 0 && isView &&
                        <button className='flex gap-1 items-center text-[#333] font-semibold'>Chưa có dữ liệu được hiển thị</button>}
                        <Collapse in={viewUpdate} timeout="auto" unmountOnExit>
                        <ul className="w-48 text-sm font-medium text-[#666] bg-white border border-[#aaa] rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                
                                <li onClick={(e)=>handleChangeValue(e, item.name)} className="w-full border-b border-[#aaa] rounded-t-lg dark:border-gray-600">
                                    <div className="flex items-center pl-3">
                                        <input id="list-radio-license" type="radio" value="yes" name="Có" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                        <label htmlFor="list-radio-license" className="w-full py-3 ml-2 text-sm font-medium text-[#666] dark:text-gray-300">Có</label>
                                    </div>
                                </li>
                                <li onClick={(e)=>handleChangeValue(e, item.name)} className="w-full border-b border-[#aaa] rounded-t-lg dark:border-gray-600">
                                    <div className="flex items-center pl-3">
                                        <input id="list-radio-id" type="radio" value="normal" name="Bình thường" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                        <label htmlFor="list-radio-id" className="w-full py-3 ml-2 text-sm font-medium text-[#666] dark:text-gray-300">Bình thường</label>
                                    </div>
                                </li>
                                <li onClick={(e)=>handleChangeValue(e, item.name)} className="w-full border-b border-[#aaa] rounded-t-lg dark:border-gray-600">
                                    <div className="flex items-center pl-3">
                                        <input id="list-radio-millitary" type="radio" value="no" name="Không" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                        <label htmlFor="list-radio-millitary" className="w-full py-3 ml-2 text-sm font-medium text-[#666] dark:text-gray-300">Không</label>
                                    </div>
                                </li>
                            </ul>
                        </Collapse>
                    </div>
                    :item.name === 'isFriendlyWithCat'?
                    <div>
                        <span className='text-[#333] text-[14px]'>Có thân thiện với bạn mèo khác?</span>
                        {data?.isFriendlyWithCat === 0 && !isView ? 
                        <button onClick={()=> setViewUpdate(!viewUpdate)} className='flex gap-1 items-center text-[#4747f7] font-semibold'><i className="fa-sharp fa-regular fa-pen"></i>Thêm</button>:
                        <button onClick={()=> setViewUpdate(!viewUpdate)} className='flex gap-1 items-center text-[#f98715] font-semibold'>{name}</button>}
                        {data?.isFriendlyWithCat === 0 && isView &&
                        <button className='flex gap-1 items-center text-[#333] font-semibold'>Chưa có dữ liệu được hiển thị</button>}
                        <Collapse in={viewUpdate} timeout="auto" unmountOnExit>
                        <ul className="w-48 text-sm font-medium text-[#666] bg-white border border-[#aaa] rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                <li onClick={(e)=>handleChangeValue(e, item.name)} className="w-full border-b border-[#aaa] rounded-t-lg dark:border-gray-600">
                                    <div className="flex items-center pl-3">
                                        <input id="list-radio-license" type="radio" value="yes" name="Có" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                        <label htmlFor="list-radio-license" className="w-full py-3 ml-2 text-sm font-medium text-[#666] dark:text-gray-300">Có</label>
                                    </div>
                                </li>
                                <li onClick={(e)=>handleChangeValue(e, item.name)} className="w-full border-b border-[#aaa] rounded-t-lg dark:border-gray-600">
                                    <div className="flex items-center pl-3">
                                        <input id="list-radio-id" type="radio" value="normal" name="Bình thường" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                        <label htmlFor="list-radio-id" className="w-full py-3 ml-2 text-sm font-medium text-[#666] dark:text-gray-300">Bình thường</label>
                                    </div>
                                </li>
                                <li onClick={(e)=>handleChangeValue(e, item.name)} className="w-full border-b border-[#aaa] rounded-t-lg dark:border-gray-600">
                                    <div className="flex items-center pl-3">
                                        <input id="list-radio-millitary" type="radio" value="no" name="Không" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                        <label htmlFor="list-radio-millitary" className="w-full py-3 ml-2 text-sm font-medium text-[#666] dark:text-gray-300">Không</label>
                                    </div>
                                </li>
                            </ul>
                        </Collapse>
                    </div>:
                    item.name === 'isFriendlyWithChild'?
                    <div>
                        <span className='text-[#333] text-[14px]'>Có thân thiện với trẻ nhỏ?</span>
                        {data?.isFriendlyWithChild === 0 && !isView ? 
                        <button onClick={()=> setViewUpdate(!viewUpdate)} className='flex gap-1 items-center text-[#4747f7] font-semibold'><i className="fa-sharp fa-regular fa-pen"></i>Thêm</button>:
                        <button onClick={()=> setViewUpdate(!viewUpdate)} className='flex gap-1 items-center text-[#f98715] font-semibold'>{name}</button>}
                        {data?.isFriendlyWithChild === 0 && isView &&
                        <button className='flex gap-1 items-center text-[#333] font-semibold'>Chưa có dữ liệu được hiển thị</button>}
                        <Collapse in={viewUpdate} timeout="auto" unmountOnExit>
                        <ul className="w-48 text-sm font-medium text-[#666] bg-white border border-[#aaa] rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                <li onClick={(e)=>handleChangeValue(e, item.name)} className="w-full border-b border-[#aaa] rounded-t-lg dark:border-gray-600">
                                    <div className="flex items-center pl-3">
                                        <input id="list-radio-license" type="radio" value="yes" name="Có" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                        <label htmlFor="list-radio-license" className="w-full py-3 ml-2 text-sm font-medium text-[#666] dark:text-gray-300">Có</label>
                                    </div>
                                </li>
                                <li onClick={(e)=>handleChangeValue(e, item.name)} className="w-full border-b border-[#aaa] rounded-t-lg dark:border-gray-600">
                                    <div className="flex items-center pl-3">
                                        <input id="list-radio-id" type="radio" value="normal" name="Bình thường" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                        <label htmlFor="list-radio-id" className="w-full py-3 ml-2 text-sm font-medium text-[#666] dark:text-gray-300">Bình thường</label>
                                    </div>
                                </li>
                                <li onClick={(e)=>handleChangeValue(e, item.name)} className="w-full border-b border-[#aaa] rounded-t-lg dark:border-gray-600">
                                    <div className="flex items-center pl-3">
                                        <input id="list-radio-millitary" type="radio" value="no" name="Không" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                        <label htmlFor="list-radio-millitary" className="w-full py-3 ml-2 text-sm font-medium text-[#666] dark:text-gray-300">Không</label>
                                    </div>
                                </li>
                            </ul>
                        </Collapse>
                    </div>:
                    item.name === 'isToiletRightPlace'?
                    <div>
                        <span className='text-[#333] text-[14px]'>Đi vệ sinh đúng chỗ?</span>
                        {data?.isToiletRightPlace === 0 && !isView ? 
                        <button onClick={()=> setViewUpdate(!viewUpdate)} className='flex gap-1 items-center text-[#4747f7] font-semibold'><i className="fa-sharp fa-regular fa-pen"></i>Thêm</button>:
                        <button onClick={()=> setViewUpdate(!viewUpdate)} className='flex gap-1 items-center text-[#f98715] font-semibold'>{name}</button>}
                        {data?.isToiletRightPlace === 0 && isView &&
                        <button className='flex gap-1 items-center text-[#333] font-semibold'>Chưa có dữ liệu được hiển thị</button>}
                        <Collapse in={viewUpdate} timeout="auto" unmountOnExit>
                        <ul className="w-48 text-sm font-medium text-[#666] bg-white border border-[#aaa] rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                <li onClick={(e)=>handleChangeValue(e, item.name)} className="w-full border-b border-[#aaa] rounded-t-lg dark:border-gray-600">
                                    <div className="flex items-center pl-3">
                                        <input id="list-radio-license" type="radio" value="yes" name="Có" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                        <label htmlFor="list-radio-license" className="w-full py-3 ml-2 text-sm font-medium text-[#666] dark:text-gray-300">Có</label>
                                    </div>
                                </li>
                                <li onClick={(e)=>handleChangeValue(e, item.name)} className="w-full border-b border-[#aaa] rounded-t-lg dark:border-gray-600">
                                    <div className="flex items-center pl-3">
                                        <input id="list-radio-id" type="radio" value="normal" name="Bình thường" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                        <label htmlFor="list-radio-id" className="w-full py-3 ml-2 text-sm font-medium text-[#666] dark:text-gray-300">Bình thường</label>
                                    </div>
                                </li>
                                <li onClick={(e)=>handleChangeValue(e, item.name)} className="w-full border-b border-[#aaa] rounded-t-lg dark:border-gray-600">
                                    <div className="flex items-center pl-3">
                                        <input id="list-radio-millitary" type="radio" value="no" name="Không" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                        <label htmlFor="list-radio-millitary" className="w-full py-3 ml-2 text-sm font-medium text-[#666] dark:text-gray-300">Không</label>
                                    </div>
                                </li>
                            </ul>
                        </Collapse>
                    </div>:
                    item.name === 'isShy'?
                    <div>
                        <span className='text-[#333] text-[14px]'>Nhút nhát, sợ sệt</span>
                        {data?.isShy === 0 && !isView ? 
                        <button onClick={()=> setViewUpdate(!viewUpdate)} className='flex gap-1 items-center text-[#4747f7] font-semibold'><i className="fa-sharp fa-regular fa-pen"></i>Thêm</button>:
                        <button onClick={()=> setViewUpdate(!viewUpdate)} className='flex gap-1 items-center text-[#f98715] font-semibold'>{name}</button>}
                        {data?.isShy === 0 && isView &&
                        <button className='flex gap-1 items-center text-[#333] font-semibold'>Chưa có dữ liệu được hiển thị</button>}
                        <Collapse in={viewUpdate} timeout="auto" unmountOnExit>
                        <ul className="w-48 text-sm font-medium text-[#666] bg-white border border-[#aaa] rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                <li onClick={(e)=>handleChangeValue(e, item.name)} className="w-full border-b border-[#aaa] rounded-t-lg dark:border-gray-600">
                                    <div className="flex items-center pl-3">
                                        <input id="list-radio-license" type="radio" value="yes" name="Có" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                        <label htmlFor="list-radio-license" className="w-full py-3 ml-2 text-sm font-medium text-[#666] dark:text-gray-300">Có</label>
                                    </div>
                                </li>
                                <li onClick={(e)=>handleChangeValue(e, item.name)} className="w-full border-b border-[#aaa] rounded-t-lg dark:border-gray-600">
                                    <div className="flex items-center pl-3">
                                        <input id="list-radio-id" type="radio" value="normal" name="Bình thường" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                        <label htmlFor="list-radio-id" className="w-full py-3 ml-2 text-sm font-medium text-[#666] dark:text-gray-300">Bình thường</label>
                                    </div>
                                </li>
                                <li onClick={(e)=>handleChangeValue(e, item.name)} className="w-full border-b border-[#aaa] rounded-t-lg dark:border-gray-600">
                                    <div className="flex items-center pl-3">
                                        <input id="list-radio-millitary" type="radio" value="no" name="Không" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                        <label htmlFor="list-radio-millitary" className="w-full py-3 ml-2 text-sm font-medium text-[#666] dark:text-gray-300">Không</label>
                                    </div>
                                </li>
                            </ul>
                        </Collapse>
                    </div>:
                    <div>
                    <span className='text-[#333] text-[14px]'>Hiếu động</span>
                    {data?.isActive === 0 && !isView ? 
                        <button onClick={()=> setViewUpdate(!viewUpdate)} className='flex gap-1 items-center text-[#4747f7] font-semibold'><i className="fa-sharp fa-regular fa-pen"></i>Thêm</button>:
                        <button onClick={()=> setViewUpdate(!viewUpdate)} className='flex gap-1 items-center text-[#f98715] font-semibold'>{name}</button>}
                        {data?.isActive === 0 && isView &&
                        <button className='flex gap-1 items-center text-[#333] font-semibold'>Chưa có dữ liệu được hiển thị</button>}
                    <Collapse in={viewUpdate} timeout="auto" unmountOnExit>
                    <ul className="w-48 text-sm font-medium text-[#666] bg-white border border-[#aaa] rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <li onClick={(e)=>handleChangeValue(e, item.name)} className="w-full border-b border-[#aaa] rounded-t-lg dark:border-gray-600">
                                <div className="flex items-center pl-3">
                                    <input id="list-radio-license" type="radio" value="yes" name="Có" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label htmlFor="list-radio-license" className="w-full py-3 ml-2 text-sm font-medium text-[#666] dark:text-gray-300">Có</label>
                                </div>
                            </li>
                            <li onClick={(e)=>handleChangeValue(e, item.name)} className="w-full border-b border-[#aaa] rounded-t-lg dark:border-gray-600">
                                <div className="flex items-center pl-3">
                                    <input id="list-radio-id" type="radio" value="normal" name="Bình thường" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label htmlFor="list-radio-id" className="w-full py-3 ml-2 text-sm font-medium text-[#666] dark:text-gray-300">Bình thường</label>
                                </div>
                            </li>
                            <li onClick={(e)=>handleChangeValue(e, item.name)} className="w-full border-b border-[#aaa] rounded-t-lg dark:border-gray-600">
                                <div className="flex items-center pl-3">
                                    <input id="list-radio-millitary" type="radio" value="no" name="Không" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label htmlFor="list-radio-millitary" className="w-full py-3 ml-2 text-sm font-medium text-[#666] dark:text-gray-300">Không</label>
                                </div>
                            </li>
                        </ul>
                    </Collapse>
                </div>


                }
            </>
    
            
    );
}

export default PetCharacterItem;