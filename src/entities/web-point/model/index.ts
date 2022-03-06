import { createDomain, forward, sample } from "effector";
import { createGate } from "effector-react";

import { webScanApi } from "shared/api";

export type WebPoint = webScanApi.models.WebPoint;

const WebPointGate = createGate();

const webPointDomain = createDomain();

const $listWebPoints = webPointDomain.createStore<WebPoint[]>([]);
const getListWebPointsFx = webPointDomain.createEffect(() => {
  return webScanApi.webPoint.getAll();
});

$listWebPoints.on(getListWebPointsFx.doneData, (_, res) => res.data);

forward({
  from: WebPointGate.open,
  to: getListWebPointsFx,
});

const $webPoint = webPointDomain.createStore<WebPoint | null>(null);
const selectWebPoint = webPointDomain.createEvent<{ id: number }>();

sample({
  source: $listWebPoints,
  clock: selectWebPoint,
  fn: (list, { id }) => list.find((el) => el.id === id) ?? null,
  target: $webPoint,
});

const $loadingListWebPoints = getListWebPointsFx.pending;

export const stores = { $listWebPoints, $webPoint, $loadingListWebPoints };
export const actions = { selectWebPoint, getListWebPointsFx };
export const gates = { WebPointGate };
