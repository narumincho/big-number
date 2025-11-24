import { App } from "./client/component/App.tsx";
import { Hono } from "hono";
import clientScript from "./generated/clientScript.json" with { type: "json" };
import iconPng from "./generated/iconPng.json" with { type: "json" };
import iconSvg from "./generated/iconSvg.json" with { type: "json" };

function Html() {
  return (
    <html style={{ height: "100%" }}>
      <head>
        <title>星を増やそうゲーム</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href={`/icon.${iconSvg.hash}.svg`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`/icon.${iconPng.hash}.png`}
        />
        <script type="module" src={`/script?hash=${clientScript.hash}`}>
        </script>
        <style>
          {`
:root {
  color-scheme: dark;
};
`}
        </style>
      </head>
      <body style={{ height: "100%" }}>
        <App />
      </body>
    </html>
  );
}

const app = new Hono();

app.get("/", async (c) => {
  return await c.html(<Html />);
});

app.get(`/script`, (c) => {
  const hash = c.req.query("hash");
  if (hash !== clientScript.hash) {
    return c.notFound();
  }
  return c.body(clientScript.content, {
    headers: { "content-type": "application/javascript" },
  });
});

app.get(`/icon.${iconPng.hash}.png`, (c) => {
  return c.body(Uint8Array.fromBase64(iconPng.content), {
    headers: { "content-type": "image/png" },
  });
});

app.get(`/icon.${iconSvg.hash}.svg`, (c) => {
  return c.body(iconSvg.content, {
    headers: { "content-type": "image/svg+xml" },
  });
});

Deno.serve(app.fetch);
