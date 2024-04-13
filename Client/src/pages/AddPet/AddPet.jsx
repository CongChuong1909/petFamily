    import { useQuery } from '@tanstack/react-query';
    import axios from 'axios';
    import React, { useState } from 'react';
    import Loading from '~/components/Loading/Loading';
    import AddInfoPet from './AddInfoPet';

    function Addpet(props) {
        const [viewListDog, setViewlistDog] = useState(false);
        const [viewListCat, setViewListCat] = useState(false);
        const [viewAddPet, setViewAddPet] = useState(false);
        const [errorMsg, setErrorMsg] = useState(false);
        const [breed, setBreed] = useState({});
        const dogFetch = useQuery({
            queryKey: ["apidog"],   
                queryFn: async () => {
                    const res = await axios(`https://api.thedogapi.com/v1/breeds`);
                    console.log(res.data);
                    return res.data;
                },
                enabled: viewListDog,
                onSuccess:()=>{
                },
                onError:()=>{
                    setErrorMsg(true)
                }
            });
        const catFetch = useQuery({
            queryKey: ["apicat"],
                queryFn: async () => {
                    const res = await axios(`https://api.thecatapi.com/v1/breeds`);
                    console.log(res.data);
                    return res.data;
                },
                enabled: viewListCat,
            });

        const handleChoisePet = (item, kind)=>{
            setViewlistDog(false);
            setViewListCat(false);
            setBreed({...item, kind});
            setViewAddPet(true);
            
            window.scrollTo({
                top: 300,
                behavior: 'smooth',
            });
        }
        // dogFetch.isLoading && console.log(dogFetch.data);
        return (
            <div className=''>
                <div className='flex flex-col items-center gap-5 h-full overflow-y-auto scroll-thin bg-[#fff]'>
                    <h1 className='text-[20px] pt-5 text-[#333] font-semibold'>Thú cưng của bạn là?</h1>
                    <div className=' h-[] flex gap-40 w-full justify-center'>
                        <div onClick={()=>{setViewListCat(false); setViewlistDog(true); }} className='select-none cursor-pointer border-[3px] rounded-full border-[#ddd]'>
                            <img className='select-none w-20 h-20px overflow-auto p-3' src="https://icons.iconarchive.com/icons/google/noto-emoji-animals-nature/512/22214-dog-face-icon.png" alt="" />
                        </div>
                        <div onClick={()=>{ setViewlistDog(false); setViewListCat(true); } } className='select-none cursor-pointer border-[3px] rounded-full border-[#ddd]'>
                            <img className='select-none w-20 h-20px overflow-auto p-3' src="https://icons.iconarchive.com/icons/google/noto-emoji-animals-nature/512/22220-cat-face-icon.png" alt="" />
                        </div>
                    </div>
                    </div>
                    {
                    viewListDog && (
                        <div className='flex justify-center'>
                            <div className='bg-[#fff] w-[50%] rounded-xl overflow-auto h-[740px] thin-scroll'>
                                {dogFetch.isLoading ?
                                    <Loading/> :
                                    dogFetch?.data?.map((item)=>(
                                        <div onClick={()=>handleChoisePet(item, 'dog')} key={item.id} className='flex item mx-4 items-center px-10 py-3 cursor-pointer item-kind '>
                                            <img className='w-20' src={`https://cdn2.thedogapi.com/images/${item.reference_image_id}.jpg`} alt="" />
                                            <h1 className='ml-3 text-[#333] font-semibold text-[18px]'>{item.name}</h1>
                                        </div>
                                    ))    
                                }
                            </div>
                        </div>
                    )
                }
                {
                    viewListCat && (
                        <div className='flex justify-center'>
                            <div className='bg-[#fff] w-[50%] rounded-xl overflow-auto h-[740px] thin-scroll'>
                                {catFetch.isLoading ?
                                    <Loading/> :
                                    catFetch.data.map((item)=>(
                                        <div onClick={()=>handleChoisePet(item, 'cat')} key={item.id} className='flex item mx-4 items-center px-10 py-3 cursor-pointer item-kind'>
                                            <img className='w-20' src={`https://cdn2.thecatapi.com/images/${item.reference_image_id}.jpg`} alt="" />
                                            <h1 className='ml-3 text-[#333] font-semibold text-[18px]'>{item.name}</h1>
                                        </div>
                                    ))    
                                }
                            </div>
                        </div>
                    )
                }

                {viewAddPet &&
                    <div>
                        <AddInfoPet handleShowList = {()=>setViewlistDog(true)} infoPet = {breed} />
                    </div>
                }
            </div>
        );
    }

    export default Addpet;