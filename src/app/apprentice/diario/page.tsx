"use client";

import ButtonIcon from "@/components/ButtonIcon";
import Filter from "@/components/Filter";
import CreateRegForm from "@/components/Forms/CreateRegForm";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { PaginationRegister } from "@/components/PaginationRegister";
import Register from "@/components/RegisterCard";
import Search from "@/components/Search";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Diario = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    
    const registerData = [
        { id: 1, title: "Registro 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusenim ad minim veniam, quis nostrud exercitationascsae", date: "01/02/2024" },
        { id: 2, title: "Registro 2", description: "Conteúdo do registro 2", date: "01/02/2024" },
        { id: 3, title: "Registro 3", description: "Conteúdo do registro 3", date: "01/02/2024" },
        { id: 4, title: "Registro 1", description: "Conteúdo do registro 1", date: "01/02/2024" },
        { id: 5, title: "Registro 2", description: "Conteúdo do registro 2", date: "01/02/2024" },
        { id: 6, title: "Registro 3", description: "Conteúdo do registro 3", date: "01/02/2024" },
    ];

    return (
        <>
            <Header title={"Registros"} userImg={"bg-[url('/avatar.jpg')]"} status={false} />
            <div className="flex justify-center items-center my-12">
                <div className="pl-6 flex justify-center items-center gap-72">
                    <Search />
                    <div className="flex gap-8 mr-10">
                        <Filter />
                        <ButtonIcon
                            color="bg-palette-blue"
                            icon={<PlusIcon className="h-5 w-5 ml-1 text-white" />}
                            onClick={() => setShowModal(true)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-12 justify-center items-center mt-3">
                {registerData.map(
                    (data, index) =>
                        index % 3 === 0 && (
                            <div
                                key={`row_${index}`}
                                className="flex flex-row gap-12 justify-center items-center"
                            >
                                {registerData.slice(index, index + 3).map((data) => (
                                    <Register
                                        key={data.id}
                                        title={data.title}
                                        description={data.description}
                                        date={data.date}

                                    />
                                ))}
                            </div>
                        )
                )}
                <div className="mb-10 mt-4">
                    <PaginationRegister />
                </div>
            </div>

            <Modal isVisible={showModal} onClose={() => setShowModal(false)} title="Adicionar novo registro" titleColor="text-palette-blue">
                <CreateRegForm setShowModal={setShowModal} />
            </Modal>
        </>
    );
};

export default Diario;