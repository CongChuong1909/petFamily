import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { makeRequest } from '../../axios';
import { useQuery } from 'react-query';
function ReportImage(props) {
    const {idpost}= props
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

      const imagesQuery = useQuery({
        queryKey: ["images", idpost],
        queryFn: async () => {
          const res = await makeRequest.get(`/images/getImagePost/${idpost}`);
          return res.data;
        },
      });

    return (
        <div className='w-[300px] ' >
            {imagesQuery.isSuccess && imagesQuery.data.length>0 &&
                <Slider {...settings} className='w-full'>
                    {
                        imagesQuery.data.map((image, index) => (
                            <div>
                                <img width={300} src={image.url} alt="" />
                            </div>
                        ))
                    }
                </Slider>
            }
            
    </div>
    );
}

export default ReportImage;