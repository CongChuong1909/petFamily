import { useMutation, useQueryClient } from '@tanstack/react-query';
import Picker from "@emoji-mart/react";
import React, { useState } from 'react';
import { makeRequest } from '~/axios';

function InputReply(props) {
    const [showEmoji, setShowEmoji] = useState(false);
    const {comment} = props
    console.log(comment);
    const queryClient = useQueryClient();
    const [textReply, setTextReply] = useState(`@${comment.name} `)
    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setTextReply(textReply + emoji);
    };

    const mutationAdd = useMutation((newComment)=>{
        return makeRequest.post("/comment/addReply", newComment)
    },{onSuccess:()=>{
        queryClient.invalidateQueries(["comments"]);
    }})

    const handleAddComment = ()=>{
        const value = {
            idComment : comment.idComment,
            content : textReply,
            idUserReply: comment.iduser,
            idPost:  comment.idpost
        }
        mutationAdd.mutate(value);
        props.onCloseAndOpenShowReply();
    }
    return (
        <div className="ml-[20%] pt-4">
                    <div className="flex justify-between w-[80%] items-center select-none">
                        <p
                            onClick={(e) => {
                                setShowEmoji(!showEmoji);
                                e.stopPropagation();
                            }}
                            className="text-[20px] p-2 cursor-pointer"
                        >
                            🤪
                        </p>
                        <input
                            type="text"
                            value={textReply}
                            onChange={(e) => setTextReply(e.target.value)}
                            placeholder="Add comment..."
                            className="outline-none border-b border-[#b3b3b3] w-[80%] px-2 py-1 "
                        />
                        <button onClick={handleAddComment} className="px-2 py-1 bg-[#1877f2] text-[#fff] rounded-md cursor-pointer ">
                            Add
                        </button>
                    </div>
                    {showEmoji && (
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            previewposition="none"
                            className="absolute top-[20%] bottom-[-80%] h-[60%]  z-50 right-[40%]"
                        >
                            <Picker onEmojiSelect={addEmoji} />
                        </div>
                    )}
                </div>
    );
}

export default InputReply;


