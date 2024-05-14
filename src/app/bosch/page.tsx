'use client'
 
import Header from "@/components/Header"
import RoomCard from "@/components/RoomCard"
import New from "@/components/RoomCard/new"
import { useState } from "react";
import Modal from "@/components/Modal";
import CreateClassForm from "@/components/Forms/CreateClassForm";
 
export default function Rooms() {
    const [showModal, setShowModal] = useState<boolean>(false);
 
    return (
        <div className="w-full h-full">
            <Header title="Turmas" userImg="" status={false} />
            <div className="w-[95%] h-full m-2">
                <h1 className="text-sm text-center text-gray-500">Favoritadas</h1>
                <div className="w-full h-full">
                    <RoomCard />
                </div>
                <hr className="border-gray-300 border-1" />
                <h1 className="text-sm text-center text-gray-500 m-2">Outras</h1>
                <div className="flex">
                    <New onClick={() => setShowModal(true)} />
                    <RoomCard />
                </div>
            </div>
            <Modal isVisible={showModal} onClose={() => setShowModal(false)} title="Adicionar nova turma" titleColor="text-palette-sea-green">
                <CreateClassForm setShowModal={setShowModal} />
            </Modal>
        </div>
    )
}