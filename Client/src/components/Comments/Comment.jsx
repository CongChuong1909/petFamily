import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeRequest } from "~/axios";
import Loading from "../Loading/Loading";
import ReplyComment from "./ReplyComment";
import InputReply from "./InputReply";
import { openModalOptionComment } from "~/redux/modalSlices";
moment.locale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s:  '1s',
      ss: '%ss',
      m:  '1m',
      mm: '%dm',
      h:  '1h',
      hh: '%dh',
      d:  '1d',
      dd: '%dd',
      M:  '1M',
      MM: '%dM',
      y:  '1Y',
      yy: '%dY'
    }
  })  

function Comment(props) {
    const { comment, index } = props;
    const [showInputUpdate, setShowInputUpdate] = useState(false);
    const [textUpdateComment, setTextUpdateComment] = useState({});
    const queryClient = useQueryClient();
    const [showButtonOption, setShowButtonOption] = useState(true);
    const { currentUser } = useSelector((state) => state.user);
    const [showReplyComment,setShowReplyComment]= useState(false);
    const [showInputReply, setShowInputReply] = useState(false);
    const [showCommentOption, setShowCommentOption] = useState(false);
    const showModalOpitonComment = useSelector((state) => state.modal.showModalOpitonComment);

    const dispatch = useDispatch();
    // 

    const handleCloseModal = () => {
        dispatch(openModalOptionComment());
    };
      const handleCommentChange = (index, value) => {
        setTextUpdateComment((prevState) => ({
            ...prevState,
            [index]: value,
          }));
      };
    //   console.log(textUpdateComment);

    const mutationUpdate = useMutation((updateComment)=>{
        return makeRequest.put("/comment/updateComment", updateComment)
    },{onSuccess:()=>{
            queryClient.invalidateQueries(["comments"]);
        }}
    )
    const mutationDelete = useMutation((idComment)=>{
        return makeRequest.delete("/comment/deleteComment?idComment="+ idComment)
    },{onSuccess:()=>{
                queryClient.invalidateQueries(["comments"]);
        }}
    )
    const handleUpdateComment = (content) =>{
        const value = {
            content:  textUpdateComment[1] || comment.content ,
            idComment: comment.idComment
        }
        mutationUpdate.mutate(value);
        ////setUI
        setShowInputUpdate(false);
        setShowButtonOption(true)
       
    }
    const handleDeleteComment = () => {
        mutationDelete.mutate(comment.idComment)
        ////setUI
        setShowCommentOption(false);
    };

    const handleCloseAndOpenShowReply = ()=>{
        ////setUI
        setShowInputReply(false);
        setShowReplyComment(true);
    }

   

    /////=======reply======
    
    const commentReplyFetch = useQuery({
        queryKey: ["comments", comment.idComment],
        queryFn: async () => {
          const res = await makeRequest.get(`/comment/getReply/?idComment=${comment.idComment}`);
          return res.data;
        },
      });

    const handleReplyComment = ()=>{
        setShowInputReply(!showInputReply);
    }



    return (
      <div key={comment.idComment} className="pt-4 ">
         <div className="grid grid-cols-8  gap-4 ">
                 <div className="col-span-3 grid grid-cols-6 h-full ">
                     <div className="flex col-span-2 h-full relative pt-1">
                         <img
                             className="w-[36px] h-[36px] rounded-full"
                             src={comment.avatar}
                             alt=""
                         />
                         {comment.iduser === 'kaiuIQFPw4' && <div className="absolute bottom-0 right-[5px]"><img className='w-[12px] h-[12px]' src="https://cdn-icons-png.flaticon.com/512/807/807262.png" alt="" /></div>}
                     </div>
                     <div className=" col-span-4 flex flex-col ">
                         <p className="font-semibold flex items-center text-[14px]">
                             {comment.name}
                             
                         </p>
                         <p className="text-[#aaa] text-[12px]">
                             {moment(comment.date_create).fromNow()}
                         </p>
                     </div>
                 </div>
                 <div className="col-span-4 flex flex-col items-start justify-end">
                     <div className="cursor-pointer flex justify-start">
                         {!showInputUpdate ? (
                             <p className="text-[#555] text-[14px]">{comment.content}</p>
                         ) : (
                             <div>
                                <div className="flex ">
                                    <input
                                        type="text"
                                        value={
                                            textUpdateComment[index] !== undefined
                                            ? textUpdateComment[index]
                                            : comment.content
                                        }
                                        onChange={(e) =>
                                            handleCommentChange(
                                                index,
                                                e.target.value,
                                            )
                                        }
                                        className="text-[#555] outline-none border border-[#ccc] rounded-tl-md rounded-bl-md px-3 py-1"
                                    />
                                    <button onClick = {handleUpdateComment} className="bg-[#1877f2] px-1 text-[#fff] rounded-tr-md rounded-br-md text-[12px]">
                                        Apply
                                    </button>
                                </div>
                                <div onClick={()=>{setShowInputUpdate(false);setShowButtonOption(true)}} className="ml-[70%] select-none text-[12px] cursor-pointer text-[#1877f2]">
                                    <p>Exit</p>
                                </div>
                             </div>
                         )}
                     </div>
                     <div>
                         <p onClick={handleReplyComment} className="text-[12px] select-none text-[#1877f2] cursor-pointer">
                             Reply
                         </p>
                     </div>
                 </div>
                 
                <div className="col-span-1 flex flex-col items-start relative">
                {comment.iduser === currentUser.idUser ?
                showButtonOption && (
                        <i
                        onClick={(e) => {
                        handleCloseModal();
                        setShowCommentOption(!showCommentOption);
                        e.stopPropagation();
                        }}
                        className="text-[12px] cursor-pointer fa-solid fa-ellipsis"
                    ></i>):
                    <></>
                    }
                
                {showCommentOption && showModalOpitonComment? (
                    <div className="absolute z-30 right-0 mt-2 w-36 bg-[#fff] rounded-md shadow-lg">
                    <button
                        className="block select-none w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => {setShowInputUpdate(true); setShowCommentOption(false); setShowButtonOption(false);}}
                    >
                        Update
                    </button>
                    <button
                        className="block select-none w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={handleDeleteComment}
                    >
                        Delete
                    </button>
                    </div>
                ) : (
                    <></>
                )}
                </div>
        </div>
        <div>
            {commentReplyFetch.isLoading ?
            <Loading/>:
            commentReplyFetch.data.length === 0 ? <></> : 
            <div>
                <div className="grid grid-cols-7 mt-3 gap-4">
                    <div className="col-span-2  h-full flex gap-2"></div>
                    <div onClick={()=>setShowReplyComment(!showReplyComment)} className="select-none cursor-pointer col-span-4 flex items-center gap-3"><i className="fa-thin fa-horizontal-rule fa-2xl"></i><p className="text-[11px] text-[#333]">{showReplyComment? 'Hide': 'Show'} {commentReplyFetch.data.length} reply commment</p></div>
                </div>
                {showReplyComment && 
                    commentReplyFetch.data.map((comment, index)=>(
                        <ReplyComment key = {index} comment = {comment} index = {index}/>
                    ))
                }
                
            </div>
        }
        </div>
        {
            showInputReply && 
            <>
                <InputReply onCloseAndOpenShowReply= {handleCloseAndOpenShowReply} comment = {comment} />
                <div onClick={()=>{setShowInputReply(false)}} className="ml-[70%] select-none text-[12px] cursor-pointer text-[#1877f2]">
                    <p>Exit</p>
                </div>
            </>
        }
      </div>
    );
  }
  
  export default Comment;
  