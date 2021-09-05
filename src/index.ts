import { renderToString } from "../dist/server/server.js";
import { serve } from "./serve.ts";

async function renderPage() {
  const runtime = new URL("../dist/client/client.js", import.meta.url);

  const scriptContent = `
import { hydrate } from "${runtime.pathname}";

addEventListener("DOMContentLoaded", () => {
  try {
    hydrate(document.getElementById("root"));
  } catch(err) {
    if (err instanceof Promise) {
      console.error("Render tried to suspend without a suspense boundary.");
    } else {
      console.error("Render threw an error:", err);
    }
  }
});
`;

  const template = `
<!DOCTYPE html>
<html>
<head>
  <title>Page</title>
  <script type="module">${scriptContent}</script>
</head>
<body>
  <div id="root">${renderToString()}</div>
</body>
</html>
`;

  return template;
}

async function handleRequest(request: Request) {
  const { pathname } = new URL(request.url);

  if (pathname === "/") {
    const html = await renderPage();
    return new Response(html, {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  // assume static js files
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
