import { TCreateTaskSchema } from "@/lib/types";
import { FieldValues, useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";
import revalidateTasks from "@/utils/actions";


export default function CreateTaskForm({ setShowModal }: any) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<TCreateTaskSchema>();

    const onSubmit = async (data: FieldValues) => {
        const response = await fetch("/api/tasks", {
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
            if (errors.title) {
                setError("title", {
                    type: "server",
                    message: errors.title,
                });
            }
            else if (errors.date_due) {
                setError("date_due", {
                    type: "server",
                    message: errors.date_due,
                });
            } else if (errors.description) {
                setError("description", {
                    type: "server",
                    message: errors.description,
                });
            } else if (errors.project) {
                setError("project", {
                    type: "server",
                    message: errors.project,
                });
            } else if (errors.responsible) {
                setError("responsible", {
                    type: "server",
                    message: errors.responsible,
                });
            }
            else if (errors.status) {
                setError("status", {
                    type: "server",
                    message: errors.status,
                });
            }

            else {
                alert("Something went wrong!");
            }
        }

        if (responseData.success) {
            setShowModal(false);
            toast('Tarefa Registrada com sucesso!', {
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
        <form id="formTaskCreate" onSubmit={handleSubmit(onSubmit)} className="p-8 py-4 flex flex-col justify-items-start ">
            <div>
                <div className={`w-full flex flex-col mb-4 lg:mb-2`}>
                    <label className={`text-md font-semibold text-start `}>Título da tarefa</label>
                    <input {...register("title")} type={"text"} className={` rounded h-9 p-2 ${errors.title?.message ? 'border border-red-500' : 'border border-palette-line'}`} />
                    {errors.title && (
                        <small className="text-red-500">{`${errors.title.message}`}</small>)}
                </div>
            </div>

            <div className={`w-[45%] flex flex-col mb-4 lg:mb-2`}>
                <label className={`text-md lg:text-sm  font-semibold  text-start`}>Data de entrega</label>
                <input type={"date"} {...register("date_due")} className={` rounded h-9 p-2 ${errors.date_due?.message ? 'border border-red-500' : 'border border-palette-line'}`} />
                {errors.date_due && (
                    <small className="text-red-500">{`${errors.date_due.message}`}</small>
                )}
            </div>

            <div className={` flex flex-col mb-4`}>
                <label className={`text-md font-semibold text-start`}>Responsável</label>
                <select {...register("responsible")} className={`${errors.responsible?.message ? 'border border-red-500' : 'border border-palette-line'} bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
                    <option defaultValue={true} value="NA"></option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                </select>
                {errors.responsible && (
                    <small className="text-red-500">{`${errors.responsible.message}`}</small>
                )}
            </div>

            <div className={` flex flex-col mb-4`}>
                <label className={`text-md font-semibold text-start`}>Status</label>
                <select {...register("status")} className={`${errors.status?.message ? 'border border-red-500' : 'border border-palette-line'} bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
                    <option value="A fazer" defaultValue={true}>To start</option>
                    <option value="Em desenvolvimento">In progress</option>
                    <option value="Finalizado">Done</option>
                </select>
                {errors.status && (
                    <small className="text-red-500">{`${errors.status.message}`}</small>
                )}
            </div>

            <div className={` flex flex-col mb-4`}>
                <label className={`text-md font-semibold text-start`}>Projeto</label>
                <select {...register("project")} className={`${errors.project?.message ? 'border border-red-500' : 'border border-palette-line'} bg-gray-50  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
                    <option value="Projeto pipipo">Projeto pipipo</option>
                    <option value="Projeto real">Projeto real</option>
                </select>
                {errors.project && (
                    <small className="text-red-500">{`${errors.project.message}`}</small>
                )}
            </div>

            <div>
                <label className={`text-md font-semibold text-start`}>Descrição da tarefa</label>
                <textarea {...register("description")} rows={5} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></textarea>
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