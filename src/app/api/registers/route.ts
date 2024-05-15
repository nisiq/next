import { NextRequest, NextResponse } from "next/server";
import { getAccessToken, getUserGroupId } from "../../../utils/sessionTokenAccessor";
import { createRegSchema, createTaskSchema } from "@/lib/types";
import { sessionLogout } from "@/utils/handles/logout";
import { signOut } from "next-auth/react";
import { error } from "console";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const token = await getAccessToken();
    const group_id = await getUserGroupId();
    let success = false;
    const result = createRegSchema.safeParse(body);

    let zodErrors = {};
    if (!result.success) {
        result.error.issues.forEach((issue) => {
            console.log(issue)
            zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
        });
    }

    let dataZod = result.data;
    const postBody: object = {
        ...dataZod,
        group_id
    }
    console.log(postBody)
    if (result.success) {
        const url = `${process.env.REGISTERS_URL}/registros/`;

        const resp = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            method: "POST",
            body: JSON.stringify(postBody),
        });

        const data = await resp.json();

        if (resp.ok) {
            success = true;
        } else {
            if (data.message == 'Token expirado') {
                sessionLogout().then(() => {
                    signOut({ callbackUrl: "/login"});
                });
            }
        }
    }

    return NextResponse.json(
        Object.keys(zodErrors).length > 0
        ? { errors: zodErrors }
        : { success: success }
    )
}