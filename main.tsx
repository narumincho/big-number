import { renderToReadableStream } from "react-dom/server";
import { App } from "./client/app.tsx";
import clientScript from "./generated/clientScript.json" with { type: "json" };
import { Pool } from "pg";

const pool = new Pool();

Deno.serve(async (request) => {
  switch (new URL(request.url).pathname) {
    case "/": {
      const stream = await renderToReadableStream(<App />, {
        bootstrapScripts: [`/${clientScript.hash}`],
      });
      return new Response(stream, {
        headers: { "content-type": "text/html" },
      });
    }
    case `/${clientScript.hash}`: {
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
    default:
      return new Response("Not Found", { status: 404 });
  }
});
