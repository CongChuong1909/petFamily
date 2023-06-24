import React from 'react';

function VeterinarianServiceItem(props) {
    const {service} = props
    return (
        <div className='col-span-3 flex flex-col justify-center items-center'>
            <div className='w-40 h-40 rounded-2xl bg-cover' style={{backgroundImage: `url(${service.image})`, backgroundPosition:'center' }} />
            <p className='text-[14px] pt-2 text-[#333]'>{service.name}</p>
        </div>
    );
}

export default VeterinarianServiceItem;