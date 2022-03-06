// console.log({ env: import.meta.env });

const getEnvVar = (key: string): any => {
  const envKey = import.meta.env[key];
  if (envKey === undefined) {
    throw new Error(`Env variable ${envKey} is required`);
  }
  return envKey;
};

export const APP: "WEB_SCAN" = getEnvVar("VITE_APP");
export const API_UTL: "WEB_SCAN" = getEnvVar("VITE_API_URL");

export const MODE = getEnvVar("MODE");
export const DEV = getEnvVar("DEV");
export const PROD = getEnvVar("PROD");
