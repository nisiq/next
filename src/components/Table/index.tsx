import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    IconButton,
    Tooltip,
    Typography
} from "@material-tailwind/react";

const TABS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Monitored",
        value: "monitored",
    },
    {
        label: "Unmonitored",
        value: "unmonitored",
    },
];

const TABLE_HEAD = ["Nome", "Classe", "Último Login", "Permissão", "", ""];

type row = {
    img: string,
    name: string,
    email: string,
    job: string,
    permission: string,
    date: string
}

interface TableContent {
    rows: row[]
}

export default function Table(props: TableContent) {
    return (
        <div className="">
            <Card className="h-full  pr-10 " placeholder="">
                <CardBody className="overflow-hidden  px-0" placeholder="">
                    <table className="
                     w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={`${head}-${Math.floor(Math.random() * 9)}`}
                                        className="border-y border-blue-gray-50 bg-[#F5F5F5] p-4"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-semibold leading-none opacity-70"
                                            placeholder=""
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {props.rows.map(
                                ({ img, name, email, job, permission, date }, index) => {
                                    const isLast = index === props.rows.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={`${name}-${date}-${email}`}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <Avatar src={img} alt={name} size="sm" placeholder="" />
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal "
                                                            placeholder=""
                                                        >
                                                            {name}
                                                        </Typography>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal opacity-60"
                                                            placeholder=""
                                                        >
                                                            {email}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal text-[#8b8b8b]"
                                                        placeholder=""
                                                    >
                                                        {job}
                                                    </Typography>
                                                </div>
                                            </td>

                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal text-[#8b8b8b]"
                                                    placeholder=""
                                                >
                                                    {date}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <div className="w-max">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal text-[#8b8b8b]"
                                                        placeholder=""
                                                    >
                                                        {permission}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Tooltip className='bg-[#323232]' animate={{
                                                    mount: { scale: 1, y: 0 },
                                                    unmount: { scale: 0, y: 25 },
                                                }} content="Edit User">
                                                    <IconButton variant="text" placeholder="">
                                                        <PencilSquareIcon color="#858585" className="h-5 w-5" />
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                            <td className={classes}>
                                                <Tooltip className='bg-[#000000]' animate={{
                                                    mount: { scale: 1, y: 0 },
                                                    unmount: { scale: 0, y: 25 },
                                                }} content="Delete User" >
                                                    <IconButton variant="text" placeholder="">
                                                        <TrashIcon color="#858585" className="h-5 w-5 " />
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4" placeholder="">
                    <Typography variant="small" color="blue-gray" className="font-normal text-[#8b8b8b]" placeholder="">
                        Page 1 of 10
                    </Typography>
                    <div className="flex gap-2">
                        <Button variant="outlined" className="border-[1px] border-[#9E2896] text-[#9E2896] bg-transparent" size="sm" placeholder="">
                            Previous
                        </Button>
                        <Button variant="outlined" className="bg-[#9E2896] border-0 text-white" size="sm" placeholder="">
                            Next
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>

    );
}