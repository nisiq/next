import { TCreateGroupSchema } from "@/lib/types";
import { FieldValues, useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";
import { InputTagBrook } from "../InputTagBrook";
import { useState } from "react";


export default function CreateGroupForm({ setShowModal }: any) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<TCreateGroupSchema>();

    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleTagChange = (tags: string[]) => {
        setSelectedTags(tags);
    };


    const onSubmit = async (data: FieldValues) => {
        const response = await fetch('/api/group', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const responseData = await response.json();
        if (!response.ok) {
            alert("Submitting form failed!");
            return;
        }


        if (responseData.errors) {
            const errors = responseData.errors;
            if (errors.focalpoint) {
                setError("focalpoint", {
                    type: "server",
                    message: errors.focalpoint,
                });
            } else if (errors.area) {
                setError("area", {
                    type: "server",
                    message: errors.area
                });
                // } else if (errors.apprentice) {
                //     setError("apprentice", {
                //         type: "server",
                //         message: errors.apprentice
                //     });
            } else {
                alert("Something went wrong!");
            }
        }

        if (responseData.success) {
            setShowModal(false);
            toast('Equipe Registrado com sucesso!', {
                type: "success",
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                transition: Bounce,
                className: "bg-[#C9FCFF] text-black",
                progressClassName: "bg-palette-sea-green",
                icon: ({ theme, type }) => <FaCheckCircle color="#18837E" />
            });
        }
    }

    return (
        <form id="formGroupCreate" onSubmit={handleSubmit(onSubmit)} className="p-8 py-4 flex flex-col justify-items-start ">
            <div>
                <div className={`w-full flex flex-col mb-4 lg:mb-2`}>
                    <label className={`text-md font-semibold text-start`}>Aprendiz</label>
                    <InputTagBrook
                        myChange={handleTagChange}
                        buttonColor="palette-sea-green"
                    />
                </div>
            </div>

            <div className={`w-full flex flex-col mb-4 lg:mb-2`}>
                <label className={`text-md font-semibold text-start`}>Padrinho ou madrinha</label>
                <input {...register("focalpoint")} type={"text"} className={`${errors.focalpoint?.message ? 'border border-red-500' : 'border border-palette-line'} bg-gray-50 text-gray-900 text-sm rounded`} />
                {errors.focalpoint && (
                    <small className="text-red-500">{`${errors.focalpoint.message}`}</small>
                )}
            </div>

            <div className={`w-full flex flex-col mb-4 lg:mb-2`}>
                <label className={`text-md font-semibold text-start`}>Área de projetos</label>
                <input {...register("area")} type={"text"} className={`${errors.area?.message ? 'border border-red-500' : 'border border-palette-line'} bg-gray-50 text-gray-900 text-sm rounded`} />
                {errors.area && (
                    <small className="text-red-500">{`${errors.area.message}`}</small>
                )}
            </div>
            <div className="flex gap-8 mt-4 items-center">
                <button type="submit" className="bg-palette-sea-green px-5 py-2 rounded text-white disabled:opacity-50">
                    {isSubmitting ? 'Carregando...' : 'Adicionar'}
                </button>
                <button onClick={() => { setShowModal(false); }} className="bg-[#F4F4F4] px-5 py-2 rounded text-palette-sea-green">
                    Cancelar
                </button>
            </div>
        </form>
    );
}