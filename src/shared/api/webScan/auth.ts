import { apiInstance, Response } from "./_base";

const CONTROLLER = "auth";
const METHOD = {
  LOGIN: "login",
  CREATE: "create",
  LOGOUT: "logout",
  STATUS: "status",
};

const fetchAuth = apiInstance(CONTROLLER);

export type LoginArgs = { login: string; password: string };
export const login = async (args: LoginArgs): Promise<Response<string>> => {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      localStorage.setItem("token", "TOKEN");
      resolve({ status: "success", data: "TOKEN" });
      clearTimeout(timeout);
    }, 2000);
  });
  // return await fetchAuth({ [METHOD.LOGIN]: args });
};

export type CreateArgs = { login: string; password: string };
export const create = async (args: CreateArgs): Promise<Response<string>> => {
  return await fetchAuth({ [METHOD.CREATE]: args });
};

export const logout = async () => {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      localStorage.setItem("token", "");
      resolve({ status: "success" });
      clearTimeout(timeout);
    }, 2000);
  });
  // return await fetchAuth({ [METHOD.LOGOUT]: {} });
};

export const status = async () => {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve({ status: "success", data: "authorized" });
      clearTimeout(timeout);
    }, 2000);
  });
  // return await fetchAuth({ [METHOD.STATUS]: {} });
};
