import { getPageName, renderPageToString } from "../dist/server/server.js";
import { serve } from "./serve.ts";

async function renderPage(req: Request) {
  const { pathname } = new URL(req.url);

  const pageName: string = getPageName(pathname);
  if (!pageName) return null;

  const { pathname: pageUrl } = new URL(
    `../dist/client/${pageName}.js`,
    import.meta.url,
  );
  const runtime = new URL("../dist/client/client.js", import.meta.url);

  const mainScript = `
import { hydrate } from "${runtime.pathname}";
import { Page } from "${pageUrl}";

addEventListener("DOMContentLoaded", () => {
  try {
    hydrate(Page, document.getElementById("root"));
  } catch(err) {
    if (err instanceof Promise) {
      console.error("Render tried to suspend without a suspense boundary.");
    } else {
      console.error("Render threw an error:", err);
    }
  }
});`;

  const devScript = () => {
    const devRuntime = new URL("../dist/client/dev.js", import.meta.url);
    return `
import { unmount, render } from "${devRuntime.pathname}";

async function devReload() {
  try {
    const ts = new Date().getTime();
    const { Page } = await import("${pageUrl}" + "?t=" + ts);
    unmount(document.getElementById("root"));
    render(Page, document.getElementById("root"));
  } catch (err) {
    setTimeout(devReload, 200);
  }
};
window.__devReload = devReload;`;
  };

  const template = `
<!DOCTYPE html>
<html>
  <head>
    <title>Page</title>
    <script type="module">${mainScript}</script>
  </head>
  <body>
    <div id="root">${renderPageToString(pageName)}</div>
    <script type="module">${devScript()}</script>
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
    const file = await Deno.readFile(pathname);
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
