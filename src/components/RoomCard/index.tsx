"use client";
import Image from "next/image";
import { useState } from "react"
import userImage from '@/../public/card_instructors/user.svg'
import calendarImage from '@/../public/card_instructors/calendar.svg'
import clockImage from '@/../public/card_instructors/clock.svg'
import starImage from '@/../public/card_instructors/star.svg'
import solidStarImage from '@/../public/card_instructors/star_solid.svg'

function RoomCard() {
    const [fav, setFav] = useState(false);

    return (
        <article className="select-none border-transparent border-2">
            <div className="before:content-['DS_10'] absolute ml-[4.3%] w-[55px] h-[55px] bg-palette-sea-green rounded-full z-10 mt-2.5 flex justify-center items-center text-light font-semibold shadow-lg shadow-[#6A6A6A]"></div>
            <div className="w-60 h-3/2 p-3 mb-7 bg-palette-card rounded-lg m-10 relative pt-5">

                <div className="m-3">
                    <h1 className="font-bold text-palette-font">DIGITAL SOLUTIONS</h1>
                    <hr className="h-px my-3 bg-palette-line border-0" />

                    <div className="flex items-center mt-6">
                        <Image alt="instrutor nome" src={userImage} className="w-6 " />
                        <h2 className="font-semibold text-palette-font ml-4 text-base">Leonardo Oliveira</h2>
                    </div>
                    <div className="flex items-center mt-5">
                        <Image alt="data" src={calendarImage} className="w-6" />
                        <h2 className="font-semibold text-palette-font ml-4 text-base">Iniciou 01/06/2024</h2>
                    </div>
                    <div className="flex items-center mt-5">
                        <Image alt="periodo da turma icon" src={clockImage} className="w-6" />
                        <h2 className="font-semibold text-palette-font ml-4 text-base">Manhã</h2>
                    </div>
                    <div className="right-5 cursor-pointer absolute bottom-3">
                        <Image alt="icon favorite" src={!fav ? starImage : solidStarImage } onClick={() => setFav(!fav)} />
                    </div>

                </div>
            </div>
        </article>

    );
}

export default RoomCard;