import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import { makeRequest } from "~/axios";

function OnlineItem({item}) {
    const { currentUser } = useSelector((state) => state.user);
  const userFetch = useQuery({
    queryKey: ["users", item.userId],
    queryFn: async () => {
        const res = await makeRequest.get(`/user/find?idUser=${item.userId}`);
        return res.data;
    },
});


    return ( 
        <>
            {
                userFetch.isSuccess && userFetch.data.idUser !== currentUser.idUser && 
                <div className="flex items-center mb-2 gap-3 z-0">
                <div className="relative">
                    <img
                        className="w-[40px] h-[40px] rounded-full "
                        src={userFetch.data.avatar}
                        alt=""
                    />
                    <div className="online"></div>
                </div>
            </div>
            } 
        </>
        
    );
}

export default OnlineItem;
