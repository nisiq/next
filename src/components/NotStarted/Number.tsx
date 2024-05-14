import React from 'react';
import { CiCircleAlert } from "react-icons/ci";

export default function Number() {
    return (
        <div className='flex items-center gap-3 justify-center mt-4'>
            <CiCircleAlert className='text-red-700' size={40}/>
            <div>
                <h1 className='text-6xl text-[#ED0007]'>10</h1>
            </div>

        </div>
    )
}