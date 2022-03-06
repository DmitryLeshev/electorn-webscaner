export function errorСhecking(res: Response) {
  if (res.status !== 200) throw new Error(`Status Code: ${status}`);
  return res;
}
