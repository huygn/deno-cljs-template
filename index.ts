import { renderPageToString } from "./src/server.ts";
import { serve } from "./src/serve.ts";
import { ModulesMap } from "./src/modules.ts";

const IS_DEV = Deno.env.get("MODE") === "DEV";
const getRoot = `document.getElementById("root")`;

const modulesMap = new ModulesMap();
await modulesMap.loadManifest();

serve(handleRequest);

async function renderPage(req: Request) {
  const { pathname } = new URL(req.url);

  const pageContent = renderPageToString(pathname);
  if (!pageContent) return null;

  const modules = {
    shared: modulesMap.getFileName("shared"),
    client: modulesMap.getFileName("client"),
  };

  const template = `
<!DOCTYPE html>
<html>
  <head>
    <title>Page</title>
  </head>
  <body>
    <div id="root">${pageContent}</div>
    <script src="${modules.shared}" type="text/javascript"></script>
    <script defer src="${modules.client}" type="text/javascript"></script>
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
