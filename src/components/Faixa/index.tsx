'use client'

import React, { useState, useRef, useEffect } from "react";
import { Avatar, Button } from "@material-tailwind/react";
import { CloudArrowUpIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import FormInput from "../FormInput";
import ButtonIcon from "../ButtonIcon";
import { BlockPicker, ColorResult } from "react-color";

export default function Faixa() {
  const [hovered, setHovered] = useState<boolean>(false);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [divColor, setDivColor] = useState<string>(localStorage.getItem("divColor") || "#eeeeee");
  const blockPickerRef = useRef<HTMLDivElement>(null);
  const [ShowDetail, setShowDetail] = useState(false)


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (blockPickerRef.current && !blockPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleColorChange = (color: ColorResult) => {
    const newColor: string = color.hex;
    setDivColor(newColor);
    localStorage.setItem("divColor", newColor);
  };

  return (
    <div className="relative">
      <div
        className="h-48 w-full bg-[#eeeeee] ml-[-15px]  rounded shadow-md z-10 relative"
        style={{ backgroundColor: divColor }}
      >
        <button
          className="flex absolute bottom-2 right-2"
          onClick={() => setShowColorPicker(!showColorPicker)}
        >
          <PencilSquareIcon className="h-5 w-5" />
        </button>
      </div>

      <Avatar placeholder={"Nothing"} src="https://flowbite.com/application-ui/demo/images/users/roberta-casas.png" alt="Avatar" className="absolute border-2 border-white top-[6em] left-2 z-20 h-[12em] w-[12em]" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />

      <div className="h-full w-full z-10 px-4 py-2 relative">
        <h1 className="ml-[11em] mt-4 font-semibold text-xl text-[#000000]">Tiffany Bittencourt</h1>
        <button
          className="flex flex-row ml-[14em] mt-3 rounded-2xl gap-2 items-center justify-center h-auto p-2 border-[1px] border-[#007BC0] hover:bg-[#007BC0]">
          <CloudArrowUpIcon width={20} height={20} color={hovered ? "#ffffff" : "#007BC0"} />
          <h1 className="text-center text-sm font-medium text-[#007BC0] hover:text-white">Upload foto</h1>
        </button>
        <div className="mt-8 w-[70%] ml-[14em]">
          <FormInput labelText="Nome" />
          <FormInput labelText="Turma" />
          <FormInput labelText="E-mail" />
          <FormInput labelText="EDV" />
          <FormInput labelText="Senha" />
          <FormInput labelText="Confirmação de senha" />
          <div className="flex flex-row gap-4 ">
            <ButtonIcon icon={undefined} onClick={()=> console.log("oi")} color={"bg-[#007BC0]"} title={"Confirmar dados"} colorHover="bg-[#]" />
            <button className="flex flex-row w-auto h-auto font-medium my-2">
              <div className={`bg-[#f4f4f4] flex items-center justify-center p-2 px-3 gap-1 content-center rounded`}>
                <h1 className='text-center text-[#007BC0] font-inter '>
                  Cancelar
                </h1>
              </div>
            </button >
          </div>
        </div>
      </div>
      {showColorPicker && (
        <div ref={blockPickerRef} className="absolute top-52 right-2 z-30">
          <BlockPicker
            color={divColor}
            onChange={handleColorChange}
          />
        </div>
      )}
    </div>
  );
}
