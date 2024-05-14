'use client'

import React, { useState } from "react";
import { Avatar } from "@material-tailwind/react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Modal from "../Modal";
import CreateGroupForm from "../Forms/CreateGroupForm";

interface ClassesProps {
  classCurrent: string;
  onSelectTeam: (teamName: string) => void; 
}

const SideBarClasses: React.FC<ClassesProps> = ({ classCurrent, onSelectTeam }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const selectItem = (teamName: string) => {
    onSelectTeam(teamName);
  };

  const items = [
    "TEF7 - João e Maria",
    "PS - Pedro e Ana",
    "GS/TET3 - Julia e Caio",
  ];

  return (
    <nav className="fixed h-full border-r-[1px] border-[#d3d3d3] w-56 px-1 py-2 flex flex-col justify-between">
      <div className="flex flex-col gap-3 justify-start items-start">
        <Link
          href={"/apprentice/diario"}
          className={"flex items-center justify-center"}
        >
          <ChevronLeftIcon className="h-4 w-4 " />
          <h1 className="text-xs font-medium">Todas as equipes</h1>
        </Link>
        <Avatar
          placeholder={""}
          variant="rounded"
          className="h-[6em] w-[6em] mt-6 bg-palette-sea-green"
        />
        <h1 className="font-semibold mt-6">{classCurrent}</h1>
        <hr className="w-full border-t-[1px] border-[#d3d3d3]" />

        <button
          className="text-left text-sm flex text-pallete-font w-full font-medium hover:text-[#000000]"
          onClick={toggleAccordion}
        >
          <ChevronDownIcon className="mt-[3px] h-4 w-4 mr-4" />
          Duplas por área
        </button>

        {isOpen && (
          <div className="ml-4 mt-2">
            <ul>
              {items.map((item, index) => (
                <li
                  onClick={() => selectItem(item)}
                  className={
                    "font-medium p-2 cursor-pointer rounded hover:bg-[#efefef] w-full text-palette-gray text-sm mb-[1px]"
                  }
                  key={index}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button className="pb-5 flex flex-row" onClick={() => setShowModal(true)}>
        <PlusIcon color={"#3E3E3E"} className="h-4 w-4 mr-3" />
        <h1 className="text-sm text-palette-font mb-[1px] font-medium">Nova equipe</h1>
      </button>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)} title="Adicionar novo grupo" titleColor="text-palette-sea-green">
          <CreateGroupForm setShowModal={setShowModal} />
        </Modal>
    </nav>
  );
};

export default SideBarClasses;