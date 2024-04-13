
import { makeRequest } from "~/axios";
export const getImages = async (idPost) =>{
        const res = await makeRequest.get(`images/getImagePost/${idPost}`)
        if (!res.ok) {
            throw new Error('Failed to fetch images');
          }
          return response.json();
}
export const getPosts = async () => {
    try {
      const response = await makeRequest.get('/posts/getAllPublic');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch posts');
    }
  };