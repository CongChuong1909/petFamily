import { useMutation } from '@tanstack/react-query';
import { makeRequest } from '~/axios';
const useAddFriend = () => {
    const addFriendMutation = async (userId) => {
      try {
        const response = await makeRequest.post(`/relationships/addRelationship`, { idUser : userId });
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    };
  
    return useMutation(addFriendMutation, {
        onSuccess:()=>{
            queryClient.invalidateQueries(["relationship"]);
        }
    });
  };


  export default useAddFriend;
