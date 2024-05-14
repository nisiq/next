import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { verifySession } from "@/utils/Session";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'

export default async function AuthComponent() {

  // if (! await verifySession()) {
  //   redirect('/login')
  // }

  return;
}