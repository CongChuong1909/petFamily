
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment/moment';
import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { makeRequest } from '~/axios';
import {classConfigOnPost} from '~/Data/Data'
import Comments from '~/components/Comments/Comments';
import { dataBg } from '~/Data/Data';
import { useSelector } from 'react-redux';
import Loading from '~/components/Loading/Loading';
import { Link, useNavigate } from 'react-router-dom';
import ReportModal from '~/components/Report/ReportModal';
import ViewImage from '~/components/ViewImage/ViewImage';
import CreateShare from '~/components/Share/CreateShare';
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
  const getConfig = (length, index) => {
    const config = classConfigOnPost[length] || classConfigOnPost['default'];
    return typeof config === 'object' ? config[index] || config['default'] : config;
  };

  function PostShare(props) {
    const [showMore, setShowMore] = useState(false);
    const [arrImage, setArrImage] = useState([]);
    const [showReport, setShowReport] = useState(false);
    const queryClient = useQueryClient();
    const [viewImage, setViewImage] = useState(false)
    const navigate = useNavigate();
    const handleShowMore = () => {
      setShowMore(!showMore);
    };
    const { postItem } = props;
    const imagesQuery = useQuery({
      queryKey: ["images", postItem.idposts],
      queryFn: async () => {
        const res = await makeRequest.get(`/images/getImagePost/${postItem.idposts}`);
        return res.data;
      },
    })
    useEffect(() => {
      imagesQuery.refetch();
    }, [postItem.idposts]);

   
  
    useEffect(() => {
      if (imagesQuery.isFetched) {
        const imagesData = imagesQuery.data || [];
        const arrImage = imagesData.map((image) => image.url);
        setArrImage(arrImage);
      }
    }, [postItem.idposts, imagesQuery.isFetched, imagesQuery.data]);








    const mutationHidden = useMutation((idpost)=>{
        return makeRequest.put("/posts/hidden", idpost)
    },
    {
        onSuccess:()=>{
            queryClient.invalidateQueries(["posts"]);
        }
    })


    const petFetch = useQuery({
        queryKey: ["0", postItem.idposts],
        queryFn: async () => {
          const res = await makeRequest.get(`/pet/post?idPost=${postItem.idposts}`);
          return res.data
        },
    });  

    const categoryFetch = useQuery({
    queryKey: ["category", postItem.idposts],
    queryFn: async () => {
        const res = await makeRequest.get(`/category/getById?idPost=${postItem.idposts}`);
        return res.data
    },
    });

    return (
      <>
        {
            postItem.post_status === 0 ?
            <div className="item px-3 border-2 border-[#bbb] rounded-md">
                <span>Nội dung được chia sẻ này không tồn tại hoặc bị xóa.</span>
                <div className='bg-[#98d5cd] w-full flex justify-center items-center'>
                    <img className='w-[300px]' src="https://res.cloudinary.com/dohmfb8tt/image/upload/v1688645679/img_pet_social/eq2fiyjwj3ialig3t2yv.jpg" alt="" />
                </div>
            </div>:
            <div
            key={postItem.idposts}
            className="item px-3 border-2 border-[#bbb] rounded-md"
          >     <div className='border-b border-[#333] py-1 mb-1'>
                    Xem bài viết gốc <Link to={`/post/${postItem.idposts}`} className='text-[#253fe3] font-semibold'>Tại đây</Link>
                </div>
            <div className='relative flex justify-between items-center border_bottom pb-2'>
                
                  <div className='flex items-center 2 '>
                      <Link 
                      to={`/profile/${postItem.id_user  }`}
                      >
                          <div className='flex items-center gap-2'>
                              <div><img className='w-[40px] h-[40px] rounded-full' src={postItem.avatarPost} alt="" /></div>
                              <p className='font-semibold text-[18px]'>{postItem.namePost}</p>
                              {postItem.userid === 'kaiuIQFPw4' && <div><img className='w-[20px] h-[20px]' src="https://cdn-icons-png.flaticon.com/512/807/807262.png" alt="" /></div>}
                          </div>
                      </Link>
                      <div className='flex items-center gap-4 pl-2'>
                          <i className=" text-[4px] fa-duotone fa-circle"></i>
                          <p className='text-[#999]'>{moment(postItem.date_create).fromNow()}</p>
                          {
                              postItem.role === 2 &&
                              <div className='flex items-center justify-center px-2 py-1 gap-1 border text-[#fff] text-[14px]  bg-[#5271ff] rounded-md'>
                                  <i class="fa-duotone fa-kit-medical"></i>
                                  <p>Chuyên gia</p>
                              </div>
                          }
                      </div>
                  </div>
                 
  
  
              {showReport && <ReportModal idpost = {postItem.idposts} setShowReport = {setShowReport} showReport = {showReport}/>}
              </div>
                   {
                       postItem.post_bg ? 
                       <div className='pt-4 px-12 pb-3 bg-cover bg-right-bottom text-[#fff]  font-bold' style={{ backgroundImage: `url(${dataBg[postItem.post_bg]})`, display: 'flex', alignItems: 'center',  justifyContent: 'center', height: '480px', }} >
                           <p className='text-[32px]'>{postItem.textcontent}</p>
                       </div>
                   :
                       <div className='pt-4 px-12 pb-3'>
                           <p>{postItem.textcontent}</p>
                           <div>
                              {categoryFetch.isSuccess && categoryFetch.data.map((item, index)=>(
                                  <Link key = {index} to={`/find-by-category/${item.slug}`}>
                                      <span className='text-[#253fe3] font-semibold cursor-pointer' key={item.idcategory}>#{item.slug} &nbsp;</span>
                                  </Link>
                              ))}
                           </div>
                           {
                              petFetch.isSuccess&& petFetch.data.length > 0 ?
                                  <div className='flex items-center pt'>
                                  <span>With</span>
                                  <div className='flex'>
                                      {
                                          petFetch.isSuccess &&
                                          petFetch.data.map((item, index) => (
                                              <div
                                              key={index}
                                              onClick={()=> {navigate(`/pet/${item.idpets}`)}}
                                              className="flex items-center cursor-pointer rounded-xl px-2 py-1 mx-3 opacity-[1]"
                                              style={{ backgroundColor: brightColors[index] }}
                                              >
                                              <img className="w-[20px] h-[20px] rounded-full" src={item.avatar} alt="" />
                                              <span className="px-1 text-[#fff]">{item.name}</span>
                                              </div>
                                          ))
                                      }
                                      </div>
                                  </div>
                              :
                              <></>
                           
                           }
                       </div>
                   }
    
            {imagesQuery.error
              ? "something went wrong!"
              : imagesQuery.isLoading
              ? <Loading/>
              : imagesQuery.data.length === 0
              ? null
              : (
                  <div
                    className={`grid gap-2 ${
                      arrImage.length === 1
                        ? "grid-cols-4"
                        : arrImage.length === 2
                        ? "grid-cols-8"
                        : "grid-cols-12"
                    } w-full flex justify-center items-center px-16`}
                  >
                    {/* Render preview images */}
                    {arrImage.slice(0, 5).map((image, index) => (
                      <div
                        key={index}
                        className={`bg-gray-200 ${getConfig(
                          arrImage.length,
                          index
                        )} relative flex items-center justify-center w-full overflow-hidden`}
                        onClick={()=> setViewImage(true)}
                      >
                          <img
                              src={image}
                              className="absolute top-0 left-0 h-full w-full object-cover"
                              
                              alt={`Preview ${index}`}
                          />
                          {arrImage.length > 5 && index === 4 && (
                              <div className="absolute inset-0 w-full h-full  bg-[rgba(0,0,0,0.15)] flex justify-center items-center">
                              <div
                                  onClick={handleShowMore}
                                  className="text-white bg-gray-500 px-2 cursor-pointer py-1 rounded-md"
                              >
                                  {showMore ? "Hide" : (
                                  <p className='text-[#fff] text-[24px] font-bold'>
                                      {arrImage.length - 5}+
                                  </p>
                                  )}
                              </div>
                              </div>
                    )}
                      </div>
                    ))}
                    
                  </div>
                )}
          </div>     
        }
       
            
        {viewImage && imagesQuery.isSuccess && <ViewImage setShowImage = {setViewImage} arrImage = {imagesQuery.data} />}
      </>
    );
  }
  
export default PostShare;
  