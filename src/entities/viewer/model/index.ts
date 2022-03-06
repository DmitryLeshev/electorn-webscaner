import { createEvent, createEffect, forward } from "effector";
import { webScanApi } from "shared/api";

export type LoginParams = webScanApi.auth.LoginArgs;

const logIn = createEvent<LoginParams>();
const logOut = createEvent();

const viewerLogInFx = createEffect((params: webScanApi.auth.LoginArgs) =>
  webScanApi.auth.login(params)
);

const viewerLogOutFx = createEffect(() => webScanApi.auth.logout());

forward({
  from: logIn,
  to: viewerLogInFx,
});

forward({
  to: logOut,
  from: viewerLogOutFx,
});

const $logInPending = viewerLogInFx.pending;
const $logOutPending = viewerLogOutFx.pending;

export const effects = { viewerLogInFx, viewerLogOutFx };
export const actions = { logIn, logOut };
export const stores = { $logInPending, $logOutPending };
