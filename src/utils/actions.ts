"use server";

import { revalidateTag } from "next/cache";

export default async function revalidateTasks() {
  revalidateTag("get-tasks");
}