import { renderToReadableStream } from "react-dom/server";
import { App } from "./client/app.tsx";
import hash from "./generated/hash.json" with { type: "json" };
import clientScript from "./generated/clientScript.js" with { type: "text" };

Deno.serve(async (request) => {
  switch(new URL(request.url).pathname) {
    case "/":{
      const stream = await renderToReadableStream(<App />, {
        bootstrapScripts: [hash.clientScriptHash],
      });
      return new Response(stream, {
        headers: { "content-type": "text/html" },
      });
    }
    case `/${hash.clientScriptHash}`: {
      return new Response(clientScript, {
        headers: { "content-type": "application/javascript" },
      });
    }
    default:
      return new Response("Not Found", { status: 404 });
  }
});
