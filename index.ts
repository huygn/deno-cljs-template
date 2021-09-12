import {
  getPageName,
  renderPageToString,
  pathsMap,
} from "./dist/server/server.js";
import { serve } from "./src/serve.ts";

const IS_DEV = Deno.env.get("MODE") === "DEV";
const { pathname: baseImportUrl } = new URL(import.meta.url);
const getRoot = `document.getElementById("root")`;

function getPageImportUrl(name: string) {
  const { pathname: pageUrl } = new URL(
    `./dist/client/${name}.js`,
    import.meta.url
  );
  return pageUrl;
}

async function renderPage(req: Request) {
  const { pathname } = new URL(req.url);

  const pageName: string = getPageName(pathname);
  if (!pageName) return null;

  const { pathname: pageUrl } = new URL(
    `./dist/client/${pageName}.js`,
    import.meta.url
  );
  const runtime = new URL("./dist/client/client.js", import.meta.url);

  const mainScript = `
import { hydrate } from "${runtime.pathname}";
import { Page } from "${pageUrl}";

addEventListener("DOMContentLoaded", () => {
  const root = ${getRoot};
  try {
    hydrate(Page, root);
  } catch(err) {
    if (err instanceof Promise) {
      console.error("Render tried to suspend without a suspense boundary.");
    } else {
      console.error("Render threw an error:", err);
    }
  }
});`;

  const navScript = `
import { render, getNavHelper } from "${runtime.pathname}";
const pathsMap = ${JSON.stringify(pathsMap)};

async function updateUrl(pathname) {
  const pageName = pathsMap[pathname];
  if (!pageName) {
    return;
  }
  const { pathname: pageUrl } = new URL("./dist/client/" + pageName + ".js", import.meta.url);
  const { Page } = await import(pageUrl);
  console.log(Page);
  render(Page, ${getRoot});
};

addEventListener("DOMContentLoaded", () => {
  const root = ${getRoot};
  root.addEventListener('click', getNavHelper(updateUrl));
});`;

  const devScript = () => {
    return `
<script type="module">
import { render } from "${runtime.pathname}";

async function devReload() {
  try {
    const ts = new Date().getTime();
    const { Page } = await import("${pageUrl}" + "?t=" + ts);
    render(Page, ${getRoot});
  } catch (err) {
    setTimeout(devReload, 200);
  }
};
window.__devReload = devReload;
</script>`;
  };

  const template = `
<!DOCTYPE html>
<html>
  <head>
    <title>Page</title>
    <script type="module">${mainScript}</script>
    <script type="module">${navScript}</script>
  </head>
  <body>
    <div id="root">${renderPageToString(pageName)}</div>
    ${IS_DEV ? devScript() : ""}
  </body>
</html>
`;

  return template;
}

async function handleRequest(request: Request) {
  const { pathname } = new URL(request.url);

  const html = await renderPage(request);
  if (html) {
    return new Response(html, {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  // assume static js files
  // TODO: other file types as well .eg css
  try {
    const cwd = Deno.cwd();
    const filePath = pathname.split(cwd).at(-1) as string;
    const file = await Deno.readFile([".", filePath].join(""));
    return new Response(file, {
      headers: {
        "content-type": "text/javascript",
      },
    });
  } catch (err) {
    return new Response(`${pathname} not found`, { status: 404 });
  }
}

serve(handleRequest);
