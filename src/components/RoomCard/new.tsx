import { FaPlus } from "react-icons/fa6";

interface IButtonRoom{
    onClick: () => void
}

export default function New({onClick}: IButtonRoom) {
    return (
        <div className="w-[15em] m-10">
            <button onClick={onClick} className="w-[15em] h-[15em]  border-gray-300 border-2 border-dashed rounded items-center justify-center flex">
                <div>
                    <div className="ml-[20%]">
                        <FaPlus color="#E0E0E0" className="w-20 h-20" />
                    </div>

                    <div>
                        <h1 className="font-semibold text-gray-300 text-sm">Adicionar nova turma</h1>
                    </div>
                </div>
            </button>
        </div>
    )
}