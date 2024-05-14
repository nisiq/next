'use client';
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FiTable } from "react-icons/fi";
import { PiKanban } from "react-icons/pi";
import ButtonIcon from "../ButtonIcon";
import CreateTaskForm from "../Forms/createTaskForm";
import Modal from "../Modal";
import TasksTable from "../TasksTable";
import KanbanBoard from "../KanbanBoard";
import { DataExpandedRow } from "@/lib/types";


interface ITasksCard {
    data: DataExpandedRow[]
}

export default function TasksCard({data}: ITasksCard) {

    const [tableVisualization, setTableVisualization] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const inactiveStyle = "bg-transparent border-[#7B7B7B]";

    const handleVisualization = () => {
        setTableVisualization(!tableVisualization);
    }

    return (
        <div>
            <div className="mt-4 select-none">
                <article className="flex gap-6 justify-between pr-10 pl-2 items-center">
                    <div className="flex gap-6">
                        <button onClick={() => { tableVisualization ? '' : handleVisualization() }} className={`flex w-auto h-auto justify-center items-center gap-2 p-4 py-0.5 rounded-lg ${tableVisualization ? "bg-palette-pink border-palette-pink" : inactiveStyle} border-solid border-[2px]`}>
                            <FiTable color={`${tableVisualization ? '#fff' : '#7B7B7B'}`} size={18} />
                            <p className={`font-medium ${tableVisualization ? "text-white" : "text-[#7B7B7B]"} `}>Table</p>
                        </button>
                        <button onClick={() => { !tableVisualization ? '' : handleVisualization() }} className={`flex w-auto h-auto justify-center items-center gap-2  p-4 py-0.5 rounded-lg ${!tableVisualization ? "bg-palette-blue border-palette-blue" : inactiveStyle} border-solid border-[2px]`}>
                            <PiKanban color={`${!tableVisualization ? '#fff' : '#7B7B7B'}`} size={20} />
                            <p className={`font-medium ${!tableVisualization ? "text-white" : "text-[#7B7B7B]"} `}>Status</p>
                        </button>
                    </div>
                    <ButtonIcon color="bg-palette-blue" title="Nova Task" onClick={() => setShowModal(true)} icon={<CiCirclePlus size={25} color="#FFF" />} colorHover={" hover:bg-sky-700"} />
                </article>

                <div className="pr-10 pl-2">
                    {tableVisualization ? (
                        <TasksTable tasks={data}/>
                    ) : (
                        <KanbanBoard />
                    )}
                </div>
            </div>

            <Modal isVisible={showModal} onClose={() => setShowModal(false)} title="Adicionar nova Task" titleColor="text-palette-pink">
                <CreateTaskForm setShowModal={setShowModal} />
            </Modal>

        </div>
    );
}