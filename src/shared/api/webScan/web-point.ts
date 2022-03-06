import { SECOND } from "shared/constans";

import { apiInstance, Response } from "./_base";
import { WebPoint } from "./models";
import { webPointMockData } from "./mock";

const CONTROLLER = "web_point";
const METHODS = {
  GET_ALL: "get_all",
  NEW_SCAN: "new_scan",
};

const fetch = apiInstance(CONTROLLER);

export const getAll = async (): Promise<Response<WebPoint[]>> => {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve({ status: "success", data: webPointMockData });
      clearTimeout(timeout);
    }, SECOND * 2);
  });
  //   return await fetch({ [METHODS.GET_ALL]: {} });
};

export type NewScanArgs = {
  webPointId: number;
  url: string;
};
export const newScan = async (
  args: NewScanArgs
): Promise<Response<WebPoint[]>> => {
  return await fetch({ [METHODS.NEW_SCAN]: args });
};
