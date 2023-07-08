import { Collapse, Radio, RadioGroup } from '@mui/material';
import React, { useState } from 'react';

function PetCharacterItem(props) {
    const [viewUpdate,setViewUpdate] = useState(false);
    const [value, setValue] = useState(null);
    const [name, setName] = useState(null);
    const handleChangeValue = (e) =>{
        setValue(e.target.value)
        setName(e.target.name)
        setViewUpdate(false)
    }
    return (
            <div>
                <span className='text-[#333] text-[14px]'>Có thân thiện với bạn chó khác?</span>
                {value? <button onClick={()=> setViewUpdate(!viewUpdate)} className='flex gap-1 items-center text-[#f98715] font-semibold'>{name}</button>:
                <button onClick={()=> setViewUpdate(!viewUpdate)} className='flex gap-1 items-center text-[#4747f7] font-semibold'><i className="fa-sharp fa-regular fa-pen"></i>Thêm</button>}
                <Collapse in={viewUpdate} timeout="auto" unmountOnExit>
                <ul class="w-48 text-sm font-medium text-[#666] bg-white border border-[#aaa] rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li onClick={handleChangeValue} class="w-full border-b border-[#aaa] rounded-t-lg dark:border-gray-600">
                            <div class="flex items-center pl-3">
                                <input id="list-radio-license" type="radio" value="yes" name="Có" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                <label for="list-radio-license" class="w-full py-3 ml-2 text-sm font-medium text-[#666] dark:text-gray-300">Có</label>
                            </div>
                        </li>
                        <li onClick={handleChangeValue} class="w-full border-b border-[#aaa] rounded-t-lg dark:border-gray-600">
                            <div class="flex items-center pl-3">
                                <input id="list-radio-id" type="radio" value="normal" name="Bình thường" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                <label for="list-radio-id" class="w-full py-3 ml-2 text-sm font-medium text-[#666] dark:text-gray-300">Bình thường</label>
                            </div>
                        </li>
                        <li onClick={handleChangeValue} class="w-full border-b border-[#aaa] rounded-t-lg dark:border-gray-600">
                            <div class="flex items-center pl-3">
                                <input id="list-radio-millitary" type="radio" value="no" name="Không" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                <label for="list-radio-millitary" class="w-full py-3 ml-2 text-sm font-medium text-[#666] dark:text-gray-300">Không</label>
                            </div>
                        </li>
                    </ul>
                    </Collapse>
            </div>
    );
}

export default PetCharacterItem;