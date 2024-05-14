"use client";

import Apprentice from "@/components/ApprenticeCard";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Department from "@/components/DepartmentCard";
import TasksNotStarted from "@/components/NotStarted/TaskNotStarted";
import Grafico from "@/components/PieGrafic";
import GanttChart from "@/components/Gantt";
import Filter from "@/components/Filter";
import { DefaultAccordion } from "@/components/AccordionOpen";
import Commits from "@/components/Commits";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export default function Home() {
    const [showModal, setShowModal] = useState<boolean>(false)
    const { data: session, status } = useSession();
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());


    // useEffect(() => {
    //     if (status == "authenticated") {
    //         localStorage.setItem("JWT_TOKEN", JSON.stringify(session?.access_token))
    //     }
    // }, [status]);


    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (status == "loading") {
        return (
            <>
                <Header title={"Dashboard"} userImg={"bg-[url('/avatar.jpg')]"} status={status == "loading"} />
                <div className='flex flex-col justify-center items-center w-full animate-pulse'>
                    <div className='flex items-center justify-center gap-[15em]'>
                        <div className='flex flex-col'>
                            <div className="w-[20vw] h-[8vh] bg-gray-200 rounded-md mt-5"></div>
                            <div className="w-[20vw] h-[8vh] bg-gray-200 rounded-md mt-5"></div>
                        </div>
                        <div className='flex gap-[10em]'>
                            <div className="w-[15vw] h-[20vh] bg-gray-200 rounded-md "></div>
                            <div className="w-[15vw] h-[20vh] bg-gray-200 rounded-md "></div>
                        </div>
                    </div>
                    <div className='flex justify-center items-center gap-16 mt-16'>
                        <div className="w-[30vw] h-[45vh] bg-gray-200 rounded-md "></div>
                        <div className="w-[45vw] h-[45vh] bg-gray-200 rounded-md "></div>
                    </div>
                    <div className='flex flex-col mt-16 my-10 border-[1px] border-gray-300 rounded-md p-4'>
                        <div className='flex space-x-[31em]'>
                            <div className="w-[20vw] h-[2.5vh] bg-gray-200 rounded-md mt-5"></div>
                            <div className="w-[10vw] h-[2.5vh] bg-gray-200 rounded-md mt-5"></div>
                        </div>
                        <div className="w-[20vw] h-[2.5vh] bg-gray-200 rounded-md mt-14"></div>
                        <div className='flex flex-col gap-2 mt-4'>
                            <div className="w-[50vw] h-2.5 bg-gray-200 rounded-full "></div>
                            <div className="w-[48vw] h-2 bg-gray-200 rounded-full "></div>
                            <div className="w-[50vw] h-2.5 bg-gray-200 rounded-full "></div>
                            <div className="w-[30vw] h-2.5 bg-gray-200 rounded-full "></div>
                        </div>
                        <hr className='h-px my-4 mt-8 bg-gray-300 border-0 ' />
                        <div className='my-6'>
                            <div className="w-[20vw] h-[2.5vh] bg-gray-200 rounded-md "></div>
                            <div className='flex flex-col gap-2 mt-4'>
                                <div className="w-[50vw] h-2 bg-gray-200 rounded-full "></div>
                                <div className="w-[48vw] h-2 bg-gray-200 rounded-full "></div>
                                <div className="w-[50vw] h-2 bg-gray-200 rounded-full "></div>
                                <div className="w-[30vw] h-2 bg-gray-200 rounded-full "></div>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    }

    return (
        <>
            <Header title="Dashboard" status={false} userImg="https://flowbite.com/application-ui/demo/images/users/neil-sims.png" />
            <div className="flex gap-14 justify-between pr-10 pl-2 items-center">
                <div className="flex flex-col m-10 gap-6 pr-10 pl-2">
                    <Apprentice classAprentice="Digital Solutions 10" lider={true} name="João Pedro" profile="https://flowbite.com/application-ui/demo/images/users/neil-sims.png" />
                    <Apprentice classAprentice="Digital Solutions 10" lider={false} name="Roberto Simões" profile="https://flowbite.com/application-ui/demo/images/users/neil-sims.png" />
                </div>
                <Department department="TEF 7" focalpoint="Leandro Galvao" profile="https://flowbite.com/application-ui/demo/images/users/neil-sims.png    " />
                <TasksNotStarted />
            </div>
            <div className="flex gap-6 justify-between pr-10 pl-2 items-center">
                <Grafico />
                <GanttChart width={windowDimensions.width} />
            </div>

            <div className="border border-gray-300 flex justify-center pr-10 pl-2 items-center h-[15em] m-5 rounded">
                <Commits year={2024} month={5}/>
            </div>
            <div className="flex justify-end pr-10 pl-2 my-5">
                <Filter />
            </div>

            <div className="border border-gray-300 flex justify-start pr-10 pl-2 items-center my-5 p-4 rounded">
                <div className="m-2 w-full">
                    <h1 className="font-bold text-palette-sea-green">Latest Registration</h1>
                    <DefaultAccordion />
                </div>

            </div>

        </>
    )
}