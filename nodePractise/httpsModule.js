import https from "https";

// https.get("https://jsonplaceholder.typicode.com/posts/1", (res) => {
//   res.on("data", (chunk) => {
//     console.log(chunk.toString());
//   });
// });

// https
//   .createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("Hello World\n");
//   })
//   .listen(3000, () => {
//     console.log("Server running at https://localhost:3000/");
//   });

https.createServer(options, (req, res) => {
  if (req.url === "/") {
    res.end("Home");
  } else if (req.url === "/about") {
    res.end("About");
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});
