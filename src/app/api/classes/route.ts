import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "../../../utils/sessionTokenAccessor";
import { createClassSchema } from "@/lib/types";
import { sessionLogout } from "@/utils/handles/logout";
import { signOut } from "next-auth/react";

export async function POST(req: NextRequest) {
  const body = await req.json()
  const token = await getAccessToken();
  let success = false;
  const result = createClassSchema.safeParse(body);

  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      console.log(issue)
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  }

  let dataZod = result.data;
  const postBody: object = {
    name: "Digital Solutions",
    ...dataZod,
  }

  if (result.success) {
    const url = `${process.env.CLASS_URL}/turmas/`;

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
        console.log(JSON.stringify(postBody))
        console.log(resp.body)
      if (data.message == 'Token expirado') {
        sessionLogout().then(() => {
          signOut({ callbackUrl: "/" });
        });
      }
    }
 }


  return NextResponse.json(
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: success }
  );
}

