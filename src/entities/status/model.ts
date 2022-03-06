import { createDomain, forward } from "effector";

import { webScanApi } from "shared/api";

const statusDomain = createDomain("StatusDomain");

export type Status = "authorized" | "not-authorized";

const $status = statusDomain.createStore<Status>("authorized");

const changeStatus = statusDomain.createEvent<Status>();

const checkStatusFx = statusDomain.createEffect(webScanApi.auth.status);

forward({
  from: changeStatus,
  to: $status,
});

export const stores = { $status };
export const actions = { changeStatus, checkStatusFx };
