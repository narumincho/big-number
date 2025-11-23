import { emptyDir } from "@std/fs";

async function clientScriptBuild(): Promise<void> {
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
    ({ path }) => path === "<stdout>",
  )?.contents;

  if (!clientScript) {
    throw new Error("Client script not found in bundle output");
  }

  await Deno.writeTextFile(
    "./generated/clientScript.json",
    JSON.stringify({
      hash: new Uint8Array(
        await crypto.subtle.digest("SHA-256", clientScript),
      ).toBase64({ alphabet: "base64url" }),
      content: new TextDecoder().decode(clientScript),
    }),
  );
}

async function iconBuild(): Promise<void> {
  /**
   * https://github.com/twitter/twemoji/blob/master/assets/72x72/2b50.png
   */
  const png = await Deno.readFile("./client/star.png");

  await Deno.writeTextFile(
    "./generated/iconPng.json",
    JSON.stringify({
      hash: new Uint8Array(
        await crypto.subtle.digest("SHA-256", png),
      ).toBase64({ alphabet: "base64url" }),
      content: png.toBase64(),
    }),
  );

  /**
   * https://github.com/twitter/twemoji/blob/master/assets/svg/2b50.svg
   */
  const svg = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
    <path
      fill="#FFAC33"
      d="M27.287 34.627c-.404 0-.806-.124-1.152-.371L18 28.422l-8.135 5.834c-.693.496-1.623.496-2.312-.008-.689-.499-.979-1.385-.721-2.194l3.034-9.792-8.062-5.681c-.685-.505-.97-1.393-.708-2.203.264-.808 1.016-1.357 1.866-1.363L12.947 13l3.179-9.549c.268-.809 1.023-1.353 1.874-1.353.851 0 1.606.545 1.875 1.353L23 13l10.036.015c.853.006 1.606.556 1.867 1.363.263.81-.022 1.698-.708 2.203l-8.062 5.681 3.034 9.792c.26.809-.033 1.695-.72 2.194-.347.254-.753.379-1.16.379z"
    />
  </svg>).toString();

  await Deno.writeTextFile(
    "./generated/iconSvg.json",
    JSON.stringify({
      hash: new Uint8Array(
        await crypto.subtle.digest(
          "SHA-256",
          new TextEncoder().encode(svg),
        ),
      ).toBase64({ alphabet: "base64url" }),
      content: svg,
    }),
  );
}

await clientScriptBuild();
await iconBuild();
console.log("Client build completed.");
