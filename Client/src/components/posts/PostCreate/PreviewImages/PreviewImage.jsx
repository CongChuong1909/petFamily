import React, { useState } from 'react';

const MAX_PREVIEW_IMAGES = 5;

function PreviewImages(props) {
  const { images } = props;
  const [showMore, setShowMore] = useState(false);
  const previewImages = images.slice(0, MAX_PREVIEW_IMAGES);
  const hiddenImages = images.slice(MAX_PREVIEW_IMAGES);
  const lastPreviewIndex = previewImages.length - 1;
  const showButton = hiddenImages.length > 0;

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const classConfig = {
    1: 'col-span-4 h-80',
    2: 'col-span-4 h-80',
    3: {
      0: 'col-span-12 h-48',
      1: 'col-span-6 h-28',
      2: 'col-span-6 h-28',
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

  return (
    <div className={`grid gap-4 ${images.length === 1 ? 'grid-cols-4' : images.length === 2 ? 'grid-cols-8': 'grid-cols-12'}`}>
      {previewImages.map((image, index) => (
        <div
          key={index}
          className={`bg-gray-200 ${getConfig(images.length, index)} relative overflow-hidden`}
        >
          <img
            src={URL.createObjectURL(image)}
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
      {showMore &&
        hiddenImages.map((image, index) => (
          <div key={index} className="bg-gray-200 h-12 relative overflow-hidden">
            <img
              src={URL.createObjectURL(image)}
              className="absolute top-0 left-0 h-full w-full object-cover"
              alt={`Preview ${index}`}
            />
          </div>
        ))}
    </div>
  );
}

export default PreviewImages;