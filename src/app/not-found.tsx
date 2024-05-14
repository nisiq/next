import "./globals.css";

import { GoArrowLeft } from "react-icons/go";
import image404 from '@/../public/404.png';
import Person from "@/../public/Person.png";
import Image from "next/image";

export default function NotFound() {
    return(
        <div className="bg-palette-cancel w-full h-[100vh]">
          <div className="ml-[210px]">
            <div className="flex">
              <Image alt="Person image" src={Person} className="p-[83px] ml-[80px] mt-[120px]"/>
                
              <div className="mt-[230px]">
                <Image alt="404 image" src={image404} className="w-[300px]"/>
                <h1 className="text-6xl font-semibold">Page not found</h1>
                <h2 className="mt-3 text-lg font-medium">Sorry, the page you are looking for cannot be found.</h2>
                <div className="flex gap-20 ml-8">
                <button className="flex gap-3 mt-10 bg-palette-404 w-[135px] h-8 rounded text-black mb-7 p-5 font-semibold hover:bg-palette-line items-center justify-center">
                <GoArrowLeft size={20}/>Go back</button>
                <button className="flex gap-3 mt-10 bg-black w-[150px] h-8 p-5 rounded text-white mb-7 font-semibold hover:bg-palette-darkLight items-center justify-center">Take me home</button>
                </div>
                  
              </div>
                
            </div>
          </div>
        </div>
      )
}