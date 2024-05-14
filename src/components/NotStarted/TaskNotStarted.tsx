import React from "react";
import { Avatar } from "@material-tailwind/react";
import { CiCircleAlert } from "react-icons/ci";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface TaskNotStartedProps {
    number: string;
}

const TasksNotStarted: React.FC<TaskNotStartedProps> = ({
    number,
}) => {
    return (
        <div className="w-[22%] flex items-center justify-center">
            <div className="w-full rounded-md bg-gradient-to-r from-[#ED0007] to-[#ED0007] pt-1">
                <div className="flex flex-col h-full w-full p-3 justify-center bg-[#F2F2F2]">
                    <div className="flex justify-between items-center">
                        <h1 className="font-semibold text-start text-base">Tasks não iniciadas</h1>
                        <Link href={"/apprentice/tasks"}><ArrowRightIcon onClick={() => console.log("oi")} className="h-3 cursor-pointer w-3 hover:text-[#ED0007]" /></Link>
                    </div>


                    <div className="flex flex-row gap-2 justify-center items-center mt-11 mb-11">
                        <CiCircleAlert className="text-[#ED0007]" size={40} />
                        <h2 className="text-[#ED0007] font-bold text-center text-5xl">
                            30
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TasksNotStarted;