import React, { useState } from 'react';
import Form from './Form/Form';

function BecomeMember(props) {
    const [showForm, setShowForm] = useState(false);
    return (
        <div className='relative w-full h-[90vh] bg-cover object-cover' style={ !showForm ? {backgroundImage: `url("https://img.freepik.com/premium-vector/veterinary-clinic-doctor-examining-vaccination-health-care-pets-like-dogs-cats-flat-cartoon-background-vector-illustration-poster-banner_2175-3387.jpg?w=2000")`}: {}}>
            {!showForm && <button onClick={()=> setShowForm(true)} className='absolute top-16 left-6 p-2 rounded-xl bg-blue text-[#fff] '>Đăng ký tham gia</button>}
           {showForm && <Form/>}
        </div>
    );
}

export default BecomeMember;