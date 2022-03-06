import reactRefresh from "@vitejs/plugin-react-refresh";
import { UserConfig, ConfigEnv } from "vite";
import { join } from "path";

const srcRoot = join(__dirname, "src");
const srcRootShared = join(__dirname, "src", "shared");
const srcRootApp = join(__dirname, "src", "app");
const srcRootEntities = join(__dirname, "src", "entities");
const srcRootProcesses = join(__dirname, "src", "processes");
const srcRootFeatures = join(__dirname, "src", "features");
const srcRootWidgets = join(__dirname, "src", "widgets");
const srcRootPages = join(__dirname, "src", "pages");

export default ({ command }: ConfigEnv): UserConfig => {
  // DEV
  if (command === "serve") {
    return {
      base: "/",
      plugins: [reactRefresh()],
      alias: {
        "/@": srcRoot,
        shared: srcRootShared,
        app: srcRootApp,
        entities: srcRootEntities,
        processes: srcRootProcesses,
        features: srcRootFeatures,
        widgets: srcRootWidgets,
        pages: srcRootPages,
      },
      build: {
        outDir: join(srcRoot, "/out"),
        emptyOutDir: true,
        rollupOptions: {},
      },
      server: {
        port: process.env.PORT === undefined ? 3000 : +process.env.PORT,
      },
      optimizeDeps: {
        auto: true,
        exclude: ["path"],
      },
    };
  }
  // PROD
  else {
    return {
      base: `${__dirname}/src/out/`,
      plugins: [reactRefresh()],
      alias: {
        "/@": srcRoot,
        shared: srcRootShared,
        app: srcRootApp,
        entities: srcRootEntities,
        processes: srcRootProcesses,
        features: srcRootFeatures,
        widgets: srcRootWidgets,
        pages: srcRootPages,
      },
      build: {
        outDir: join(srcRoot, "/out"),
        emptyOutDir: true,
        rollupOptions: {},
      },
      server: {
        port: process.env.PORT === undefined ? 3000 : +process.env.PORT,
      },
      optimizeDeps: {
        auto: true,
        exclude: ["path"],
      },
    };
  }
};
