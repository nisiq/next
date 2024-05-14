import bookIcon from '@/../public/IconBook.png';
import iconLogo from '@/../public/icon_logo.svg';
import logo from '@/../public/logo.png';
import '@/app/globals.css';
import FAQ from "@/components/FAQ";
import Image from "next/image";
import { IoMoonOutline } from "react-icons/io5";


export default function ScreenHelp() {
    return (
        <div className="select-none">
            <div className="flex items-center justify-between relative m-auto pr-8">
                <div className='flex items-center'>
                <Image alt="logo" src={logo} className="w-[160px] m-8 " />
                <div className="flex gap-[120px] ml-10">
                    <h1 className="font-bold">Documentação</h1>
                    <h1 className="font-bold">Ajuda</h1>
                </div>
                </div>
                <div className="flex gap-[4rem]">
                    <button className="font-bold bg-palette-404 hover:bg-palette-line rounded w-[120px] h-[30px]">Feedback</button>
                    <IoMoonOutline size={25} />
                </div>
            </div>
            <div className="z-1 absolute w-full items-center justify-center flex h-[20rem]">
                <Image alt="Icon logo" src={iconLogo} className="w-40" />
            </div>
            <div className="relative m-auto mt-4 bg-black bg-opacity-[0.65] backdrop-blur p-10 flex flex-col justify-center items-center w-[95%] h-[18rem]" >
                <Image src={bookIcon} alt="book icon" className="w-10 ml-[16px]"/>
                <h1 className="text-white font-bold text-2xl">Como podemos te ajudar?</h1>
                <h2 className="text-white">Descubra soluções através da nossa documentação</h2>
            </div>
            <div className="w-[95%]">
                <FAQ/>
            </div>
        </div>
    );
}