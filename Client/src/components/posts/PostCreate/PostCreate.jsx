import React, { useRef, useState } from 'react';
import PostTag from './PostTag/PostTag';
import PostMethodShare from './PostMethodShare/PostMethodShare';
import  Picker  from '@emoji-mart/react';
import PreviewImages from './PreviewImages/PreviewImage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest} from '~/axios';
import axios from 'axios';
import uploadImages from '~/API/uploadAPI';
import Loading from '~/components/Loading/Loading';
import { useSelector } from 'react-redux';
const dataBg = [  {    
    imgBg: "https://pety.vn/static/media/p1.562333b0.jpg",    title: "Phá"  },
    {imgBg: "https://pety.vn/static/media/p2.e2fedf9e.jpg",    title: "Đói"  }, 
    {imgBg: "https://pety.vn/static/media/p3.8ddba762.jpg",    title: "hihi"  }, 
    {imgBg: "https://pety.vn/static/media/p4.d230127a.jpg",    title: "Sen đâu"  },
];

function PostCreate(props) {
  const [background, setBackground] = useState({url:'', index: null});
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [images, setImages] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [listImageURL, setListImageURL] = useState([]);
  const [listPet, setListPet] = useState([]);
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);

  const handleClickChooseImages = () => {
    fileInputRef.current.click();
  };
  const handleAddBackground = (i,image) => {
    setBackground({index: i, url: image});
    setImages([]);
  };
  const handleFileChange = async (event) => {
    const fileList = event.target.files;
    const imagesArray = Array.from(fileList);
    setImages(imagesArray);
    const filesToSend = imagesArray.length === 1 ? [imagesArray[0]] : imagesArray;
    uploadFilesMutation.mutate(filesToSend);
  };
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setText(text + emoji);
  };
  const handleShowMore = () => {
    setShowMore(!showMore);
  };
  
  const uploadFilesMutation = useMutation(uploadImages, {
    onSuccess: (data) => {
        setListImageURL(data);
        queryClient.invalidateQueries('uploads');
    },
  });
  const mutation = useMutation(
    (newPost)=>{
    return makeRequest.post("posts/addPost", newPost)
    },{
    onSuccess:()=>{
        props.handleClosePostCreate;
        queryClient.invalidateQueries(["posts"]);
    }
  })


  const handleAddPost  = () =>{
    const values = {
        textContent: text,
        postStatus: 1,
        postCategory: 1,
        methodPost: 1,
        images: listImageURL,
        videos: [],
        postBg:background.index !== null ? background.index + 1 : null,
        idpets: listPet
    }
    mutation.mutate(values);
    props.handleClosePostCreate();
    setText("");
    setImages([]);
    setBackground({url:'', index: null});
  }
  const getListPet = (item)=>{
    setListPet(item);
  }
  

  return (
    <div onClick={props.handleClosePostCreate}  className={`${props.show ? ' opacity-1 block' : 'opacity-0 hidden'}  modal overflow-hidden fixed top-0 left-0 w-full h-full bg-rgba_background-button_header z-[999] flex justify-center items-center`}>
      <div
        onClick={(e)=> {setShowEmoji(false); e.stopPropagation();}}
        className={` ${props.show ? ' fadeDown translate-x-[0]' : ' translate-x-[-100%]'} modal-content bg-[#fff] p-5 rounded-md shadow-2xl max-w-[540px] max-h-[92%] thin-scroll overflow-y-auto overflow-x-visible z-10 w-full relative`}
      >
        <div className="flex justify-between items-center border-b border-[#ccc]">
          <h1 className="text-[22px] font-bold">Tạo bài đăng mới</h1>
          <i  onClick={props.handleClosePostCreate} className=" method-share_close fa-solid fa-xmark p-3 rounded-lg cursor-pointer"></i>
        </div>
        <div className="grid grid-cols-9 mt-5">
          <div className="row-span-2 col-span-1">
            <img className="w-[50px] h-[50px] rounded-full" src={currentUser.avatar} alt="" />
          </div>
          <h1 className="col-span-8 text-[18px] font-semibold">{currentUser.name}</h1>
          <PostMethodShare />
        </div>
        <div className="mt-5">
        {images.length <= 0 ? (
            <div
                className="bg-cover bg-right-bottom"
                style={ background.url === '' || background.url === undefined ? { height: '100px' } : {  backgroundImage: `url(${background.url})`, display: 'flex', alignItems: 'center',  justifyContent: 'center', height: '280px', }}>
                     <textarea
                     value={text}
                     onChange={(e) => setText(e.target.value)}
                         className={`w-full h-[100px] bg-[rgba(0,0,0,0)] p-[10px] thin-scroll outline-none rounded-md mb-3 text-[24px] ${background.url === '' || background.url === undefined ? '' : 'text-center drop-shadow-md font-bold text-[#fff] drop-shadow-sha shadow-black'}`}
                         placeholder="Hãy cho tôi biết suy nghĩ của bạn?"
                     />
            </div>
        ):
            (
                <div className=" h-96">
                    <textarea value={text} onChange={(e)=>setText(e.target.value)} className='outline-none thin-scroll p-2 w-full' placeholder="Hãy cho tôi biết suy nghĩ của bạn?" type="text"/>
                    {uploadFilesMutation.isLoading? 
                    <Loading/>
                    :
                        images.length > 0 && (
                            <PreviewImages
                                images={images}
                                showMore={showMore}
                                handleShowMore={handleShowMore}
                            />
                        )
                    }
                     
                </div>
            )
        }
          
             <div className='flex justify-end gap-4 mt-3 items-center pr-8'>
                    <i className="item_postcreate relative text-[#999] font-bold cursor-pointer text-[22px] fa-light fa-grid">
                        <span className="opacity-0 block  bg-[#333] text-blue-900 text-[9px] leading-4 rounded-md py-1 px-2 absolute top-0 mt-8 transition-all duration-300 transform translate-x-1/2 left-[-20%] z-[-1] before:block before:absolute before:bg-[#333] before:w-2 before:h-2 before:rotate-45 before:top-[4px] before:left-1/4 before:-mt-2 pointer-events-none before:content:''"><p>Lựa chọn ảnh nền</p></span>
                    </i>
                    <input className='hidden' type="file" ref={fileInputRef} multiple onChange={handleFileChange} />
                    <i onClick={handleClickChooseImages} className="item_postcreate relative text-[#999] font-bold cursor-pointer text-[22px] fa-light fa-images">
                        <span className="opacity-0 block  bg-[#333] text-blue-900 text-[9px] leading-4 rounded-md py-1 px-2 absolute top-0 mt-8 transition-all duration-300 transform translate-x-1/2 left-[-20%] z-[-1] before:block before:absolute before:bg-[#333] before:w-2 before:h-2 before:rotate-45 before:top-[4px] before:left-1/4 before:-mt-2 pointer-events-none before:content:''">Thêm hình ảnh</span>
                    </i>
                    <i onClick={(e)=> {e.stopPropagation(); setShowEmoji(!showEmoji)}} className="item_postcreate relative text-[#999] font-bold cursor-pointer text-[22px] fa-regular fa-face-smile">
                        <span className="opacity-0 block  bg-[#333] text-blue-900 text-[9px] leading-4 rounded-md py-1 px-2 absolute top-0 mt-8 transition-all duration-300 transform translate-x-1/2 left-[-20%] z-[-1] before:block before:absolute before:bg-[#333] before:w-2 before:h-2 before:rotate-45 before:top-[4px] before:left-1/4 before:-mt-2 pointer-events-none before:content:''">Thêm emoji</span>
                    </i>
            </div>
            <div className='flex gap-4 mt-4'>
            <div onClick={()=>{setBackground('')}} className='w-[84px] rounded-md flex justify-center items-center text-[#fff] shadow-lg h-[60px] bg-center bg-cover ' ></div>
                {dataBg.map((item, index)=>(
                    <div key = {index} onClick={() =>handleAddBackground(index,item.imgBg)} className='w-[84px] cursor-pointer rounded-md flex justify-center items-center text-[#fff] shadow-lg h-[60px] bg-center bg-cover ' style={{backgroundImage: `url(${item.imgBg})`}}>{item.title}</div>
                ))}
            </div>
            <PostTag onGetListPet = {getListPet}/>
          </div>    
          <button onClick={handleAddPost}  className='outline-none post_button flex w-full items-center justify-center bg-[#ffa000] mt-3 p-2 rounded-xl text-[#fff] text-[20px]' >Đăng bài</button>
        </div>
        {showEmoji && (
              <div onClick={(e)=>{e.stopPropagation();}} previewposition = "none" className="absolute top-[20%] bottom-[-80%] z-50 right-[8%]">
                <Picker  onEmojiSelect={addEmoji} />
              </div>
            )}
      </div>
    );
}

export default PostCreate;