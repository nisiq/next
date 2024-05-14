import { Status } from "@/lib/types"

interface IStatusBadge {
    status: string
}


export default function StatusBadge({status}: IStatusBadge) {

    const spanClassesStart = "text-[#ED0007]"
    const spanClassesProgress = "text-[#FCB917]"
    const spanClassesDone = "text-[#46B03C]"

    const divClassesStart = "bg-[#FCD6D7]"
    const divClassesProgess = "bg-[#EFDEB5]"
    const divClassesDone = "bg-[#C1F3BC]"

    return (
        <div className={`px-6 py-2 max-w-36 w-[100%] m-auto rounded ${status == "Finalizado" ? divClassesDone : status == "Em desenvolvimento" ? divClassesProgess : divClassesStart}`}>
            <span className={`font-semibold ${status == "Finalizado" ? spanClassesDone : status == "Em desenvolvimento" ? spanClassesProgress : spanClassesStart}`}>
                {status == "Finalizado" ? 'Finished' :
                    status == "Em desenvolvimento" ? 'In progress' :
                        'To start'}
            </span>
        </div>
    )

}