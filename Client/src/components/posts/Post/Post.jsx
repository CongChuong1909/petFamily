
import { useMutation, useQuery } from '@tanstack/react-query';
import moment from 'moment/moment';
import React, { useEffect, useRef, useState } from 'react';
import { getImages } from '~/API/postAPI';
import { makeRequest } from '~/axios';


const dataBg = 
{
    1:"https://pety.vn/static/media/p1.562333b0.jpg",
    2:"https://pety.vn/static/media/p2.e2fedf9e.jpg",
    3:"https://pety.vn/static/media/p3.8ddba762.jpg",
    4:"https://pety.vn/static/media/p4.d230127a.jpg",
}


const classConfig = {
    1: 'col-span-4 min-h-[640px]',
    2: 'col-span-4 min-h-[480px]',
    3: {
      0: 'col-span-12 h-[400px]',
      1: 'col-span-6 h-48',
      2: 'col-span-6 h-48',
      'default': 'col-span-4 h-32',
    },
    4: {
      0: 'col-span-6 h-64',
      1: 'col-span-6 h-64',
      2: 'col-span-6 h-64',
      3: 'col-span-6 h-64',
      'default': 'col-span-4 h-32',
    },
    'default': {
        0: 'col-span-6 h-72',
        1: 'col-span-6 h-72',
        2: 'col-span-4 h-64',
        3: 'col-span-4 h-64',
        4: 'col-span-4 h-64',
        'default': 'col-span-4 h-36',
    },
  };
  const getConfig = (length, index) => {
    const config = classConfig[length] || classConfig['default'];
    return typeof config === 'object' ? config[index] || config['default'] : config;
  };

  function Post(props) {
    const [showMore, setShowMore] = useState(false);
    const [like, setLike] = useState(false);
    const [arrImage, setArrImage] = useState([]);
    const handleShowMore = () => {
      setShowMore(!showMore);
    };
    const { postItem } = props;
  
    const imagesQuery = useQuery({
      queryKey: ["images", postItem.idposts],
      queryFn: async () => {
        const res = await makeRequest.get(`/images/getImagePost/${postItem.idposts}`);
        return res.data;
      },
    });
  
    useEffect(() => {
      imagesQuery.refetch();
    }, [postItem.idposts]);
  
    useEffect(() => {
      if (imagesQuery.isFetched) {
        const imagesData = imagesQuery.data || [];
        const arrImage = imagesData.map((image) => image.url);
        setArrImage(arrImage);
      }
    }, [postItem.idposts, imagesQuery.isFetched, imagesQuery.data]);
  
    return (
      <>
        <div
          key={postItem.idposts}
          className="item px-3"
        >
          <div className='flex justify-between items-center border_bottom pb-2'>
                <div className='flex items-center gap-4 '>
                    <div className='flex items-center gap-2'>
                        <div><img className='w-[40px] h-[40px] rounded-full' src={postItem.avatar} alt="" /></div>
                        <p className='font-semibold text-[18px]'>{postItem.name}</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <i className=" text-[4px] fa-duotone fa-circle"></i>
                        <p className='text-[#999]'>{moment(postItem.date_create).fromNow()}</p>
                    </div>
                </div>
                <div>
                <i className="fa-solid fa-ellipsis"></i>
                </div>
            </div>
                 {
                     postItem.post_bg ? 
                     <div className='pt-4 px-12 pb-3 bg-cover bg-right-bottom text-[#fff]  font-bold' style={{ backgroundImage: `url(${dataBg[postItem.post_bg]})`, display: 'flex', alignItems: 'center',  justifyContent: 'center', height: '480px', }} >
                         <p className='text-[32px]'>{postItem.textcontent}</p>
                     </div>
                 :
                     <div className='pt-4 px-12 pb-3'>
                         <p>{postItem.textcontent}</p>
                     </div>
                 }
  
          {imagesQuery.error
            ? "something went wrong!"
            : imagesQuery.isLoading
            ? "loading..."
            : imagesQuery.data.length === 0
            ? null
            : (
                <div
                  className={`grid gap-4 ${
                    arrImage.length === 1
                      ? "grid-cols-4"
                      : arrImage.length === 2
                      ? "grid-cols-8"
                      : "grid-cols-12"
                  } w-full flex justify-center items-center px-16`}
                >
                  {/* Render preview images */}
                  {arrImage.slice(0, 5).map((image, index) => (
                    <div
                      key={index}
                      className={`bg-gray-200 ${getConfig(
                        arrImage.length,
                        index
                      )} relative flex items-center justify-center w-full overflow-hidden`}
                    >
                        <img
                            src={image}
                            className="absolute top-0 left-0 h-full w-full object-cover"
                            alt={`Preview ${index}`}
                        />
                        {arrImage.length > 5 && index === 4 && (
                            <div className="absolute inset-0 w-full h-full  bg-[rgba(0,0,0,0.31)] flex justify-center items-center">
                            <div
                                onClick={handleShowMore}
                                className="text-white bg-gray-500 px-2 cursor-pointer py-1 rounded-md"
                            >
                                {showMore ? "Hide" : (
                                <p className='text-[#fff] text-[24px] font-bold'>
                                    {arrImage.length - 5}+
                                </p>
                                )}
                            </div>
                            </div>
                  )}
                    </div>
                  ))}
                  
                </div>
              )}
            <div className='flex justify-between gap-3 px-12 py-4'>
                        <div className='flex gap-5'>
                            <i onClick={()=>setLike(!like)} className={` ${like ? 'text-[#f00] font-bold': ''} text-[24px] cursor-pointer fa-light fa-heart`}></i>
                            <i className="text-[24px] cursor-pointer fa-light fa-comment fa-flip-horizontal"></i>
                            <i className="text-[24px] cursor-pointer fa-light fa-paper-plane"></i>
                        </div>
                        <div>
                        <i className="text-[24px] cursor-pointer fa-light fa-bookmark"></i>
                        </div>
                    </div>
            </div>
      </>
    );
  }
  
export default Post;
  