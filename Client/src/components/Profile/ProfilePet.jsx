import { Box, Tab, Tabs } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import uploadImages from "~/API/uploadAPI";
import { makeRequest } from "~/axios";
import Loading from "~/components/Loading/Loading";
import Post from "../Posts/Post/Post";
import ViewImage from "../ViewImage/ViewImage";
import MedicalBook from "../Pets/MedicalBook";

function ProfilePet(props) {
    const queryClient = useQueryClient();
    const petId = useLocation().pathname.split("/")[2];
    const { currentUser } = useSelector((state) => state.user);
    const [isHoveredAvatar, setIsHoveredAvatar] = useState(false);
    const [initialSlice, setInitialSlice] = useState(0);
    const [showImage, setShowImage] = useState(false);
    const fileInputRef = useRef(null);
    const [value, setValue] = useState('post');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const petFetch = useQuery({
        queryKey: ["pet", petId],
        queryFn: async () => {
            const res = await makeRequest.get(`/pet/getById?idPet=${petId}`);
            return res.data[0];
        },
    });
    const uploadFilesMutation = useMutation(uploadImages, {
        onSuccess: (data) => {
            setAvatarUrl(data[0]);
            queryClient.invalidateQueries("uploads");
        },
    });
    const handleFileInputChange = (e) => {
        const file = e.target.files;
        const imagesArray = Array.from(file);
        const filesToSend =
            imagesArray.length === 1 ? [imagesArray[0]] : imagesArray;
        uploadFilesMutation.mutate(filesToSend);
    };
    const postPetFetch = useQuery({
        queryKey: ["postPet", petId],
        queryFn: async () => {
            const res = await makeRequest.get(`/posts/getPostByPet?idpet=${petId}`);
            return res.data;
        },
    });
    const imagePet = useQuery({
        queryKey: ["imagesPet", petId],
        queryFn: async () => {
            const res = await makeRequest.get(`/images/getImagePet?idPet=${petId}`);
            return res.data;
        },
    });
    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={4000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {petFetch.isError ? (
                <div>Somthing is wrong?</div>
            ) : petFetch.isLoading ? (
                <Loading />
            ) : (
                <div className="p-4">
                    <div className="cover_image z-0"></div>
                    <div className="p-8 bg-[#fff] z-10 shadow">
                        <div className="flex justify-between mx-8 md:grid-cols-3 items-end">
                            <div className="flex gap-10">
                                <div className="relative flex items-center flex-col">
                                    <div
                                        onClick={()=>fileInputRef.current.click()}
                                        onMouseOver={() =>
                                            setIsHoveredAvatar(true)
                                        }
                                        onMouseLeave={() => {
                                            setIsHoveredAvatar(false);
                                        }}
                                        className=" relative w-36 h-36 mx-auto rounded-full overflow-hidden flex-col  inset-x-0 top-0 z-20 -mt-24 flex justify-center border-[6px] border-[#fff] "
                                    >
                                        <img
                                            className="w-36 h-36 z-50"
                                            src={petFetch.data.avatar}
                                            alt=""
                                        />
                                        {true&& (
                                            <div
                                                className={`upload_avatar ${
                                                    isHoveredAvatar
                                                        ? "fadeUp"
                                                        : ""
                                                } w-full cursor-pointer select-none absolute z-50 h-[60%] flex items-center  bg-[rgba(0,0,0,0.49)]`}
                                            >
                                                <input
                                                    type="file"
                                                    multiple
                                                    hidden
                                                    ref={fileInputRef}
                                                    onChange={
                                                        handleFileInputChange
                                                    }
                                                />
                                                <div className="flex w-full justify-center items-center pb-8 gap-2 text-[#fff]">
                                                    <i className="text-[18px] fa-duotone fa-camera-retro"></i>
                                                    <p className="text-[14px]">
                                                        Upload Avatar
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <h1 className="text-[20px]  font-bold text-gray-700">
                                        {petFetch.data.name}
                                    </h1>
                                </div>
                            </div>
                            <Box sx={{ width: '100%' }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="wrapped label tabs example"
                                >
                                    <Tab
                                    value="post" label="Bài viết"
                                    />
                                    <Tab value="image" label="Hình ảnh" />
                                    <Tab value="medicalbook" label="Thông tin thú cưng" />
                                </Tabs>
                                </Box>
                        </div>
                    </div>
                    {
                        value === 'post' ?
                        <div className=" flex flex-col w-[80%]  p-2">
                            {postPetFetch.error
                            ? "something went wrong!"
                            : postPetFetch.isLoading
                            ? "loading..."
                            : postPetFetch.data.map(
                                    (post, index) => {
                                        return (
                                            <Post key={ index } postItem={ post } />
                                        );
                                    },
                                )}
                        </div> : value === 'image' ?
                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                            {
                                imagePet.isLoading? 
                                <Loading/>:
                                imagePet.data.map((item, index)=>{
                                    return <div onClick={()=>{setShowImage(true);setInitialSlice(index)}} key={item.idimages}>
                                                <img src={item.url} alt="" />
                                            </div>
                                    })
                            }
                            {showImage && imagePet.isSuccess && <ViewImage setShowImage = {setShowImage} initialSlice = {initialSlice} arrImage = {imagePet.data} />}
                        </div>:
                        <div>
                            {
                                petFetch.isLoading ?
                                <Loading/>:
                                 <MedicalBook pet = {petFetch.data} isView = {true}/>
                            }
                           
                        </div>
                    }
                    
                </div>
            )}
        </>
    );
}

export default ProfilePet;
