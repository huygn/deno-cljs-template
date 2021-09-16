import { readJson } from "https://deno.land/x/jsonfile/mod.ts";

// shadow-cljs's manifest.json
interface ManifestEntry {
  name: string;
  "module-id": string;
  "output-name": string;
}

export class ModulesMap {
  #map: Record<string, string> = {};
  #basePath = "./dist/client";

  async loadManifest() {
    const filePath = [this.#basePath, "manifest.json"].join("/");
    try {
      const entries = (await readJson(filePath)) as ManifestEntry[];
      this.#map = entries.reduce(
        (acc, curr) => ({
          ...acc,
          [curr["module-id"]]: curr["output-name"],
        }),
        {}
      );
    } catch (err: any) {
      console.warn(`No manifest.json found`, err.message);
    }
  }

  getFileName(name: string) {
    // in DEV mode just use module name as file name
    const fileName = this.#map[name] ?? `${name}.js`;
    return [this.#basePath, fileName].join("/");
  }
}
