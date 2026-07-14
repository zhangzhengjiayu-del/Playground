import { createServer } from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import { createReadStream, existsSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const dataFile = join(root, "shared-data.json");
const port = Number(process.env.PORT || 5173);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host}`);

    if (url.pathname === "/api/state" && request.method === "GET") {
      return sendJson(response, await readState());
    }

    if (url.pathname === "/api/state" && request.method === "POST") {
      const body = await readBody(request);
      const data = JSON.parse(body || "{}");
      await writeFile(dataFile, JSON.stringify(data, null, 2));
      return sendJson(response, { ok: true });
    }

    if (request.method !== "GET") {
      response.writeHead(405);
      return response.end("Method not allowed");
    }

    const pathname = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
    const safePath = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
    const filePath = join(root, safePath);
    if (!filePath.startsWith(root) || !existsSync(filePath)) {
      response.writeHead(404);
      return response.end("Not found");
    }

    response.writeHead(200, { "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream" });
    createReadStream(filePath).pipe(response);
  } catch (error) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(error instanceof Error ? error.message : "Server error");
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Deadline Tracker running at http://0.0.0.0:${port}`);
});

async function readState() {
  try {
    return JSON.parse(await readFile(dataFile, "utf8"));
  } catch {
    return null;
  }
}

function sendJson(response, data) {
  response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(data));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 2_000_000) {
        request.destroy();
        reject(new Error("Request body too large"));
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}
