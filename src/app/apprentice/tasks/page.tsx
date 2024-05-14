import Header from "@/components/Header";
import TasksCard from "@/components/Tasks";
import { getAccessToken } from "@/utils/sessionTokenAccessor";

const Tasks = async () => {

    const url = `${process.env.TASKS_URL}/tasks`;
    let data = [];

    const accessToken = await getAccessToken()

    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
        },
        next: {
            tags: ['get-tasks']
        }
    });

    if (resp.ok) {
        data = await resp.json();
    } else {
        console.log(await resp)
    }
    return (
        <>
            <Header title={"Tasks"} userImg={"bg-[url('/avatar.jpg')]"} status={false} />

            <TasksCard data={data} />
        </>
    );
}

export default Tasks;