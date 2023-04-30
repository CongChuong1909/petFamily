import React, { useState } from 'react';

const brightColors = [
    "#7fbdff", 
    "#8fe4cb",
    "#28c76f",
    "#f148e4",
    "#b7a0e0",
    "#93d3a2",
    "#febe89",
    "#b287f8",

  ];

const listPet = [
    {
        name: "Cam",
        image:""
    },
    {
        name: "Chanh",
        image:""
    },
    {
        name: "Mít",
        image:""
    },
]

function PostTag(props) {
    const [listTag, setListTag] =useState(listPet)
    function randomBrightHexColor() {
        var hexChars = '0123456789ABCDEF'; 
        var hex = '#';
        for (var i = 0; i < 6; i++) {
          var index = Math.floor(Math.random() * hexChars.length);
          hex += hexChars[index];
        }
        return hex;
      }

      const handleRemoveTag = (index) =>{
            var list = [...listTag];
            list.splice(index,1);
            console.log(list);
            setListTag(list);
      }
      
    return (
        <div className='flex pt-4'>
                <span>With</span>
                {
                    listTag.map((item, index) =>{
                        var randomColor = randomBrightHexColor();
                        return(
                            <div key={index} className='flex items-center rounded-xl px-2 py-1 mx-3 opacity-[1]' style={{backgroundColor: brightColors[index]}}> 
                            <img className='w-[20px] h-[20px] rounded-full' src={item.image} alt="" />
                                <span className='px-1 text-[#fff]'>{item.name}</span>
                                <div className='h-full flex items-center '>
                                    <i onClick={()=>handleRemoveTag(index)} className="fa-thin fa-x pl-1 cursor-pointer pt-[6px] text-[#fff] text-[10px]"></i>
                                </div>
                            </div>
                        )
                    }
                        
                    )
                }
            </div>
    );
}

export default PostTag;