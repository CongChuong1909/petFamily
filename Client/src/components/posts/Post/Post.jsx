import React, { useState } from 'react';

const posts = [
    {
        id: 1,
        name: "Leona",
        avatar: "https://i.pinimg.com/564x/fb/db/3d/fbdb3df363c7edc8322cc065a3b85241.jpg",
        text: 'Nó đang dỗi em đó quý dị 😒😒😒',
        images: [
            "https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg",
            "https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg",
        ],
        time: "2 day ago",
    
    },
    {
        id: 2,
        name: "Leona",
        avatar: "https://i.pinimg.com/564x/fb/db/3d/fbdb3df363c7edc8322cc065a3b85241.jpg",
        text: 'Nó đang dỗi em đó quý dị 😒😒😒',
        images: [
            "https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg",
            "https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg",
            "https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg",
        ],
        time: "2 day ago",
    
    },
    {
        id: 3,
        name: "Leona",
        avatar: "https://i.pinimg.com/564x/fb/db/3d/fbdb3df363c7edc8322cc065a3b85241.jpg",
        text: 'Nó đang dỗi em đó quý dị 😒😒😒',
        images: [
            "https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg",
            "https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg",
            "https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg",
            "https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg",
            "https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg",
            "https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg"
        ],
        time: "2 day ago",
    
    },
    {
        id: 4,
        name: "Leona",
        avatar: "https://i.pinimg.com/564x/fb/db/3d/fbdb3df363c7edc8322cc065a3b85241.jpg",
        text: 'Nó đang dỗi em đó quý dị 😒😒😒',
        images: [
            "https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg",
        ],
        time: "2 day ago",
    
    },


]


const classConfig = {
    1: 'col-span-4 h-[560px]',
    2: 'col-span-4 h-80',
    3: {
      0: 'col-span-12 h-[460px]',
      1: 'col-span-6 h-48',
      2: 'col-span-6 h-48',
      'default': 'col-span-4 h-32',
    },
    4: {
      0: 'col-span-6 h-36',
      1: 'col-span-6 h-36',
      2: 'col-span-6 h-36',
      3: 'col-span-6 h-36',
      'default': 'col-span-4 h-32',
    },
    'default': {
        0: 'col-span-6 h-36',
        1: 'col-span-6 h-36',
        2: 'col-span-4 h-36',
        3: 'col-span-4 h-36',
        3: 'col-span-4 h-36',
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
    const handleShowMore = () => {
        setShowMore(!showMore);
      };
    return (
        <>
            {posts.map((post, index)=>
                {
                    const MAX_PREVIEW_IMAGES = 5;
                    const previewImages = post.images.slice(0, MAX_PREVIEW_IMAGES);
                    const hiddenImages = post.images.slice(MAX_PREVIEW_IMAGES);
                    const lastPreviewIndex = previewImages.length - 1;
                    const showButton = hiddenImages.length > 0;
                    return (
                        <div key={index} className='item px-3'>
                            <div className='flex justify-between items-center border_bottom pb-2'>
                                <div className='flex items-center gap-4 '>
                                    <div className='flex items-center gap-2'>
                                        <div><img className='w-[40px] h-[40px] rounded-full' src={post.avatar} alt="" /></div>
                                        <p className='font-semibold text-[18px]'>{post.name}</p>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <i className=" text-[4px] fa-duotone fa-circle"></i>
                                        <p className='text-[#999]'>{post.time}</p>
                                    </div>
                                </div>
                                <div>
                                <i className="fa-solid fa-ellipsis"></i>
                                </div>
                            </div>
                            <div className='pt-4 px-12 pb-3'>
                                <p>{post.text}</p>
                            </div>
                            <div className={`grid gap-4 ${previewImages.length === 1 ? 'grid-cols-4' : previewImages.length === 2 ? 'grid-cols-8': 'grid-cols-12'} w-full flex justify-center items-center px-16` }>
                                {previewImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`bg-gray-200 ${getConfig(previewImages.length, index)} relative  overflow-hidden`}
                                        >
                                    <img
                                        src={image}
                                        className="absolute top-0 left-0 h-full w-full object-cover"
                                        alt={`Preview ${index}`}
                                    />
                                    {showButton && lastPreviewIndex === index && (
                                        <div className="absolute inset-0 w-full h-full  bg-[rgba(0,0,0,0.31)] flex justify-center items-center">
                                        <div onClick={handleShowMore} className="text-white bg-gray-500 px-2 cursor-pointer py-1 rounded-md ">
                                            {showMore ? 'Hide' : (<p className='text-[#fff] text-[24px] font-bold '>{hiddenImages.length}+</p>)}
                                        </div>
                                        </div>
                                    )}
                                     
                                    </div>
                                ))}
                            </div>
    
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
                )
                }
                )}
        </>
    );
}

export default Post;