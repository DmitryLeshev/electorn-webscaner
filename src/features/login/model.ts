import { sample } from "effector";

import { model as modelStatus } from "entities/status";
import { model as modelViewer } from "entities/viewer";

sample({
  clock: modelViewer.effects.viewerLogOutFx.doneData,
  fn: (): modelStatus.Status => "not-authorized",
  target: modelStatus.actions.changeStatus,
});

sample({
  clock: modelViewer.effects.viewerLogInFx.doneData,
  fn: (): modelStatus.Status => "authorized",
  target: modelStatus.actions.changeStatus,
});
