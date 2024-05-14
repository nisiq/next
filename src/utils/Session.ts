'use server';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function verifySession() {
    const session = await getServerSession(authOptions);

    if (!session || session.error == "RefreshAccessTokenError") {
        return false;
    }
    return true;
}

