import { emptyDir } from "@std/fs";

async function clientBuild() {
  await emptyDir("./generated");

  const output = await Deno.bundle({
    entrypoints: ["./client/main.tsx"],
  });

  for (const error of output.errors) {
    console.error(error.text);
  }

  for (const warning of output.warnings) {
    console.error(warning.text);
  }

  const clientScript = output.outputFiles?.find(
    ({ path }) => path === "<stdout>"
  )?.contents;

  if (!clientScript) {
    throw new Error("Client script not found in bundle output");
  }

  await Deno.writeTextFile(
    "./generated/clientScript.json",
    JSON.stringify({
      hash: new Uint8Array(
        await crypto.subtle.digest("SHA-256", clientScript)
      ).toBase64(),
      content: new TextDecoder().decode(clientScript),
    })
  );
}

await clientBuild();
