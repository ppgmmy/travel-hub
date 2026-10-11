import { io } from "next/cache";
import { getHongKongToday } from "./dates";

export async function getRequestHongKongToday(): Promise<string> {
  await io();
  return getHongKongToday();
}
