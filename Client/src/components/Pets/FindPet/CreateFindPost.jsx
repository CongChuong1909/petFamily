import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import uploadImages from '~/API/uploadAPI';
import Loading from '~/components/Loading/Loading';
import PreviewImages from '~/components/posts/PostCreate/PreviewImages/PreviewImage';
import AddressApi from '~/components/Vererinarian/BecomeMember/Form/AddressApi';

import 'react-quill/dist/quill.snow.css';
import { makeRequest } from '~/axios';

function CreateFindPost(props) {
    const {showFindPet, handleCloseFindPost, pet} = props;
    const fileInputRef = useRef(null);
    const userData = JSON.parse(localStorage.getItem('userPetFamily'))
    const { list } = useSelector((state) => state.relationship);
    const { currentUser } = useSelector((state) => state.user);
    const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber || null)
    const [timeLost, setTimeLost] = useState('');
    const [address, setAddress] = useState('');
    const [images, setImages] = useState([]);
    const [addressInput, setAddressInput]= useState('')
    const [listImageURL, setListImageURL] = useState([]);
    const [note, setNote] = useState('')
    const queryClient = useQueryClient();
    
    const handleClickChooseImages = () => {
        fileInputRef.current.click();
      };
      const handleFileChange = async (event) => {
        const fileList = event.target.files;
        const imagesArray = Array.from(fileList);
        setImages(imagesArray);
        const filesToSend = imagesArray.length === 1 ? [imagesArray[0]] : imagesArray;
        uploadFilesMutation.mutate(filesToSend);
      };
      const uploadFilesMutation = useMutation(uploadImages, {
        onSuccess: (data) => {
            setListImageURL(data);
        },
      });

      const getCoordinates = async(addressInput,address)=>{
        console.log(addressInput+','+ address);
            const response = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressInput+','+ address}.json?access_token=pk.eyJ1IjoiY29uZ2NodW9uZyIsImEiOiJjbGs5OThpNjEwbWxmM2ZxaWEweGF0bzdsIn0.i6C4TMolt4phtGR7w9dXJw`
            );
          return {
            longitude: response.data.features[0].center[0],
            latitude: response.data.features[0].center[1],
          };
      }

      const mutation = useMutation(
        (newPost)=>{
        return makeRequest.post("findpet/add", newPost)
        },{
        onSuccess:()=>{
            handleCloseFindPost();
            queryClient.invalidateQueries(["posts"]);
        }
      })

      

      const handleAddPostFindPet = async(e) =>{
            e.preventDefault();
            const addressCoordinates = await getCoordinates(addressInput,address)
            const textContent = `
            <p>Tôi vừa mất một bé ${pet.type === 'cat'? 'mèo' : 'chó'} quanh khu vực <strong>${addressInput + ',' + address}</strong> vào lúc <strong> ${timeLost}</strong></p>
            <p>${note}</p>
            <p>mọi người thấy bé đi lạc liên hệ với tôi qua:</p>
            <p><strong>Số điện thoại: </strong>${phoneNumber}</p>
            <p>Xin cảm ơn!</p>`
            const values = {
                idpet: pet.id_pet,
                textContent,
                methodPost: 1,
                addressCoordinates,
                images: listImageURL,
                listFriend: list.filter((user) => user.user_followed === currentUser.idUser)
            }
            mutation.mutate(values)
      }
    return (
        <div onClick={handleCloseFindPost} className={`${showFindPet ? ' opacity-1 block' : 'opacity-0 hidden'}  modal overflow-hidden fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.75)] z-[999] flex justify-center items-center`}>
            <div
                onClick={(e)=> {e.stopPropagation();}}
                className={` ${showFindPet ? ' fadeDown translate-x-[0]' : ' translate-x-[-100%]'} modal-content bg-[#fff] p-5 rounded-md shadow-2xl max-w-[700px] max-h-[92%] thin-scroll overflow-y-auto overflow-x-visible z-10 w-full relative`}
            >
                {/* <ReactQuill theme="snow" value={value} onChange={setValue} /> */}
                <form onSubmit={handleAddPostFindPet} action="">
                <div className='text-[#f00] bg-[#de00002a] rounded-md p-2 text-[13px]'><p>Hãy điền đầy đủ thông tin để chúng tôi giúp bạn tìm kiếm thú cưng của bạn nhé.</p></div>
                    <div className='grid grid-cols-2 gap-3'>
                        <div className='col-span-1 flex flex-col gap-2'>
                            <span className='text-[14px] text-[#333] font-semibold'>Số điện thoại liên lạc: </span>
                            <div className='flex items-center p-1 bg-[#f1f1f1] rounded-md'>
                                <i className="p-2 fa-light fa-phone"></i>
                                <input className='p-2 w-full' required value={phoneNumber} placeholder='Nhập số điện thoại' onChange={e=> setPhoneNumber(e.target.value)} type="text" />
                            </div>
                        </div>
                        <div className='col-span-1 flex flex-col gap-2'>
                            <span className='text-[14px] text-[#333] font-semibold'>Thời gian mất: </span>
                            <div className='flex items-center p-1 bg-[#f1f1f1] rounded-md'>
                                <i className="p-2 fa-solid fa-clock"></i>
                                <input className='p-2 w-full' required value={timeLost} placeholder='Ví dụ: "15:00 Ngày 19/07/2023"' onChange={e=> setTimeLost(e.target.value)} type="text" />
                            </div>
                        </div>
                    </div>
                <div className='flex flex-col '>
                        <span className='text-[14px] text-[#333] font-semibold'>Ghi chú: </span>
                        <div className='flex bg-[#f1f1f1] rounded-md p-2'>
                            <i className="p-2 fa-sharp fa-solid fa-pen-to-square"></i>
                            <textarea value={note} required onChange={(e)=> setNote(e.target.value)} rows={3} placeholder='Ghi chú: Ví dụ:"Lúc đi có đeo vòng cổ màu vàng có gắn chuông"' className='p-2 w-full' type="text" />
                        </div>
                </div>
                <div className='flex flex-col '>
                        <span className='text-[14px] text-[#333] font-semibold'>Địa điểm: </span>
                        <div className='flex p-1 bg-[#f1f1f1] rounded-md'>
                                <i className="p-2 fa-sharp fa-solid fa-location-dot"></i>
                                <input className='p-2 w-full' required value={addressInput} placeholder='Chọn địa điểm mất ví dụ: "180 Đường Cao Lỗ"' onChange={e=> setAddressInput(e.target.value)} type="text" />
                        </div>
                </div>
                <div>
                    <AddressApi isFind = {true} number= {1} setAddressApi = {setAddress}/>
                </div>

                    <div className="mt-3">
                        {listImageURL.length === 0 && <div onClick={handleClickChooseImages} className='cursor-pointer flex items-center flex-col gap-2 py-2 rounded-lg bg-[#f5f5f5] justify-center'>
                            <div className='bg-[#fff] rounded-full'>
                                <i className="text-[28px] p-5 fa-sharp fa-regular fa-images"></i>
                            </div>
                            <p className='text-[#333] text-[14px]'>
                                Thêm ảnh thú cưng của bạn để dễ nhận biết hơn
                            </p>
                            <input type="file" multiple className='hidden' ref = {fileInputRef} onChange={handleFileChange}/>
                        </div>
                        }
                        {uploadFilesMutation.isLoading? 
                        <Loading/>
                        :
                            images.length > 0 && (
                                <PreviewImages
                                    images={images}
                                />
                            )
                        }
                        
                    </div>
                    <button type='submit'  className='outline-none post_button flex w-full items-center justify-center bg-[#ffa000] mt-3 p-2 rounded-xl text-[#fff] text-[20px]' > <img width={30} src="https://media.istockphoto.com/id/1451599281/vi/vec-to/loa-3d-loa-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-th%E1%BB%B1c-t%E1%BA%BF-bi%E1%BB%83u-ng%E1%BB%AF-tin-t%E1%BB%A9c-kinh-doanh-th%C3%B4ng-b%C3%A1o-%C6%B0u-%C4%91%C3%A3i-gi%E1%BA%A3m-gi%C3%A1-b%E1%BA%B1ng-loa.jpg?s=170667a&w=0&k=20&c=ydFg1e2_ckxeJ-JjBSCe159F1En9tKCQPxEnAtamQ34=" alt="" />Loan tin</button>
                    </form>
            </div>
        </div>
    );
}

export default CreateFindPost;