// const lastActivity = new Date().getTime();

import { query } from "./query";
import { message } from "./message";
import { errorСhecking } from "./error";

export async function send(url: string, options?: RequestInit) {
  const res = await query(url, options);
  errorСhecking(res);
  return await message(res);
}
