const http = require("http"), fs = require("fs"), path = require("path");
const root = __dirname, port = 8123;
const types = { ".html":"text/html; charset=utf-8", ".js":"text/javascript", ".css":"text/css" };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  const f = path.join(root, p);
  if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) {
    res.writeHead(404); return res.end("not found");
  }
  res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
}).listen(port, () => console.log("listening on http://localhost:" + port));
