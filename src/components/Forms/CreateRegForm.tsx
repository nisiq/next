'use client'
import React from 'react';
import { TCreateRegSchema } from '@/lib/types';
import { FieldValues, useForm } from "react-hook-form";
import { InputTagBrook } from '../InputTagBrook';
import { Bounce, toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";


export default function CreateRegForm({ setShowModal }: any) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<TCreateRegSchema>();

    const onSubmit = async (data: FieldValues) => {
        const response = await fetch("", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
    }


    return (
        <form id="formRegCreate" onSubmit={handleSubmit(onSubmit)} className="p-8 py-4 flex flex-col justify-items-start ">

            <div>
                <div className={`w-full flex flex-col mb-4 lg:mb-2`}>
                    <label className="text-md text-start font-semibold text-palette-blue">Título do Registro</label>
                    <input {...register("title")} type={"text"} className={`rounded h-9 p-2 ${errors.title?.message ? 'border border-red-500' : 'border border-pallete-line'}`} />
                    {errors.title && (
                        <small className='text-red-500'>{`${errors.title.message}`}</small>)}
                </div>
            </div>

            <div className={`w-[100%] flex flex-col mb-4 lg:mb-2`}>
                <label className="text-md text-start font-semibold text-palette-blue lg:text-sm">Data</label>
                <input
                    type={"date"} {...register("date")} className={`rounded h-9 p-2 ${errors.date_due?.message ? 'border border-red-500' : 'border border-pallete-line'}`}
                />
                {errors.date && (
                    <small className='text-red-500'>{`${errors.date.message}`}</small>
                )}
            </div>

            <div className={`flex flex-col mb-4`}>
                <label className="text-md text-start font-semibold text-palette-blue">Participantes</label>
                <InputTagBrook buttonColor='palette-blue' myChange={function (value: string[]): void {
                    throw new Error('Function not implemented.');
                }} {...register("participants")}
                    name="participants"
                    className={`${errors.participants?.message ? 'border border-red-500' : 'border-pallete-line'}`}
                />
                {errors.participants && (
                    <small className='text-red-500'>{`${errors.participants.message}`}</small>
                )}
            </div>


            <div className={`flex flex-col mb-4 lg:mb-2`}>
                <label className="text-md text-start font-semibold text-palette-blue">Descrição</label>
                <textarea
                    {...register("description")}
                    rows={5}
                    className="bg-white text-gray-900 text-sm rounded-md p-2 border-gray-300 border "
                    name="description"
                ></textarea>
            </div>


            <div className="flex flex-wrap mb-4 lg:mb-2">
                <div className={`w-[50%] lg:w-1/2 pr-2 lg:pr-2 mb-4 lg:mb-0`}>
                    <label className="text-md text-start font-semibold text-palette-blue">URL</label>
                    <input
                        {...register("url")}
                        type={"text"}
                        className='bg-white text-gray-900 text-sm rounded-md block w-full p-2.5 border-gray-300 border '
                        name="url"
                    />
                </div>

                <div className={`w-[50%] lg:w-1/2 pl-0 lg:pl-2 flex flex-col`}>
                    <label className="text-md text-start font-semibold text-palette-blue">Ação Principal</label>
                    <select
                        {...register("action")}
                        className={`${errors.action?.message ? 'border border-red-500' : 'border-pallete-line'} `}
                        name="action"

                    >
                        <option value="Desenvolvimento">Desenvolvimento</option>
                        <option value="Fluxograma">Fluxograma</option>
                        <option value="Apresentação">Apresentação</option>
                        <option value="Pesquisa">Pesquisa</option>
                        <option value="Dashboard">Dashboard</option>
                    </select>
                </div>
            </div>

            <div className="flex gap-8 mt-4 items-center">
                <button type="submit" className="bg-palette-blue px-5 py-2 rounded text-white disabled:opacity-50">
                    {isSubmitting ? 'Carregando...' : 'Adicionar'}
                </button>
                <button className="bg-[#F4F4F4] px-5 py-2 rounded text-palette-blue">
                    Cancelar
                </button>
            </div>
        </form>
    );
};
