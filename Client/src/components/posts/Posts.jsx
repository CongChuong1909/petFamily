// import React, { useState } from "react";
// import PostTool from "./PostCreate/PostsTool/PostTool";
// import PostCreate from "./PostCreate/PostCreate";
// import Post from "./Post/Post";
// import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
// import { makeRequest, makeRequestAuth } from "~/axios";
// import { getPosts } from "~/API/postAPI";

// function Posts(props) {
//     const [showCreatePost, setShowCreatePost] = useState(false);
//     const queryClient = useQueryClient();
//     const postData = useQuery({
//         queryKey: ["posts"],
//         queryFn: () =>
//             makeRequest.get(`/posts/getAllPublicPagination?page=${1}`).then((res) => {
//                 return res.data;
//             }),
//     },
//     );
//     return (
//         <div>
//             <PostCreate
//                 handleClosePostCreate={() => setShowCreatePost(false)}
//                 show={showCreatePost}
//             />
//             <PostTool onOpenCreatePost={() => setShowCreatePost(true)} />
//             {postData.error
//                 ? "something went wrong!"
//                 : postData.isLoading
//                 ? "loading..."
//                 : postData.data.map(
//                       (post, index) => {
//                           return (
//                             <Post  key= {post.idposts} postItem = {post} />
                           
//                           );
//                       },
//                   )}
//         </div>
//     );
// }

// export default Posts;
import React, { useState, useEffect } from "react";
import PostTool from "./PostCreate/PostsTool/PostTool";
import PostCreate from "./PostCreate/PostCreate";
import Post from "./Post/Post";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "~/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingPost from "../Loading/LoadingPost";

function Posts(props) {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);

  const { data: postData, isLoading: isPostLoading } = useQuery(
    ["posts", page],
    () => makeRequest.get(`/posts/getAllPublicPagination?page=${page}`).then((res) => res.data)
  );

  useEffect(() => {
    if (postData) {
      setPosts((prevPosts) => [...prevPosts, ...postData]);
    }
  }, [postData]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <PostCreate handleClosePostCreate={() => setShowCreatePost(false)} show={showCreatePost} />
      <PostTool onOpenCreatePost={() => setShowCreatePost(true)} />

      <InfiniteScroll
        dataLength={posts.length}
        next={handleLoadMore}
        hasMore={!isPostLoading && postData && postData.length > 0}
        loader={<LoadingPost/>}
        endMessage={<p>Bạn đã lướt hết tin.</p>}
      >
        {posts.map((post, index) => {
          return <Post key={post.idposts} postItem={post} />;
        })}
      </InfiniteScroll>
    </div>
  );
}

export default Posts;
