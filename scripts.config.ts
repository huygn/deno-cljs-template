import { DenonConfig } from "https://deno.land/x/denon@2.4.7/mod.ts";

const config: DenonConfig = {
  scripts: {
    dev: {
      cmd: "deno run src/index.ts",
      unstable: true,
      allow: ["read", "env", "run", "net"],
      env: { PORT: "3000" },
    },
  },
};

export default config;
