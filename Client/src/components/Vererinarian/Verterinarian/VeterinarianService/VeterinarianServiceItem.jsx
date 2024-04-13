import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { makeRequest } from '~/axios';

function VeterinarianServiceItem(props) {
    const queryClient = useQueryClient();
    const {service} = props
    console.log(service);
    const mutation = useMutation(
        (id)=>{
        return makeRequest.delete(`veterinarian/deleteService?id=${id}`)
        },{
        onSuccess:()=>{
            props.handleClosePostCreate;
            queryClient.invalidateQueries(["service"]);
        }
      })
    const handleDelete = ()=>{
        mutation.mutate(service.idservice);
    }
    return (
        <div className='col-span-3 flex flex-col justify-center items-center'>
            <p onClick={handleDelete} className='p-2 bg-green'>X</p>
            <div className='w-40 h-40 rounded-2xl bg-cover' style={{backgroundImage: `url(${service.image})`, backgroundPosition:'center' }} />
            <p className='text-[14px] pt-2 text-[#333]'>{service.name}</p>
        </div>
    );
}

export default VeterinarianServiceItem;