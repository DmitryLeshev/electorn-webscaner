import { createDomain, forward } from "effector";
import { setStorage, storages as appStorages, token } from "shared/storages";

const installTheLocalStorage = () => setStorage(appStorages.localStorage);

const tokenDomain = createDomain();

type Token = string | null;

const $token = tokenDomain.createStore<Token>(null);
const getTokenFromStorageFx = tokenDomain.createEffect(() => {
  installTheLocalStorage();
  return token.getToken();
});

forward({
  from: getTokenFromStorageFx.doneData,
  to: $token,
});

const setToken = tokenDomain.createEvent<Token>();
const changeTokenToStorageFx = tokenDomain.createEffect((t: Token) => {
  if (!t) throw "Token not found";
  installTheLocalStorage();
  token.setToken(t);
});

forward({
  from: setToken,
  to: changeTokenToStorageFx,
});

forward({
  from: changeTokenToStorageFx.doneData,
  to: getTokenFromStorageFx,
});

const resetToken = tokenDomain.createEvent();

$token.reset(resetToken);

export const storages = { $token };
export const actions = { setToken, resetToken };
