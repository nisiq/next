'use client'

import Team from "./Team"
import Link from "./Link"
import Categoria from "./Categoria"

const Detail = ({ isVisible, onClose }) => {
    if (!isVisible) return;
    const handleClose = (e) => {
        if (e.target.id === 'wrapper') onClose();
    }
    return (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-15 backdrop-blur-sm flex justify-center items-center" id="wrapper" onClick={handleClose}>
            <div className="border w-[28em] h-[32em] m-10 rounded bg-white" id="wrapper" onClick={handleClose}>
                <div className="flex space-x-[9em] p-4">
                    <h1 className="font-bold text-2xl">Start Process Mapping</h1>
                    <button className="text-lyricsDark" onClick={() => onClose()}>X</button>
                </div>
                <hr className="h-px bg-palette-line border-0 w-[28em] " />
                <div className="p-4 flex space-x-3">
                    <Team />
                    <Team />
                </div>
                <div className="bg-teamcolor w-[26em] h-[13em] m-4">
                    <h2>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                        ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                    </h2>
                    <h1 className="text-sm text-palette-gray mt-4">02/04/2024</h1>
                </div>
                <div className="p-4 flex items-center space-x-[2em]">
                    <Link />
                    <Categoria />
                </div>
                <div>
                    <button className="bg-palette-blue w-[5em] h-[2em] m-4">Lembrar</button>
                </div>
            </div>
        </div>
    )
}

export default Detail;