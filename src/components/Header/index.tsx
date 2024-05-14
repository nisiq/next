'use client';
import { useState } from 'react';
import { MdOutlineDarkMode, MdOutlineWbSunny } from "react-icons/md";

interface IHeader {
    title: string
    userImg: string
    status: boolean
}

function Header({ title, userImg, status }: IHeader) {

    const [isActive, setIsActive] = useState(false);

    if (status) {
        return (
            <div className='pr-10 py-1.5 animate-pulse'>
            <div className='w-full flex justify-between mt-3'>
                <div className="w-40 h-3 bg-gray-200 rounded-full dark:bg-gray-700 mt-4"></div>
                <div className="flex items-center gap-4 justify-center">
                    <svg className="w-10 h-10 text-gray-200 dark:text-gray-700 me-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                </div>
            </div>
            <hr className='h-px my-1  bg-gray-300 border-0 dark:bg-gray-700' />
        </div>
        );
    }

    return (
        <div className='pr-10 py-1.5'>
            <div className='w-full flex justify-between mt-3'>
                <h1 className='mb-2  font-inter font-semibold text-2xl cursor-default'>
                    {title}
                </h1>
                <div className="flex items-center gap-4 justify-center">
                    <button className='flex items-center justify-center w-8 h-8 hover:bg-slate-200 rounded-2xl'>
                        {isActive ? <MdOutlineWbSunny size={23} onClick={() => {
                            setIsActive(!isActive)
                        }} /> :
                            <MdOutlineDarkMode size={23} onClick={() => {
                                setIsActive(!isActive)
                            }} />
                        }
                    </button>
                    <button className={`flex items-center justify-center w-8 h-8 ${userImg} bg-cover rounded-2xl `}>
                       
                    </button>
                </div>

            </div>
            <hr className='h-px my-1  bg-gray-300 border-0 dark:bg-gray-700' />
        </div>
    )
}

export default Header