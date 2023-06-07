import React, { useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import uploadImages from '~/API/uploadAPI';
import Loading from '~/components/Loading/Loading';

export default function Certificate(props) {
  const { setOffice, office, setCheckConfirm, checkConfirm, setImage, image } = props;
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();
  const [imagePreview, setImagePreview] = useState(null);

  const uploadFilesMutation = useMutation(uploadImages, {
    onSuccess: (data) => {
      setImage(data[0]);
      queryClient.invalidateQueries('uploads');
    },
  });

  const handleFileChange = async (event) => {
    const fileList = event.target.files;
    const imagesArray = Array.from(fileList);
    if (imagesArray.length === 1) {
      const filesToSend = imagesArray.length === 1 ? [imagesArray[0]] : imagesArray;
      uploadFilesMutation.mutate(filesToSend);
    } else {
      alert("Vui lòng chọn 1 ảnh");
    }
  };

  const handlePreview = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Chứng chỉ thú y
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <TextField
            required
            id="office"
            label="Cơ quan đang làm việc"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            value={office}
            onChange={(e) => setOffice(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          {uploadFilesMutation.isLoading ? (
            <Loading />
          ) : (
            <>
              {image ? (
                <div className='w-full h-56 bg-cover object-contain' style={{backgroundImage:`url(${imagePreview || image})`, backgroundPosition:"center"}}>
                    {/* <img src={imagePreview || image} alt="Preview" style={{ width: '100%', height: 'auto' }} /> */}
                </div>
              ) : (
                <>
                  <p className="mt-5 text-[#666] text-[14px]">* Vui lòng thêm hình ảnh về chứng chỉ thú y của bạn/ phòng khám</p>
                  <div className="mt-1 px-5 flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          aria-hidden="true"
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG, or JPEG (MAX. 2048 Byte)</p>
                      </div>
                      <input onChange={(e) => { handleFileChange(e); handlePreview(e); }} ref={fileInputRef} id="dropzone-file" type="file" multiple className="hidden" />
                    </label>
                  </div>
                </>
              )}
            </>
          )}
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox onChange={(e) => setCheckConfirm(e.target.value)} color="secondary" name="saveCard" value={checkConfirm ? false : true} />}
            label="Tôi đảm bảo rằng mọi thông tin đều chính xác"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
