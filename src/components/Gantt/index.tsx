import { useState } from 'react';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";

interface IGanttChart {
    width: number;
}

export default function GanttChart({ width }: IGanttChart) {
    const [viewMode, setViewMode] = useState(ViewMode.Month);

    const onViewModeChange = (mode: ViewMode) => {
        setViewMode(mode);
    };

    // Omit<Task, 'start' | 'end'>[] = [

    const tasks: Task[] = [
        {
            start: new Date(2024, 1, 1),
            end: new Date(2024, 1, 2),
            name: 'SSO',
            id: "1",
            type: 'task',
            progress: 26,
            isDisabled: true,
            styles: { progressColor: '#18837E', progressSelectedColor: '#ff9e0d' },
        },

        {
            start: new Date(2024, 4, 6),
            end: new Date(2024, 4, 9),
            name: 'API tasks',
            id: "2",
            type: 'task',
            progress: 45,
            isDisabled: true,
            styles: { progressColor: '#18837E', progressSelectedColor: '#ff9e0d' },
        },

        {
            start: new Date(2024, 4, 1),
            end: new Date(2024, 4, 3),
            name: 'Login',
            id: "3",
            type: 'task',
            progress: 70,
            isDisabled: true,
            styles: { progressColor: '#9E2896', progressSelectedColor: '#ff9e0d' },
        },

        {
            start: new Date(2024, 4, 5),
            end: new Date(2024, 4, 7),
            name: 'Componentes',
            id: "4",
            type: 'task',
            progress: 100,
            isDisabled: true,
            styles: { progressColor: '#9E2896', progressSelectedColor: '#ff9e0d' },
        },


    ];

    const columns = []


    return (
        <div className='border border-gray-300 h-[30em] rounded flex flex-col justify-center px-4'>
            <div>
                <h1 className='font-bold text-2xl text-palette-gray mb-4'>Cronograma de Tasks</h1>
            </div>

            <div>
                <button onClick={() => onViewModeChange(ViewMode.Month)} className='bg-palette-pink w-[70px] h-[30px] text-white font-semibold rounded'>Month</button>
            </div>

            <div className='font-bold pt-3'>
                <Gantt
                    tasks={tasks}
                    viewMode={viewMode}
                    listCellWidth=''
                    fontSize={width == 1920 ? '12' : '9'}
                    columnWidth={width == 1920 ? 70 : 43}
                />
            </div>
        </div>
    )
}