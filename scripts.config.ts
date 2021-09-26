import { DenonConfig } from "https://deno.land/x/denon@2.4.9/mod.ts";

const config: DenonConfig = {
  scripts: {
    dev: {
      cmd: "deno run index.ts",
      unstable: true,
      allow: ["read", "env", "run", "net"],
      env: { PORT: "3000", MODE: "DEV" },
    },
  },
};

export default config;
