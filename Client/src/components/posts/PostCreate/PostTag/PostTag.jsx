
import { QueryCache, useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeRequest } from '~/axios';

const brightColors = [
  "#7fbdff", 
  "#8fe4cb",
  "#28c76f",
  "#f148e4",
  "#b7a0e0",
  "#93d3a2",
  "#febe89",
  "#b287f8",
];

function PostTag(props) {
  const { currentUser } = useSelector((state) => state.user);
  const [listTag, setListTag] = useState([]);

  const petFetch = useQuery({
    queryKey: ["pets"],
    queryFn: () => makeRequest.get('/pet?idUser=' + currentUser.idUser).then((res) => res.data),
    onSuccess: (data) => {
      setListTag(data);
    },
  });
  useEffect(() => {
    if(props.onGetListPet)
    {
        props.onGetListPet(listTag);
    }
  }, [listTag]);


  const removePetMutation = useMutation((index) => {
    const newListTag = [...listTag];
    newListTag.splice(index, 1);
    setListTag(newListTag);
  });

  const handleRemoveTag = (index) => {
    removePetMutation.mutate(index);
  };

  return (
    <div className="flex pt-4">
      <span>Cùng với</span>
      {petFetch.isSuccess &&
        listTag.map((item, index) => (
          <div
            key={index}
            className="flex items-center rounded-xl px-2 py-1 mx-3 opacity-[1]"
            style={{ backgroundColor: brightColors[index] }}
          >
            <img className="w-[20px] h-[20px] rounded-full" src={item.avatar} alt="" />
            <span className="px-1 text-[#fff]">{item.name}</span>
            <div className="h-full flex items-center">
              <i
                onClick={() => handleRemoveTag(index)}
                className="fa-thin fa-x pl-1 cursor-pointer pt-[6px] text-[#fff] text-[10px]"
              ></i>
            </div>
          </div>
        ))}
    </div>
  );
}

export default PostTag;
