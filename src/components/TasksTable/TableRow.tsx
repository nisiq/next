'use client';
import { ITableRow } from "@/lib/types";
import { useState } from "react";
import { FaRegFolder } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import StatusBadge from "./StatusBadge";
import Image from "next/image";


export default function TableRow({ title, id, data }: ITableRow) {
    const [open, setOpen] = useState<boolean>(false);

    const urlImage = "https://ui-avatars.com/api/?background=random&name="

    function formatDate(dataOriginal: string): string {
        var data = new Date(dataOriginal);

        var dia = data.getDate();
        var mes: string | number = data.getMonth() + 1; 
        mes = mes.toString().length == 1 ? "0" + mes.toString() : mes;  
        var ano = data.getFullYear();

        return dia + '/' + mes + '/' + ano;
    }


    return (
        <tbody>
            <tr className="border-gray-100 hover:bg-gray-100 mt-4">
                <td className="px-6 py-4 whitespace-nowrap text-sm w-20 font-medium text-gray-600">
                    {id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold w-96  text-[#616161]">
                    <span className="flex gap-3 items-center">{
                        open ? <IoIosArrowDown size={18} color="gray" onClick={() => setOpen(false)} /> : <IoIosArrowForward size={18} color="gray" onClick={() => setOpen(true)} />
                    } <FaRegFolder size={15} color="gray" /> <span>{title}</span></span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-60 text-center">

                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">

                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-52 text-center">

                </td>
            </tr>

            {open && data.map(row => (
                <tr className="border-gray-100 hover:bg-gray-100 duration-500 transition-all" key={row.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-xs w-20 font-medium text-[#666666]">
                        {id}.{toString(row._id).substring(1, 3)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm w-96 font-medium text-left pl-24 text-gray-900">
                        {row.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center w-60 text-gray-500">
                        <div className="flex gap-3 items-center pl-10">
                            <div className="rounded-[50%] border">
                                <Image src={`${(urlImage + row.responsible + '/')}`} width={35} height={35} alt={`Username for ${row.responsible}`} className="rounded-full" />
                            </div>
                            {row.responsible}
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                        <StatusBadge status={row.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center w-52 text-gray-500">
                        {formatDate(row.date_due)}
                    </td>
                </tr>
            ))}
        </tbody>
    )
}