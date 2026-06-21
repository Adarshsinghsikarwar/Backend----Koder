import http from "http";
import url from "url";

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if(pathname === "/" && req.method === "GET") {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Welcome to the Home Page!");
  }
});
