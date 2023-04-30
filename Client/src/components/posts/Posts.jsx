import React, { useState } from 'react';
import PostTool from './PostCreate/PostsTool/PostTool';
import PostCreate from './PostCreate/PostCreate';
import Post from './Post/Post';

function Posts(props) {
    const [showCreatePost, setShowCreatePost] = useState(false);
    // lock scroll on modal open 
    if(showCreatePost === true)
    {
        document.body.style.overflow = 'hidden';
    }
    return (
        <div>
            <PostCreate handleClosePostCreate = {()=>setShowCreatePost(false)}  show = {showCreatePost}/>
            <PostTool onOpenCreatePost = {()=>setShowCreatePost(true)}/>
            <Post/>
        </div>
    );
}

export default Posts;