"use client";
import { useState } from "react"
import { FiLogOut } from "react-icons/fi";
import logo from '@/../public/logo.png';
import iconLogo from '@/../public/icon_logo.svg';
import close from '@/../public/close.png';
import Image, { StaticImageData } from "next/image";

import Link from "next/link";
import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";

type Option = {
    title: string;
    src: StaticImageData;
    link: string;
}

interface IMenu {
    Menus: Option[]
}

function SideBar({ Menus }: IMenu) {
    const { instance } = useMsal();

    function logout() {
        localStorage.removeItem("JWT_TOKEN");
        instance.logoutRedirect()
    }
    const [open, setOpen] = useState(true);

    return (
        <nav className={`relative overflow-y-auto overflow-x-hidden duration-500 bg-palette-menu transition-all px-2 ${open ? "w-56" : "w-24"}`} >

            {/* opened */}
            <div className={`${!open && 'pt-5'}`}>
                <div className={`${!open ? 'flex flex-col justify-end' : 'pt-3'} `}>
                    <Image alt="close icon" src={close}
                        className={`absolute cursor-pointer rounded-full -right-0 w-7 border-2 border-palette-menu bottom-2 mr-2 ${!open && 'rotate-180'}`}
                        onClick={() => setOpen(!open)} />
                    <div className="flex justify-center">
                        <Image alt="Trackhub logo" src={logo} className={`cursor-pointer duration-500  w-40 ${!open && 'hidden'}`} />
                        <Image alt="icon trackhub" src={iconLogo} className={`cursor-pointer duration-500 w-[40px] ${open && 'hidden'}`} />
                    </div>

                    <hr className="h-px my-3 bg-palette-gray border-0" />

                    <div className="flex justify-center w-full">
                        <ul className={`flex-col ${open && 'w-full'}`}>
                            {Menus.map((menu, index) => (
                                 <li key={index} className={`text-light flex justify-start text-sm gap-x-4 cursor-pointer p-2 hover:bg-palette-gray rounded-md items-center`}>
                                 <Link href={menu.link} className="flex gap-2 justify-center items-center">
                                     <Image alt="option logo" src={menu.src} className={`transition-none w-6`} color="#FFF" />
                                     <span className={`origin-left duration-300 ${!open && 'hidden origin-right'} `}>{menu.title}</span>
                                 </Link>
                             </li>
                            ))}
                        </ul>
                    </div>

                    <hr className="h-px my-3 bg-palette-gray border-0" />

                    <div className="">
                        <button className={`text-light border-2 border-palette-gray p-2 flex items-center gap-3 rounded-md justify-center w-full ${!open && 'border-none w-20'}`} onClick={() => logout()}>
                            <FiLogOut className={`${!open && 'w-[20px] h-[20px] text-light border-2 border-palette-gray flex items-center gap-3 rounded-md justify-center border-none'}`} />
                            <span className={`${!open && 'hidden'}`}>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>

    );
}

export default SideBar