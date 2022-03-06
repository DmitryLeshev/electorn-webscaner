export async function query(
  url: string,
  options?: RequestInit
): Promise<Response> {
  return await fetch(url, options);
}
