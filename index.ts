// @ts-nocheck

import {
  getPageName,
  renderPageToString,
  pathsMap,
} from "./dist/server/server.js";
import { serve } from "./src/serve.ts";

const IS_DEV = Deno.env.get("MODE") === "DEV";
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

  const pageUrl = getPageImportUrl(pageName)
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

addEventListener("DOMContentLoaded", () => {
  const root = ${getRoot};
  root.addEventListener('click', getNavHelper(updateUrl));
});

addEventListener('popstate', onPopstate);

async function updateUrl(pathname) {
  await renderPage(pathname);
  history.pushState(null, null, pathname);
};

async function renderPage(pathname) {
  const pageName = pathsMap[pathname];
  if (!pageName) {
    return;
  }
  const { pathname: pageUrl } = new URL("./dist/client/" + pageName + ".js", import.meta.url);
  const { Page } = await import(pageUrl);
  render(Page, ${getRoot});
}

async function onPopstate() {
  const { pathname } = document.location;
  await renderPage(pathname);
}
`;

  const scriptVer = IS_DEV ? 'development' : 'production'
  const scripts = `
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/17.0.2/umd/react.${scriptVer}.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.2/umd/react-dom.${scriptVer}.min.js"></script>
`

  const template = `
<!DOCTYPE html>
<html>
  <head>
    <title>Page</title>
    ${scripts}
    <script type="module">${mainScript}</script>
    <script type="module">${navScript}</script>
  </head>
  <body>
    <div id="root">${renderPageToString(pageName)}</div>
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
