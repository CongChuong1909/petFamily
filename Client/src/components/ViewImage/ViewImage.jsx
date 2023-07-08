import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
function ViewImage(props) {
    const {setShowImage, arrImage, initialSlice} = props;
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        initialSlide: initialSlice || 0,
        slidesToScroll: 1,
    };
    console.log(arrImage);
    return (
        <div className='popup_image' onClick={()=>setShowImage(false)}>
            <div onClick={()=>setShowImage(false)} className='p-2 bg-[#fff] text-[#000] absolute top-10 right-10 cursor-pointer rounded-md z-[100]'><CloseIcon fontSize='small'/></div>
            <div className='layout_image' onClick={(e)=> e.stopPropagation()} >
            <Slider className="flex w-[70%]" {...settings}>
                {arrImage.map((image, index) => (
                    <div key={index} className="w-full h-full px-4 flex justify-center items-center slick-comment">
                    <div className="max-w-[90%] max-h-[90vh] flex items-center justify-center">
                        <img
                        className="max-h-full max-w-full rounded-sm object-contain"
                        src={image.url}
                        alt=""
                        />
                    </div>
                    </div>
                ))}
                </Slider>
            </div>    
        </div>
    );
}

export default ViewImage;