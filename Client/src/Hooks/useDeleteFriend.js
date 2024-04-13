import { useMutation } from '@tanstack/react-query';
import { makeRequest } from '~/axios';
const useDeleteFriend = () => {
    const deleteFriendMutation = async (userId) => {
      try {
        const response = await makeRequest.delete("/relationships/deleteRelationship?idUser=" + userId);
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    };
  
    return useMutation(deleteFriendMutation, {
        onSuccess:()=>{
            queryClient.invalidateQueries(["relationship"]);
        }
    });
  };

  export default useDeleteFriend;