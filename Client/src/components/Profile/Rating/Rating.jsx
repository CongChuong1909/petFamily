import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { makeRequest } from '~/axios';
import RatingComment from './RatingComment';
import AddRating from './AddRating';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function Rating(props) {
    const {idProfileVeterinarian} = props;
    const userId = useLocation().pathname.split("/")[2];
    const { currentUser } = useSelector((state) => state.user);
    const [averageRating, setAverageRating] = useState(0);
    const [showAddRating, setShowAddRating] = useState(false);
    const [rating, setRating] = useState({
        star1:0,
        star2:0,
        star3:0,
        star4:0,
        star5:0,
    })
    const [displayedReviews, setDisplayedReviews] = useState(5);
    const reviewsPerPage = 5;
    const ratingFetch = useQuery({
        queryKey: ["rating", idProfileVeterinarian],
        queryFn: async () => {
            const res = await makeRequest.get(
                `/rating/getList?idVerterinarian=${idProfileVeterinarian}`,
            );
            return res.data;
        },
    });
    const handleLoadMore = () => {
        setDisplayedReviews(displayedReviews + reviewsPerPage);
      };

    useEffect(() => {
        if (ratingFetch.isSuccess) {
          let totalRating = 0;
          const ratingCounts = {
            star1: 0,
            star2: 0,
            star3: 0,
            star4: 0,
            star5: 0,
          };
      
          ratingFetch.data.forEach((item) => {
            totalRating += item.rating;
            switch (item.rating) {
              case 1:
                ratingCounts.star1++;
                break;
              case 2:
                ratingCounts.star2++;
                break;
              case 3:
                ratingCounts.star3++;
                break;
              case 4:
                ratingCounts.star4++;
                break;
              case 5:
                ratingCounts.star5++;
                break;
              default:
                break;
            }
          });
      
          const averageRating = totalRating / ratingFetch.data.length;
          setAverageRating(parseFloat(averageRating).toFixed(2));
          setRating(ratingCounts);
        }
      }, [idProfileVeterinarian, ratingFetch.isSuccess]);

    return (
        <div>
            {
                ratingFetch.isSuccess &&
                <>
                    <div className="flex items-center mb-3">
                        <svg aria-hidden="true" className={`w-5 h-5 ${Math.floor(averageRating) >= 1?'text-[#e3a008]': 'text-[#ccc]' }`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className={`w-5 h-5 ${Math.floor(averageRating) >= 2?'text-[#e3a008]': 'text-[#ccc]' }`}  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className={`w-5 h-5 ${Math.floor(averageRating) >= 3?'text-[#e3a008]': 'text-[#ccc]' }`}  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className={`w-5 h-5 ${Math.floor(averageRating) >= 4?'text-[#e3a008]': 'text-[#ccc]' }`}  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className={`w-5 h-5 ${Math.floor(averageRating) >= 5?'text-[#e3a008]': 'text-[#ccc]' }`}  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <p className="ml-2 text-sm font-medium text-[#ccc] dark:text-white">{averageRating} trên 5</p>
                    </div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{ratingFetch.data.length} Đánh giá</p>
                    <div className="flex items-center mt-4">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-500">5 Sao</span>
                        <div className="w-2/4 h-5 mx-4 bg-[#ccc] rounded dark:bg-gray-700">
                            <div className="h-5 bg-[#e3a008] rounded"style={{width:`${(rating.star5/ratingFetch.data.length)*100}%`}}></div>
                        </div>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-500">{Math.floor((rating.star5/ratingFetch.data.length)*100)}%</span>
                    </div>
                    <div className="flex items-center mt-4">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-500">4 Sao</span>
                        <div className="w-2/4 h-5 mx-4 bg-[#ccc] rounded dark:bg-gray-700">
                            <div className="h-5 bg-[#e3a008] rounded" style={{width:`${(rating.star4/ratingFetch.data.length)*100}%`}}></div>
                        </div>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-500">{Math.floor((rating.star4/ratingFetch.data.length)*100)}%</span>
                    </div>
                    <div className="flex items-center mt-4">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-500">3 Sao</span>
                        <div className="w-2/4 h-5 mx-4 bg-[#ccc] rounded dark:bg-gray-700">
                            <div className="h-5 bg-[#e3a008] rounded" style={{width:`${(rating.star3/ratingFetch.data.length)*100}%`}}></div>
                        </div>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-500">{Math.floor((rating.star3/ratingFetch.data.length)*100)}%</span>
                    </div>
                    <div className="flex items-center mt-4">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-500">2 Sao</span>
                        <div className="w-2/4 h-5 mx-4 bg-[#ccc] rounded dark:bg-gray-700">
                            <div className="h-5 bg-[#e3a008] rounded" style={{width:`${(rating.star2/ratingFetch.data.length)*100}%`}}></div>
                        </div>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-500">{Math.floor((rating.star2/ratingFetch.data.length)*100)}%</span>
                    </div>
                    <div className="flex items-center mt-4">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-500">1 Sao</span>
                        <div className="w-2/4 h-5 mx-4 bg-[#ccc] rounded dark:bg-gray-700">
                            <div className="h-5 bg-[#e3a008] rounded" style={{width:`${(rating.star1/ratingFetch.data.length)*100}%`}}></div>
                        </div>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-500">{Math.floor((rating.star1/ratingFetch.data.length)*100)}%</span>
                    </div>
                    {userId !== currentUser.idUser ?<div className='mt-5'>
                        <button onClick={()=>setShowAddRating(!showAddRating)} className='bg-[#006fa5] text-[#fff] w-full rounded-lg border-2 border-[#cbcaca] py-2 hover:bg-[#008bd0] duration-300'>Thêm đánh giá</button>
                    </div>:
                        <div className='pb-8'></div>
                    }
                    { 
                         showAddRating && <AddRating idProfileVeterinarian = {idProfileVeterinarian} onClose = {()=>setShowAddRating(false)}/>
                    }
                    {
                        ratingFetch.data.slice(0, displayedReviews).map((item, index) => (
                            <RatingComment item={item} key={index} />
                          ))
                    }
                    <div className='w-full flex justify-center'>
                        {ratingFetch.data.length > displayedReviews && (
                            <button onClick={handleLoadMore} className="bg-[#006fa5] text-[#fff] p-2 rounded-md dark:text-blue-500">
                                Load More
                            </button>
                        )}
                    </div>
                </>
            }
            
        </div>
    );
}

export default Rating;