import { createServer } from "node:http";
import { createReadStream, existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const menuRoot = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const sudokuStateFile = join(projectRoot, "sudoku-app", "sudoku-state.json");
const port = Number(process.env.PORT || 5173);

const roots = [
  { prefix: "/vocab-chat-app", root: join(projectRoot, "vocab-chat-app") },
  { prefix: "/vocab-chat", root: join(projectRoot, "vocab-chat-app") },
  { prefix: "/sudoku-app", root: join(projectRoot, "sudoku-app") },
  { prefix: "/sudoku", root: join(projectRoot, "sudoku-app") },
  { prefix: "", root: menuRoot },
];

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};

createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host}`);

  if (url.pathname === "/api/sudoku-state" && request.method === "GET") {
    return sendJson(response, await readSudokuState());
  }

  if (url.pathname === "/api/sudoku-state" && request.method === "POST") {
    const body = await readBody(request);
    const data = JSON.parse(body || "{}");
    await writeFile(sudokuStateFile, JSON.stringify(data, null, 2));
    return sendJson(response, { ok: true });
  }

  if (request.method !== "GET") {
    response.writeHead(405);
    response.end("Method not allowed");
    return;
  }

  const route = roots.find((candidate) => !candidate.prefix || url.pathname === candidate.prefix || url.pathname.startsWith(`${candidate.prefix}/`));
  const relativePath = route.prefix ? url.pathname.slice(route.prefix.length) || "/" : url.pathname;
  const pathname = relativePath === "/" ? "/index.html" : decodeURIComponent(relativePath);
  const safePath = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(route.root, safePath);

  if (!filePath.startsWith(route.root) || !existsSync(filePath)) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream",
    "Cache-Control": "no-cache",
  });
  createReadStream(filePath).pipe(response);
}).listen(port, "0.0.0.0", () => {
  console.log(`Playground Apps running at http://0.0.0.0:${port}`);
});

async function readSudokuState() {
  try {
    return JSON.parse(await readFile(sudokuStateFile, "utf8"));
  } catch {
    return null;
  }
}

function sendJson(response, data) {
  response.writeHead(200, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-cache",
  });
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
