import React, { useState } from "react";
import PostTool from "./PostCreate/PostsTool/PostTool";
import PostCreate from "./PostCreate/PostCreate";
import Post from "./Post/Post";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "~/axios";
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

// const posts = [
//     {
//         id: 1,
//         name: "Leona",
//         avatar: "https://i.pinimg.com/564x/fb/db/3d/fbdb3df363c7edc8322cc065a3b85241.jpg",
//         text: 'Nó đang dỗi em đó quý dị 😒😒😒',
//         images: [
//             "https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg",
//             "https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg",
//         ],
//         time: "2 day ago",

//     },
//     {
//         id: 2,
//         name: "Leona",
//         avatar: "https://i.pinimg.com/564x/fb/db/3d/fbdb3df363c7edc8322cc065a3b85241.jpg",
//         text: 'Nó đang dỗi em đó quý dị 😒😒😒',
//         images: [
//             "https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg",
//             "https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg",
//             "https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg",
//         ],
//         time: "2 day ago",

//     },
//     {
//         id: 3,
//         name: "Leona",
//         avatar: "https://i.pinimg.com/564x/fb/db/3d/fbdb3df363c7edc8322cc065a3b85241.jpg",
//         text: 'Nó đang dỗi em đó quý dị 😒😒😒',
//         images: [
//             "https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg",
//             "https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg",
//             "https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg",
//             "https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg",
//             "https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg",
//             "https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg"
//         ],
//         time: "2 day ago",

//     },
//     {
//         id: 4,
//         name: "Leona",
//         avatar: "https://i.pinimg.com/564x/fb/db/3d/fbdb3df363c7edc8322cc065a3b85241.jpg",
//         text: 'Nó đang dỗi em đó quý dị 😒😒😒',
//         images: [
//             "https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg",
//         ],
//         time: "2 day ago",

//     },

// ]
