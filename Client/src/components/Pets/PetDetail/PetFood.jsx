import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { makeRequest } from '~/axios';

function PetFood(props) {
    const { petId , isView} = props;
    const queryClient = useQueryClient();

    const fetchPetFood = async () => {
      const res = await makeRequest.get(`/petdetail/getpetfood?id=${petId}`);
      return res.data;
    };
  
    const petFetch = useQuery(['petFood', petId], fetchPetFood);


    const mutationUpdate = useMutation(
        (item)=>{
        return makeRequest.put("/petdetail/updatePetFood", item)
        },{
        onSuccess:()=>{
            queryClient.invalidateQueries(["petFood"]);
        }
        })

    const handleCheckboxChange = (event) => {
        if(petFetch.isSuccess && !isView)
        {
            const { name, checked } = event.target;
            const requestBody = {
                ...petFetch.data[0],
                [name]: checked ? 1 : 0,
                idpet: petId,
            };
            mutationUpdate.mutate(requestBody)
        }
     
    };
    return (
        <>
            {
                petFetch.isSuccess &&
                <div className="item">
                <div className='flex justify-between'>
                    <div className='flex gap-2 items-center'>
                        <img className='w-[32px]' src="https://cdn-icons-png.flaticon.com/512/2771/2771406.png" alt="" />
                        <span>Dinh dưỡng</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <span>Chi tiết</span>
                        <i className="fa-light fa-angle-right"></i>
                    </div>
                </div>
                <div>
                <FormControl component="fieldset">
                    <FormGroup aria-label="position" row>
                       <div className="lg:w-1/3 flex justify-center md:w-1/2 sm:w-full">
                       <FormControlLabel value="top"
                        control={ <Checkbox
                            checked={petFetch?.data[0]?.isdried === 1}
                            onChange={handleCheckboxChange}
                            name="isdried"
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                        /> }
                        label={  <span className="text-[13px] text-[#555]">Khô</span>  }
                        labelPlacement="bottom"
                        />
                        </div>
                        <div className="lg:w-1/3 flex justify-center md:w-1/2 sm:w-full">
                        <FormControlLabel value="top"
                        control={ <Checkbox
                            checked={petFetch.data[0]?.iswet === 1}
                            onChange={handleCheckboxChange}
                            name="iswet"
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                        /> }
                        label={  <span className="text-[13px] text-[#555]">Ẩm</span>  }
                        labelPlacement="bottom"
                        />
                        </div>
                        <div className="lg:w-1/3 flex justify-center md:w-1/2 sm:w-full">
                        <FormControlLabel value="top"
                        control={ <Checkbox
                            checked={petFetch.data[0]?.issemiwet === 1}
                            onChange={handleCheckboxChange}
                            name="issemiwet"
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                        /> }
                        label={  <span className="text-[13px] text-[#555]">Bán ẩm</span>  }
                        labelPlacement="bottom"
                        />
                        </div>
                        <div className="lg:w-1/3 flex justify-center md:w-1/2 sm:w-full">
                        <FormControlLabel
                            value="bottom"
                            control={ <Checkbox
                                checked={petFetch.data[0]?.ishomeCooked === 1}
                                onChange={handleCheckboxChange}
                                name="ishomeCooked"
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                            /> }
                            label={<span className = 'text-[13px] text-[#555]'>Nhà nấu</span>}    
                            labelPlacement="bottom"
                        />
                        </div>
                        <div className="lg:w-1/3 flex justify-center md:w-1/2 sm:w-full">
                        <FormControlLabel
                            value="end"
                            control={ <Checkbox
                                checked={petFetch.data[0]?.isfresh === 1}
                                onChange={handleCheckboxChange}
                                name="isfresh"
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                            /> }
                            label={<span className = 'text-[13px] text-[#555]'>Tươi sống</span>}    
                            labelPlacement="bottom"
                        />
                        </div>
                        <div className="lg:w-1/3 flex justify-center md:w-1/2 sm:w-full">
                        <FormControlLabel
                            value="end"
                            control={ <Checkbox
                                checked={petFetch.data[0]?.isvegetable === 1}
                                onChange={handleCheckboxChange}
                                name="isvegetable"
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                            /> }
                            label={<span className = 'text-[13px] text-[#555]'>Rau củ</span>}    
                            labelPlacement="bottom"
                        />
                        </div>
                    </FormGroup>
                    </FormControl>
                </div>
            </div>
            }
        </>
       
    );
}

export default PetFood;