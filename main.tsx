import { renderToReadableStream } from "react-dom/server";
import { App } from "./client/app.tsx";
import clientScript from "./generated/clientScript.json" with { type: "json" };
import iconPng from "./generated/iconPng.json" with { type: "json" };
import iconSvg from "./generated/iconSvg.json" with { type: "json" };
import { Pool } from "pg";

const pool = new Pool();

function Html() {
  return (
    <html>
      <head>
        <title>星を増やそうゲーム</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        />
        <link rel="icon" href={`/icon?hash=${iconPng.hash}${iconSvg.hash}`} />
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
      <body style={{ display: "grid", gap: 8, margin: 0, padding: 16 }}>
        <App />
      </body>
    </html>
  );
}

Deno.serve(async (request) => {
  const url = new URL(request.url);
  switch (url.pathname) {
    case "/": {
      const stream = await renderToReadableStream(<Html />);
      return new Response(stream, {
        headers: { "content-type": "text/html" },
      });
    }
    case `/script`: {
      const hash = url.searchParams.get("hash");
      if (hash !== clientScript.hash) {
        return new Response(undefined, { status: 404 });
      }
      return new Response(clientScript.content, {
        headers: { "content-type": "application/javascript" },
      });
    }
    case "/test-db": {
      if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
      }
      const result = await pool.query("select * From version()");
      console.log(result.rows);

      return new Response("OK");
    }
    case "/icon": {
      const hash = url.searchParams.get("hash");
      if (hash !== `${iconPng.hash}${iconSvg.hash}`) {
        return new Response(undefined, { status: 404 });
      }
      if (request.headers.get("accept")?.includes("image/svg+xml")) {
        return new Response(
          iconSvg.content,
          { headers: { "content-type": "image/svg+xml" } },
        );
      }
      return new Response(
        Uint8Array.fromBase64(iconPng.content),
        { headers: { "content-type": "image/png" } },
      );
    }
    default:
      console.log({ ...request.headers });
      return new Response("Not Found", { status: 404 });
  }
});
