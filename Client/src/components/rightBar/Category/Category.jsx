import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import { makeRequest } from '~/axios';

function Category(props) {
    const userData = useQuery({
        queryKey: ["categoryAll"],
        queryFn: () =>
        makeRequest.get("/category").then((res) => {
            return res.data;
          }),
      },
      );
    return (
        <div className='item mt-5'>
            <h4 className='text-[#999] pb-2  border-b border-[#ccc]'>Gợi ý danh mục</h4>
            {
                userData.isSuccess && userData.data.map((item, index)=>(
                    <Link key={index} to={`find-by-category/${item.slug}`}>
                        <p className='text-[#253fe3] font-semibold cursor-pointer'>#{item.slug}</p>
                    </Link>
                ))
            }
        </div>
    );
}

export default Category;