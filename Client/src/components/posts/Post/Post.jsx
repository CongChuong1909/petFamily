
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment/moment';
import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { makeRequest } from '~/axios';
import {classConfigOnPost} from '~/Data/Data'
import Comments from '~/components/Comments/Comments';
import { dataBg } from '~/Data/Data';
import { useSelector } from 'react-redux';
import Loading from '~/components/Loading/Loading';
import { Link } from 'react-router-dom';
const brightColors = [
    "#7fbdff", 
    "#8fe4cb",
    "#28c76f",
    "#f148e4",
    "#b7a0e0",
    "#93d3a2",
    "#febe89",
    "#b287f8",
  ];
  const getConfig = (length, index) => {
    const config = classConfigOnPost[length] || classConfigOnPost['default'];
    return typeof config === 'object' ? config[index] || config['default'] : config;
  };

  function Post(props) {
    const { currentUser } = useSelector((state) => state.user);
    const [showMore, setShowMore] = useState(false);
    const [like, setLike] = useState(false);
    const [selfLike, setSelfLike] = useState(false);
    const [amountLike, setAmountLike]=useState(0);
    const [arrImage, setArrImage] = useState([]);
    const [showComment, setShowComment] = useState(false);
    const [showOption, setShowOption] = useState(false);
    const queryClient = useQueryClient();
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

    const LikesFetch = useQuery({
        queryKey: ["likes", postItem.idposts],
        queryFn: async () => {
          const res = await makeRequest.get(`/likes?postId=${postItem.idposts}`);
          return res.data;
        },
      });
      useEffect(() => {
        if (LikesFetch.isFetched) {
            setAmountLike(LikesFetch.data.length)
            if(LikesFetch.data.length > 0)
            {
                var arr = [];
                LikesFetch.data.map((item)=>{
                    arr.push(item.iduser)
                })
                setSelfLike(arr.includes(currentUser.idUser))
            }
        }
      }, [postItem.idposts, LikesFetch.isFetched, LikesFetch.data]);

    const mutation = useMutation((liked)=>{
        if(liked)//// if true
        {
            return makeRequest.delete("/likes/deleteLike?idPost="+ postItem.idposts)
        }  
        return makeRequest.post("/likes/addLike", {idPost : postItem.idposts})
    },
    {
        onSuccess:()=>{
            queryClient.invalidateQueries(["likes"]);
        }
    }
    )

    const handleLike = ()=>{
        ///check mutate true or false
                var arr = [];
                LikesFetch.data.map((item)=>{
                    arr.push(item.iduser)
                })
                mutation.mutate(arr.includes(currentUser.idUser))
        if(arr.includes(currentUser.idUser))
       setSelfLike(false);
    }

    const commentFetch = useQuery({
        queryKey: ["comments", postItem.idposts],
        queryFn: async () => {
          const res = await makeRequest.get(`/comment?postId=${postItem.idposts}`);
          return res.data;
        },
      });
      const amountCommentFetch = useQuery({
        queryKey: ["amountcomment", postItem.idposts],
        queryFn: async () => {
          const res = await makeRequest.get(`/comment/getAmount?idPost=${postItem.idposts}`);
          return res.data[0].total_comments;
        },
      });   

        const mutationHidden = useMutation((idpost)=>{
            console.log(idpost);
            return makeRequest.put("/posts/hidden", idpost)
        },
        {
            onSuccess:()=>{
                queryClient.invalidateQueries(["posts"]);
            }
        })

    const handleHiddenPost = () =>{
        const value = {
            idPost: postItem.idposts
        }
        mutationHidden.mutate(value)
    } 

    const petFetch = useQuery({
        queryKey: ["getpets", postItem.idposts],
        queryFn: async () => {
          const res = await makeRequest.get(`/pet/post?idPost=${postItem.idposts}`);
          return res.data
        },
      });  
      

    return (
      <>
        <div
          key={postItem.idposts}
          className="item px-3"
          onClick={()=>setShowOption(false)}
        >
          <div className='relative flex justify-between items-center border_bottom pb-2'>
                <div className='flex items-center gap-4 '>
                    <Link 
                    to={`/profile/${postItem.userid}`}
                    >
                        <div className='flex items-center gap-2'>
                            <div><img className='w-[40px] h-[40px] rounded-full' src={postItem.avatar} alt="" /></div>
                            <p className='font-semibold text-[18px]'>{postItem.name}</p>
                            {postItem.userid === 'kaiuIQFPw4' && <div><img className='w-[20px] h-[20px]' src="https://cdn-icons-png.flaticon.com/512/807/807262.png" alt="" /></div>}
                        </div>
                    </Link>
                    <div className='flex items-center gap-1'>
                        <i className=" text-[4px] fa-duotone fa-circle"></i>
                        <p className='text-[#999]'>{moment(postItem.date_create).fromNow()}</p>
                    </div>
                </div>
                    <div>
                        <i onClick={(e)=>{ e.stopPropagation(); setShowOption(!showOption); }} className="cursor-pointer fa-solid fa-ellipsis"></i>
                    </div>
                {
                    showOption &&
                    <div className="absolute z-30 top-[40%] right-0 mt-2 w-36 bg-[#fff] rounded-md shadow-lg">
                        {currentUser.idUser === postItem.userid ?
                        <>
                            <button className="block select-none w-full text-left px-4 py-2 hover:bg-gray-100" >
                                Update
                            </button>
                            <button onClick={handleHiddenPost} className="block select-none w-full text-left px-4 py-2 hover:bg-gray-100" >
                                Delete
                            </button>
                        </> 
                        :   
                        <button className="block select-none w-full text-left px-4 py-2 hover:bg-gray-100" >
                                Report content
                        </button>

                    }
                    </div>
                }
            </div>
                 {
                     postItem.post_bg ? 
                     <div className='pt-4 px-12 pb-3 bg-cover bg-right-bottom text-[#fff]  font-bold' style={{ backgroundImage: `url(${dataBg[postItem.post_bg]})`, display: 'flex', alignItems: 'center',  justifyContent: 'center', height: '480px', }} >
                         <p className='text-[32px]'>{postItem.textcontent}</p>
                     </div>
                 :
                     <div className='pt-4 px-12 pb-3'>
                         <p>{postItem.textcontent}</p>
                         {
                            petFetch.isSuccess&& petFetch.data.length > 0 ?
                                <div className='flex items-center pt'>
                                <span>With</span>
                                <div className='flex'>
                                    {
                                        petFetch.isSuccess &&
                                        petFetch.data.map((item, index) => (
                                            <div
                                            key={index}
                                            className="flex items-center cursor-pointer rounded-xl px-2 py-1 mx-3 opacity-[1]"
                                            style={{ backgroundColor: brightColors[index] }}
                                            >
                                            <img className="w-[20px] h-[20px] rounded-full" src={item.avatar} alt="" />
                                            <span className="px-1 text-[#fff]">{item.name}</span>
                                            </div>
                                        ))
                                    }
                                    </div>
                                </div>
                            :
                            <></>
                         
                         }
                     </div>
                 }
  
          {imagesQuery.error
            ? "something went wrong!"
            : imagesQuery.isLoading
            ? <Loading/>
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
                            <div className="absolute inset-0 w-full h-full  bg-[rgba(0,0,0,0.15)] flex justify-center items-center">
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
            <div className='flex justify-between gap-3 px-12 pt-4'>
                        <div className='flex gap-5'>
                            <div className='flex flex-col justify-center items-center'>
                                <i onClick={handleLike} className={` ${ like ? 'text-[#f00] font-bold': selfLike ? 'text-[#f00] font-bold': ''} text-[24px] cursor-pointer fa-light fa-heart`}></i>
                                <div className='flex justify-center items-center gap-1'>
                                    {amountLike} <p className='text-[14px]'>Like</p>
                                </div>
                            </div>
                            <div className='flex flex-col justify-center items-center'  >
                                <i onClick={()=>setShowComment(true)} className="text-[24px] cursor-pointer fa-light fa-comment fa-flip-horizontal"></i>
                                <div className='flex justify-center items-center gap-1'>
                                {amountCommentFetch.data ? amountCommentFetch.data : 0} <p className='text-[14px]'>Comment</p>
                                </div>
                            </div>
                            <i className="text-[24px] cursor-pointer fa-light fa-paper-plane"></i>
                        </div>
                        <div>
                            <i className="text-[24px] cursor-pointer fa-light fa-bookmark"></i>
                        </div>
                    </div>
                    <div className='px-12'>
                      
                       
                    </div>
            </div>
            <CSSTransition
                in={showComment}
                timeout={150}
                classNames="fade"
                unmountOnExit
            >
                <div onClick = {()=> setShowComment(false)} className='inset-0 bg-[rgba(0,0,0,0.31)] z-[9999] fixed flex items-center justify-center '>
                    <div onClick = {()=> setShowComment(false)} className='absolute top-5 right-5 text-[#fff] p-3 cursor-pointer'><i className="fa-regular fa-x"></i></div>
                    <div className='flex h-[92%] w-[70%] bg-[#fff] relative rounded-md'>
                        {commentFetch.isLoading ?
                            <Loading/> :
                            <Comments  arrImage = {arrImage} postItem = {postItem}/>
                        }
                        
                    </div>
                </div>
            </CSSTransition>
            
      </>
    );
  }
  
export default Post;
  