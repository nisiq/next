import { DataExpandedRow, Status } from "@/lib/types";
import TableRow from "./TableRow";

interface ITasksTable {
    tasks: DataExpandedRow[]
}

export default function TasksTable({ tasks }: ITasksTable) {
    let rows: any = {};

    tasks.forEach((task: DataExpandedRow) => {
        if (!rows[task.project]) {
            rows[task.project] = {
                project: task.project,
                rows: [task]
            };
        } else {
            rows[task.project].rows.push(task);
        }
    });

    const rowsArray = Object.values(rows);

    return (
        <>
            <div className="flex flex-col mt-6">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="rounded-md max-h-[450px] 2xl:max-h-[710px]">
                            <table className="w-full ">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs text-center font-medium text-gray-500 uppercase tracking-wider"
                                        >

                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            TÍTULO
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            RESPONSÁVEL
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            STATUS
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            PRAZO
                                        </th>
                                    </tr>
                                </thead>
                                {rowsArray.map((project) => (
                                    <TableRow key={project.project} title={project.project} id="4" data={project.rows} />
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}