import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAddressFromCoordinates } from "~/API/openCageGeocodingAPI";
import uploadImages from "~/API/uploadAPI";
import { makeRequest } from "~/axios";
import CurrentLocation from "~/components/CurrentLocation/CurrentLocation";
import Loading from "~/components/Loading/Loading";
import Post from "~/components/Posts/Post/Post";
import { loginSuccess } from "~/redux/userSlices";

function Profile(props) {
    const userId = useLocation().pathname.split("/")[2];
    const queryClient = useQueryClient();
    const { currentUser } = useSelector((state) => state.user);
    const [isHoveredAvatar, setIsHoveredAvatar] = useState(false);
    const [valueCurrentLocation, setValueCurrentLocation] = useState('');
    const [isViewLocation, setIsViewLocation] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState('');
    const fileInputRef = useRef(null);
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
          const res = await makeRequest.get(`/posts/getAllByUser?idUser=${userId}`);
          return res.data;
        },
      });

      const handleClickChooseImages = () => {
        fileInputRef.current.click();
      };

      const handleClickGetCurrentLocation = async () => {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          const { latitude, longitude } = position.coords;
          const address = await getAddressFromCoordinates(latitude, longitude);
          setValueCurrentLocation(address);
          setIsViewLocation(true);
        } catch (error) {
          console.error('Lỗi khi truy cập vị trí: ' + error.message);
        }
      };
      
      const mutationUpdateAddress = useMutation((updateUser)=>{
            return makeRequest.put("/user/update", updateUser)
        },{onSuccess:()=>{
                queryClient.invalidateQueries(["users"]);
            }}
        )
      const handleChangeAddress = () =>{
        const value = {
            name : userFetch.data.name,
            avatar: userFetch.data.avatar,
            address: valueCurrentLocation,
            phoneNumber: userFetch.data.phoneNumber
        }
        mutationUpdateAddress.mutate(value)
      }
      const uploadFilesMutation = useMutation(uploadImages, {
        onSuccess: (data) => {
            setAvatarUrl(data[0]);
            queryClient.invalidateQueries('uploads');
        },
      });

      const mutationUpdateAvatar = useMutation((updateUser)=>{
        return makeRequest.put("/user/update", updateUser)
    },{onSuccess:()=>{
            queryClient.invalidateQueries(["users"]);
        }}
    )
      const handleFileInputChange = (e)=>{
        const file = e.target.files;
        const imagesArray = Array.from(file);
        const filesToSend = imagesArray.length === 1 ? [imagesArray[0]] : imagesArray;
        uploadFilesMutation.mutate(filesToSend);
        
        
      }
      useEffect(()=>{
        if(uploadFilesMutation.isSuccess)
        {     
            const value = {
            name : userFetch.data.name,
            avatar: avatarUrl,
            address: userFetch.data.address,    
            phoneNumber: userFetch.data.phoneNumber
            }
            mutationUpdateAvatar.mutate(value)
            
            dispatch(loginSuccess({...currentUser,...value}))
        }
      },[uploadFilesMutation.isSuccess])

      const handleFollow = ()=>{
        
      }
      
    return (
        <>
        {
            userFetch.isError?
            <div>Somthing is wrong?</div>:
            userFetch.isLoading?
            <Loading/>:
            <div className="p-4">
            <div className="cover_image z-0">
            </div>
            <div className="p-8 bg-[#fff] z-10 shadow" >
                
                <div className="flex justify-between mx-8 md:grid-cols-3">
                    
                    <div className="relative flex items-center flex-col">
                            <div onClick={handleClickChooseImages} onMouseOver={()=>setIsHoveredAvatar(true)} onMouseLeave={()=>{setIsHoveredAvatar(false)}} className=" relative w-48 h-48 mx-auto rounded-full shadow-2xl overflow-hidden flex-col  inset-x-0 top-0 z-20 -mt-24 flex justify-center">
                            <img className="w-48 h-48 z-50" src={userFetch.data.avatar} alt="" />
                            {
                                currentUser.idUser === userFetch.data.idUser &&
                            <div className={`upload_avatar ${isHoveredAvatar ? 'fadeUp' : ''} w-full cursor-pointer select-none absolute z-50 h-[60%] flex items-center  bg-[rgba(0,0,0,0.49)]`}>
                                <input type="file" multiple hidden ref={fileInputRef} onChange={handleFileInputChange}/>
                                <div className="flex w-full justify-center items-center pb-8 gap-2 text-[#fff]">
                                    <i className="text-[22px] fa-duotone fa-camera-retro"></i>
                                    <p className="text-[18px]">Upload Avatar</p>
                                </div>
                            </div>
                            }
                            </div>
                        
                        <h1 className="text-4xl mt-5 font-medium text-gray-700">
                        {userFetch.data.name}
                        </h1>
                    </div>

                    <div  className="space-x-8 flex h-14 justify-between mt-32 md:mt-0 md:justify-center">
                        {
                            currentUser.idUser !== userFetch.data.idUser &&
                            <button onClick={handleFollow} className="text-white bg-[#0093f6] text-[#fff] py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                                Follow
                            </button>
                        }
                        
                        <button className="text-white py-2 px-4 bg-[#42cfc3] text-[#fff] uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                            Message
                        </button>
                    </div>
                </div>

                <div className="mt-10 flex flex-col justify-center border-b pb-12">
                    
                    {userFetch.data.address ?
                        <p className="font-light text-gray-600 mt-3">
                           <span className="font-semibold">Address:</span> {userFetch.data.address}
                        </p>
                        :
                        currentUser.idUser === userFetch.data.idUser ? !isViewLocation && <p onClick={handleClickGetCurrentLocation} className=" text-center select-none cursor-pointer p-2 border mt-5 text-[#1877f2] border-[#ccc] rounded-xl">Click me to update Address</p>
                        : <p>The address is not updated</p>
                    }

                    {
                        isViewLocation &&
                        <div>
                            <div className="flex items-center gap-2 w-full"><p className="text-[18px] text-[#333] font-semibold">Your Address: </p> <input type="text" value={valueCurrentLocation} onChange= {(e)=>setValueCurrentLocation(e.target.value)} className="outline-none border-b border-[#ccc] w-[500px] text-[18px] p-2"/>? </div>
                            <button onClick={handleChangeAddress} className="bg-[#ccc] rounded-lg px-4 py-2">Yes</button>
                        </div>
                    }
                    <div className="flex">
                        <p className="text-[18px] text-[#333] font-semibold">Email: </p>{"  "} <p className="font-light text-gray-600 text-[18px]">{userFetch.data.email}</p>
                    </div>
                    <div className={`${currentUser.idUser === userFetch.data.idUser ? '': 'flex justify-center'} `}>
                        <div className="mt-10 flex flex-col w-[70%] border border-[#ccc] rounded-lg p-2">
                            <div className=" w-full border border-[#ccc] bg-[#ccc] p-4 px-8 flex justify-between rounded-2xl mb-4 cursor-default select-none">
                                <p className="font-bold text-[#333] text-[18px]">List Post</p>
                                <div className="flex gap-2 items-center cursor-pointer">
                                    <i className="text-[20px] fa-sharp fa-solid fa-filter-list"></i>
                                    <p className="text-[18px]">Filter</p>
                                </div>
                            </div>
                            {
                                postFetch.error
                                    ? "something went wrong!"
                                    : postFetch.isLoading
                                    ? "loading..."
                                    : postFetch.data.map(
                                        (post, index) => {
                                            return (
                                                <Post  key= {post.idposts} postItem = {post} />
                                            
                                            );
                                        },
                                    )
                            }
                        </div>

                    </div>
                        <p className="mt-8 text-gray-500">
                            Date of joining petfamily {moment(userFetch.data.date_create).format('DD/MM/YYYY')}
                        </p>
                    
                </div>

                <div className="mt-12 flex flex-col justify-center">
                    <p className="text-gray-600 text-center font-light lg:px-16">
                        An artist of considerable range, Ryan — the name taken
                        by Melbourne-raised, Brooklyn-based Nick Murphy —
                        writes, performs and records all of his own music,
                        giving it a warm, intimate feel with a solid groove
                        structure. An artist of considerable range.
                    </p>
                    <button className="text-indigo-500 py-2 px-4  font-medium mt-4">
                        Show more
                    </button>
                </div>
            </div>
        </div>

        }
        </>
        
        
    );
}

export default Profile;


