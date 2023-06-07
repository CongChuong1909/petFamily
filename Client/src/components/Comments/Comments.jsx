        import React, { useEffect, useState } from "react";
        import "slick-carousel/slick/slick.css";
        import "slick-carousel/slick/slick-theme.css";
        import Slider from "react-slick";
        import moment from "moment";
        import Picker from "@emoji-mart/react";
        import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
        import { makeRequest } from "~/axios";
        import Comment from "./Comment";
        import { useDispatch, useSelector } from 'react-redux';
        import { closeModalOptionComment } from "~/redux/modalSlices";
        const dataBg = 
        {
            1:"https://pety.vn/static/media/p1.562333b0.jpg",
            2:"https://pety.vn/static/media/p2.e2fedf9e.jpg",
            3:"https://pety.vn/static/media/p3.8ddba762.jpg",
            4:"https://pety.vn/static/media/p4.d230127a.jpg",
        }
        function Comments(props) {
            const arr = props.arrImage;
            const postItem = props.postItem;
            const [text, setText] = useState("");
            const [showEmoji, setShowEmoji] = useState(false);
            //

                const dispatch = useDispatch();
                // 

                const handleCloseModal = () => {
                    dispatch(closeModalOptionComment());
                };
            
        
            const queryClient = useQueryClient();
            var settings = {
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
            };
            const addEmoji = (e) => {
                let sym = e.unified.split("-");
                let codesArray = [];
                sym.forEach((el) => codesArray.push("0x" + el));
                let emoji = String.fromCodePoint(...codesArray);
                setText(text + emoji);
            };

            const commentFetch = useQuery({
                queryKey: ["comments", postItem.idposts],
                queryFn: async () => {
                const res = await makeRequest.get(`/comment?postId=${postItem.idposts}`);
                return res.data;
                },
            });
            
            const mutationAdd = useMutation((newComment)=>{
                return makeRequest.post("/comment/addComment", newComment)
            },
                {
                    onSuccess:()=>{
                        queryClient.invalidateQueries(["comments"]);
                    }
                }
            )


            const handleAddComment =(e)=>{
                e.preventDefault();
                const data= {
                    idPost : postItem.idposts,
                    content : text
                }
                mutationAdd.mutate(data);
                setText('');

            }



            return (
                <div
                    onClick={(e) => {
                        setShowEmoji(false);
                        e.stopPropagation();
                        handleCloseModal();
                    }}
                    className="grid grid-cols-12"
                >
                    <div className="col-span-7 bg-[#34465d] w-[1900px] max-w-full h-full flex justify-center z-30 relative">
                        {
                            props.arrImage.length > 0 ?
                            <Slider className="w-full flex" {...settings}>
                            {arr.map((image, index) => (
                                <div key={index} className="w-full h-full px-4 flex justify-center items-center slick-comment">
                                <div className="max-w-[90%] max-h-[90vh] flex items-center justify-center">
                                    <img
                                    className="max-h-full max-w-full rounded-sm object-contain"
                                    src={image}
                                    alt=""
                                    />
                                </div>
                                </div>
                            ))}
                            </Slider>
                            : postItem.post_bg === null ?
                            <div className="flex items-center justify-center">
                                <h1 className="text-[32px] text-[#222] font-semibold">{postItem.textcontent}</h1>
                            </div>
                            :
                            <div className='pt-4 px-12 pb-3 bg-cover bg-right-bottom text-[#fff]  font-bold' style={{ backgroundImage: `url(${dataBg[postItem.post_bg]})`, display: 'flex', alignItems: 'center', width:"100%",  justifyContent: 'center', height: '100%', }} >
                                <p className='text-[32px]'>{postItem.textcontent}</p>
                            </div>
                        }
                    </div>
                    <div className="col-span-5 p-3 flex flex-col justify-between scroll-div">
                        <div>
                            <div className="flex items-center justify-between border_bottom pb-3">
                                <div className="flex items-center gap-4 ">
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <img
                                                className="w-[40px] h-[40px] rounded-full"
                                                src={postItem.avatar}
                                                alt=""
                                            />
                                        </div>
                                        <div className=" flex flex-col ">
                                            <p className=" flex gap-2 items-center font-semibold text-[18px]">
                                                {postItem.name}
                                                {postItem.userid === 'kaiuIQFPw4' && <div><img className='w-[18px] h-[18px]' src="https://cdn-icons-png.flaticon.com/512/807/807262.png" alt="" /></div>}
                                            </p>
                                            <p className="text-[#999] text-[12px]">
                                                {moment(postItem.date_create).fromNow()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <i className=" text-[4px] fa-duotone fa-circle"></i>
                                        <div className="cursor-pointer flex items-center gap-1">
                                            <p className="text-[#1877f2] ">follow</p>
                                            <i className="text-[12px] text-[#1877f2] fa-light fa-user-plus"></i>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <i className="fa-solid fa-ellipsis"></i>
                                </div>
                            </div>
                            {
                                commentFetch.isLoading 
                                ? <>
                                    <div className='flex justify-center items-center'>
                                        <img className='w-40 h-30' src="../../../public/Loading_icon.gif" alt="" />
                                    </div>
                                </>
                                
                                : commentFetch.data.map((comment, index)=>(
                                    <Comment  key = {index} stopPropagation= {()=> e.stopPropagation()} index = {index} comment = {comment}/>
                                ))
                                
                            }
                            
                        </div>
                        <div className="border_top pt-4">
                            <div className="flex justify-between select-none items-center">
                                <p
                                    onClick={(e) => {
                                        setShowEmoji(!showEmoji);
                                        e.stopPropagation();
                                    }}
                                    className="text-[26px] p-3 cursor-pointer"
                                >
                                    🤪
                                </p>
                                <input
                                    type="text"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Add comment..."
                                    className="outline-none border-b border-[#b3b3b3] w-full p-4 "
                                />
                                <button onClick={handleAddComment} className="p-4 bg-[#1877f2] text-[#fff] rounded-md cursor-pointer ">
                                    Post
                                </button>
                            </div>
                        </div>
                        <div
                            className={`${
                                !showEmoji && "hidden"
                            } top-[20%] bottom-[-80%] h-[60%] absolute`}
                        >
                            {showEmoji && (
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                    previewposition="none"
                                    className="absolute top-[20%] bottom-[-80%] h-[60%]  z-50 right-[8%]"
                                >
                                    <Picker onEmojiSelect={addEmoji} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        export default Comments;
