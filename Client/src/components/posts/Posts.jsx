import React, { useState, useEffect } from "react";
import PostTool from "./PostCreate/PostsTool/PostTool";
import PostCreate from "./PostCreate/PostCreate";
import Post from "./Post/Post";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "~/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingPost from "../Loading/LoadingPost";
import { useInfiniteQuery } from "@tanstack/react-query"

function Posts(props) {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async (page) => {
    const response = await makeRequest.get(`/posts/getAllPublicPagination?page=${page}`)
    return response.data;
  }
  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['posts'], 
    ({pageParam = 1}) => fetchPosts(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1
        return nextPage 
      }
    }
  )

  isSuccess && console.log(data);
  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e) => {
      const {scrollHeight, scrollTop, clientHeight} = e.target.scrollingElement;
      if(!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true
        if(hasNextPage) await fetchNextPage()
        fetching = false
      }
    }
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [fetchNextPage, hasNextPage])
  return (
    <div>
      <PostCreate handleClosePostCreate={() => setShowCreatePost(false)} show={showCreatePost} />
      <PostTool onOpenCreatePost={() => setShowCreatePost(true)} />
    {   
        isSuccess && data.pages.map((page, index) => 
            page.map((post) => (
                <Post  key= {post.idposts} postItem = {post} />
            ))
          )
    }
    </div>

  );
}

export default Posts;
