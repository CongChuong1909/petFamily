import { makeRequest } from "~/axios";

const uploadImages = async (imageFiles) => {
  try {
    const formData = new FormData();
    if(Array.isArray(imageFiles))
    {
        imageFiles.forEach((file) => {
            formData.append('image', file);
        });
    } else {
        formData.append("image", images);
      }
    

    const response = await makeRequest.post(
      'uploadImage',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const { urls } = response.data;
    console.log('Uploaded image URLs:', urls);
    return urls;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};

export default uploadImages;