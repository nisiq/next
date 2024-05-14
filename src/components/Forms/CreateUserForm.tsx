import { TCreateClassSchema } from "@/lib/types";
import { FieldValues, useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";
import { Switch } from "@material-tailwind/react";



export default function CreateUserForm({ setShowModal }: any) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<TCreateClassSchema>();

    const onSubmit = async (data: FieldValues) => {
        const response = await fetch('/api/users', {
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

        if (responseData.success) {
            setShowModal(false);
            toast('Usuário Registrada com sucesso!', {
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
        <form id="formUserCreate" onSubmit={handleSubmit(onSubmit)} className="p-8 py-4 flex flex-col justify-items-start ">
            <div>
                <div className={`w-full flex flex-col mb-4 lg:mb-2`}>
                    <label className={`text-md font-semibold text-start`}>Nome</label>
                    <input type={"text"} className={`rounded h-9 p-2 border border-palette-line`} />
                </div>
            </div>

            <div className={`w-full flex flex-col mb-4 lg:mb-2`}>
                <label className={`text-md font-semibold text-start`}>Turma</label>
                <input type={"text"} className={` rounded h-9 p-2 border border-palette-line`} />
            </div>

            <div className={`w-full flex flex-col mb-4 lg:mb-2`}>
                <label className={`text-md font-semibold text-start`}>E-mail</label>
                <input type={"text"} className={`rounded h-9 p-2 border border-palette-line`} />
            </div>

            <div className={`w-full flex flex-col mb-4 lg:mb-2`}>
                <label className={`text-md font-semibold text-start`}>Instrutor</label>
                <Switch className="h-full w-full border-[1px] border-palette-line bg-white bg-none checked:bg-palette-pink rm-bg"
                    containerProps={{
                        className: "w-12 h-6 appearance-none",
                    }}
                    circleProps={{
                        className: "bg-[#d9d9d9] before:hidden left-0.5 border-none",
                    }} ripple={true} />
            </div>

            <div className={`w-full flex flex-col mb-4 lg:mb-2`}>
                <label className={`text-md font-semibold text-start`}>Administrador</label>

                <Switch className="h-full w-full appearance-none border-[1px] border-palette-line bg-white checked:bg-palette-pink checked:border-none focus:border-none rm-bg"
                    containerProps={{
                        className: "w-12 h-6",
                    }}
                    circleProps={{
                        className: "bg-[#d9d9d9] before:hidden left-0.5 border-none",
                    }} ripple={true} />
            </div>



            <div className="flex gap-8 mt-4 items-center">
                <button type="submit" className="bg-palette-pink px-5 py-2 rounded text-white disabled:opacity-50">
                    {isSubmitting ? 'Carregando...' : 'Adicionar'}
                </button>
                <button onClick={() => { setShowModal(false); }} className="bg-[#F4F4F4] px-5 py-3 rounded text-palette-pink">
                    Cancelar
                </button>
            </div>
        </form>
    );
}