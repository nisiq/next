import { FaUserAlt } from "react-icons/fa";

export default function Team() {
    return(
        <div className="bg-teamcolor w-[9em] h-[2em] rounded-full">
            <div className="flex space-x-2 items-center p-1 ml-2">
                <FaUserAlt className="w-[18px] h-[18px]"/>
                <h1 className="text-palette-gray">Fulano de Tal</h1>
            </div>
        </div>
    )
}