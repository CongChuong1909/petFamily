import { Box, Tab, Tabs } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import uploadImages from "~/API/uploadAPI";
import { makeRequest } from "~/axios";
import Loading from "~/components/Loading/Loading";
import Post from "~/components/posts/Post/Post";
import VeterinarianService from "~/components/Vererinarian/Verterinarian/VeterinarianService/VeterinarianService";
import { loginSuccess } from "~/redux/userSlices";
import Rating from "./Rating/Rating";

function ProfileVeterinarian(props) {
    const userId = useLocation().pathname.split("/")[2];
    const queryClient = useQueryClient();
    const { currentUser } = useSelector((state) => state.user);
    const [isHoveredAvatar, setIsHoveredAvatar] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState("");
    const [arrFriendFollower, setArrFriendFollower] = useState([]);
    const [arrFriendFollowed, setArrFriendFollowed] = useState([]);
    const fileInputRef = useRef(null);
    const { list } = useSelector((state) => state.relationship);
    const [value, setValue] = useState('one');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const dispatch = useDispatch();
    const userFetch = useQuery({
        queryKey: ["users", userId],
        queryFn: async () => {
            const res = await makeRequest.get(`/user/find?idUser=${userId}`);
            return res.data;
        },
    });
    const postFetch = useQuery({
        queryKey: ["postUser", userId],
        queryFn: async () => {
            const res = await makeRequest.get(
                `/posts/getAllByUser?idUser=${userId}`,
            );
            return res.data;
        },
    });
    const totalLikeFetch = useQuery({
        queryKey: ["totalLike", userId],
        queryFn: async () => {
            const res = await makeRequest.get(
                `/likes/amountById?idUser=${userId}`,
            );
            return res.data;
        },
    });
    useEffect(() => {
        if(list.length > 0)
        {
            const filteredFollowed = list.filter(item => item.user_followed === userId);
            const userFollowers = filteredFollowed.map(item => item.user_follower);
            const filteredFollower = list.filter(item => item.user_follower === userId);
            const userFolloweds = filteredFollower.map(item => item.user_followed);
            setArrFriendFollowed(userFolloweds);
            setArrFriendFollower(userFollowers);
        }
    }, [list, currentUser]);

    const uploadFilesMutation = useMutation(uploadImages, {
        onSuccess: (data) => {
            setAvatarUrl(data[0]);
            queryClient.invalidateQueries("uploads");
        },
    });
    const mutationUpdateAvatar = useMutation(
        (updateUser) => {
            return makeRequest.put("/user/update", updateUser);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["users"]);
            },
        },
    );
    const handleFileInputChange = (e) => {
        const file = e.target.files;
        const imagesArray = Array.from(file);
        const filesToSend =
            imagesArray.length === 1 ? [imagesArray[0]] : imagesArray;
        uploadFilesMutation.mutate(filesToSend);
    };
    useEffect(() => {
        if (uploadFilesMutation.isSuccess) {
            const value = {
                name: userFetch.data.name,
                avatar: avatarUrl,
                address: userFetch.data.address,
                phoneNumber: userFetch.data.phoneNumber,
            };
            mutationUpdateAvatar.mutate(value);

            dispatch(loginSuccess({ ...currentUser, ...value }));
        }
    }, [uploadFilesMutation.isSuccess]);

    console.log(userId);
    const veterinarianFetch = useQuery({
        queryKey: ["veterinarian", userId],
        queryFn: async () => {
            const res = await makeRequest.get(
                `/veterinarian/getById?idUser=${userId}`,
            );
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
            {userFetch.isError ? (
                <div>Somthing is wrong?</div>
            ) : userFetch.isLoading && veterinarianFetch.isLoading ? (
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
                                            src={userFetch.data.avatar}
                                            alt=""
                                        />
                                        
                                        {currentUser.idUser ===
                                            userFetch.data.idUser && (
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
                                    {
                                            userFetch.data.role === 2 ?
                                                <div className="absolute w-7 h-7 z-[51] bottom-[50%] right-0 rounded-full overflow-hidden shadow-lg">
                                                    <img className="w-7 h-7" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIuwlAeJZY700iwh-HrhsDTj2qLZohE9bZ5eQigcKDv3_HDiOvm_n_4CECCQBAiZoa46c&usqp=CAU" alt="" />
                                                </div>
                                            :
                                            <></>
                                        }

                                    <h1 className="text-[20px]  font-bold text-gray-700">
                                        {userFetch.data.name}
                                    </h1>
                                </div>
                            </div>
                            <div className="space-x-8 items-end flex h-14 justify-between w-[70%] pb-3 border-b border-[#ccc] mt-32 md:mt-0">
                            <Box sx={{ width: '100%' }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="wrapped label tabs example"
                                >
                                        <Tab
                                        value="one"
                                        label="Thông tin"
                                        />
                                        <Tab value="two" label=" Bài đăng" />
                                        <Tab value="three" label=" Liên hệ" />
                                </Tabs>
                            </Box>
                                <div className="flex items-center justify-center gap-4">
                                    <button className="text-white px-4 bg-[#42cfc3] h-10 text-[#fff] text-[14px] rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                                        Nhắn tin
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-8">
                            <div className="grid col-span-2">
                                <div>
                                    <div className="pt-4">
                                        <p className=" text-[13px] text-[#555]">
                                            many a mickle makes a muckle
                                        </p>
                                    </div>
                                    <div className="p-3 border border-[#eaeaea] rounded-md bg-[#f7f7f7] mt-4">
                                        <div className="border-b flex items-center justify-around pb-2 border-[#f1f1f1] ">
                                            <div className="flex flex-col items-center justify-center">
                                                <h3 className="text-[14px] text-[#333] font-bold">
                                                    {arrFriendFollower.length}
                                                </h3>
                                                <span className="text-[13px] text-[#555]">
                                                    Followers
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-center justify-center">
                                                <h3 className="text-[14px] text-[#333] font-bold">
                                                    {arrFriendFollowed.length}
                                                </h3>
                                                <span className="text-[13px] text-[#555]">
                                                    Followed
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-around pt-2">
                                            <div className="flex flex-col items-center justify-center">
                                                <h3 className="text-[14px] text-[#333] font-bold">
                                                    {postFetch.isSuccess && postFetch.data.length}
                                                </h3>
                                                <span className="text-[13px] text-[#555]">
                                                    Posts
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-center justify-center">
                                                <h3 className="text-[14px] text-[#333] font-bold">
                                                    {totalLikeFetch.isSuccess && totalLikeFetch?.data[0]?.total_likes}
                                                </h3>
                                                <span className="text-[13px] text-[#555]">
                                                    Like
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <p className=""> </p>{" "}
                                        <p className="font-light text-gray-600 text-[14px]">
                                            <span className="text-[16px] text-[#333] font-semibold">
                                                Email:
                                            </span>{" "}
                                            {userFetch.data.email}
                                        </p>
                                    </div>
                                    <p className="mt-8 text-gray-500">
                                        Date of joining petfamily{" "}
                                        {moment(
                                            userFetch.data.date_create,
                                        ).format("DD/MM/YYYY")}
                                    </p>
                                </div>
                            </div>
                            
                                
                                <div className="grid col-span-6 p-2">
                              {  value === 'one'?
                                    veterinarianFetch.isSuccess &&
                                    <>
                                        <div className='pb-8'>
                                               <VeterinarianService currentProfile = {userId}  idProfile = {veterinarianFetch?.data[0].id_veterinarian}/>
                                        </div>
                                        <div>
                                            <h1 className='title relative text-[20px] font-bold text-[#777] border_bottom mb-2 p-2'>Đánh giá</h1>
                                                <Rating idProfileVeterinarian = {veterinarianFetch?.data[0].id_veterinarian}/>
                                        </div>
                                    </>
                                    : value === 'two' ?
                                    <div>
                                        <div className=" flex flex-col justify-center border-b pb-12">
                                            <div
                                                className={`${
                                                    currentUser.idUser ===
                                                    userFetch.data.idUser
                                                        ? ""
                                                        : "flex justify-center"
                                                } `}
                                            >
                                                <div className=" flex flex-col w-full  p-2">
                                                    {postFetch.error
                                                        ? "something went wrong!"
                                                        : postFetch.isLoading
                                                        ? "loading..."
                                                        : postFetch.data.map(
                                                              (post, index) => {
                                                                  return (
                                                                      <Post
                                                                          key={
                                                                              post.idposts
                                                                          }
                                                                          postItem={
                                                                              post
                                                                          }
                                                                      />
                                                                  );
                                                              },
                                                          )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-12 flex flex-col justify-center">
                                            <p className="text-gray-600 text-center font-light lg:px-16">
                                                An artist of considerable range,
                                                Ryan — the name taken by
                                                Melbourne-raised, Brooklyn-based
                                                Nick Murphy — writes, performs
                                                and records all of his own
                                                music, giving it a warm,
                                                intimate feel with a solid
                                                groove structure. An artist of
                                                considerable range.
                                            </p>
                                            <button className="text-indigo-500 py-2 px-4  font-medium mt-4">
                                                Show more
                                            </button>
                                        </div>
                                    </div>:
                                    <div className='pb-8'>
                                        <h1 className='title relative text-[20px] font-bold text-[#777] border_bottom mb-2 p-2'>Thông tin liên hệ</h1>
                                        <p className="text-[#444] pb-2"><span className="text-[#222] font-semibold">ĐỊA CHỈ {veterinarianFetch.data[0].address2 ? '1': ''}:</span> {veterinarianFetch.data[0].address}</p>
                                        {veterinarianFetch.data[0].address2 &&<p className="text-[#444] pb-2"><span className="text-[#222] font-semibold">ĐỊA CHỈ 2:</span> {veterinarianFetch.data[0].address2}</p>}
                                        <p className="text-[#444] pb-2"><span className="text-[#222] font-semibold">SỐ ĐIỆN THOẠI {veterinarianFetch.data[0].phone2 ? '1': ''}:</span> {veterinarianFetch.data[0].phone}</p>
                                        {veterinarianFetch.data[0].phone2 &&<p className="text-[#444] pb-2"><span className="text-[#222] font-semibold">SỐ ĐIỆN THOẠI 2:</span> {veterinarianFetch.data[0].phone2}</p>}
                                    </div>

                                }
                                    
                                    
                            </div>
                                <div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProfileVeterinarian;
