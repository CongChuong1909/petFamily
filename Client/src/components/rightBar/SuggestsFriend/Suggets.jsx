
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '~/axios';
import Loading from '~/components/Loading/Loading';
import FollowRecommendations from './SuggesstFollow';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '~/redux/relationshipSlices';


function Suggets(props) {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const relationShipFetch = useQuery({
      queryKey: ["relationship", currentUser.idUser],
      queryFn: async () => {
        const res = await makeRequest.get(`/relationships/getAll`);
        dispatch(getAll(res.data))
        return res.data;
      },
    }); 

    const userData = useQuery({
        queryKey: ["users"],
        queryFn: () =>
        makeRequest.get("/user/getAll").then((res) => {
            return res.data;
          }),
      },
      );
    return (
        <div className='item mt-5 '>
            <h4 className='text-[#999] pb-2  border-b border-[#ccc]'>Gợi ý theo dõi</h4>
            {
                relationShipFetch.isLoading ?
                <Loading/>:
                userData.isSuccess && <FollowRecommendations userData = {userData.data} data = {relationShipFetch.data} idUser = {currentUser.idUser}/>
            }
        </div>
    );
}

export default Suggets;

