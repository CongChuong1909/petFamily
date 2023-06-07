import { useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeRequest } from "~/axios";

function ReplyComment(props) {
    const {comment, index} = props;
    const [dataUser, setDataUser] = useState({});
    const [showInputUpdate, setShowInputUpdate] = useState(false);
    const [showCommentOption, setShowCommentOption] = useState(false);
    const [showButtonOption, setShowButtonOption] = useState(true);
    const [textUpdateComment, setTextUpdateComment] = useState({});
    const queryClient = useQueryClient();
    const { currentUser } = useSelector((state) => state.user);
    const userFetch = useQuery({
        queryKey: ["users", comment.user],
        queryFn: async () => {
          const res = await makeRequest.get(`/user/find?idUser=${comment.user}`);
          return res.data;
        },
        onSuccess: (data) => {
            const userData = data || [];
            setDataUser(userData);
          },
      });


      const handleCommentChange = (index, value) => {
        setTextUpdateComment((prevState) => ({
            ...prevState,
            [index]: value,
          }));
      };
      

      const handleUpdateComment = (content) =>{
        const value = {
            content:  textUpdateComment[0] || comment.content ,
            idComment: comment.idComment
        }
        mutationUpdate.mutate(value);
        setShowInputUpdate(false);
        setShowButtonOption(true);
    }
    const handleDeleteComment = () => {
        mutationDelete.mutate(comment.idComment)
        setShowCommentOption(false);
    };
    return (
        <div className="grid grid-cols-8 ml-7 py-1 border-l border-[#333] gap-1">
            <div className="  grid grid-cols-6 col-span-3 ml-3 h-full ">
                <div className="flex col-span-2 h-full pt-1">
                    <img
                        className="w-[36px] h-[36px] rounded-full"
                        src={dataUser.avatar}
                        alt=""
                    />
                </div>
                <div className="col-span-4 flex flex-col ">
                    <p className="font-semibold text-[14px]">{dataUser.name}</p>
                    <p className="text-[#aaa] text-[12px]">
                        {moment(comment.date_create).fromNow()}
                    </p>
                </div>
            </div>
            <div className="col-span-4 flex flex-col items-start">
                <div className="cursor-pointer flex justify-start items-center">
                    {!showInputUpdate ? (
                        <p className="text-[#555] text-[14px] ">{comment.content}</p>
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
                                    handleCommentChange(index, e.target.value)
                                }
                                className="text-[#555] outline-none border border-[#ccc] rounded-tl-md rounded-bl-md px-3 py-1"
                            />
                            <button
                                onClick={handleUpdateComment}
                                className="bg-[#1877f2] px-1 text-[#fff] rounded-tr-md rounded-br-md text-[12px]"
                            >
                                Apply
                            </button>
                        </div>
                        <div onClick={()=>{setShowInputUpdate(false); setShowButtonOption(true)}} className="ml-[70%] select-none text-[12px] text-[#1877f2]">
                            <p>Exit</p>
                        </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="col-span-1 flex flex-col items-start relative">
                {comment.user === currentUser.idUser ? 
                showButtonOption && (
                    <i
                        onClick={(e) => {
                            setShowCommentOption(!showCommentOption);
                            e.stopPropagation();
                        }}
                        className="text-[12px] cursor-pointer fa-solid fa-ellipsis"
                    ></i>
                ) : (
                    <></>
                )}

                {showCommentOption ? (
                    <div className="absolute z-30 right-0 mt-2 w-36 bg-[#fff] rounded-md shadow-lg">
                        <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                                setShowInputUpdate(true);
                                setShowCommentOption(false);
                                setShowButtonOption(false);
                            }}
                        >
                            Update
                        </button>
                        <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
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
    );
}

export default ReplyComment;

