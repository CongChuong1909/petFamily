import React, { useState } from "react";
import PostTool from "./PostCreate/PostsTool/PostTool";
import PostCreate from "./PostCreate/PostCreate";
import Post from "./Post/Post";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest, makeRequestAuth } from "~/axios";
import { getPosts } from "~/API/postAPI";

function Posts(props) {
    const [showCreatePost, setShowCreatePost] = useState(false);
    const queryClient = useQueryClient();
    const postData = useQuery({
        queryKey: ["posts"],
        queryFn: () =>
            makeRequest.get("/posts/getAllPublic").then((res) => {
                return res.data;
            }),
    },
    );
    postData.isSuccess && console.log(postData.data);
    return (
        <div>
            <PostCreate
                handleClosePostCreate={() => setShowCreatePost(false)}
                show={showCreatePost}
            />
            <PostTool onOpenCreatePost={() => setShowCreatePost(true)} />
            {postData.error
                ? "something went wrong!"
                : postData.isLoading
                ? "loading..."
                : postData.data.map(
                      (post, index) => {
                          return (
                            <Post  key= {post.idposts} postItem = {post} />
                           
                          );
                      },
                  )}
        </div>
    );
}

export default Posts;
