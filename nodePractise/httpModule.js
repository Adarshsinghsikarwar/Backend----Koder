import http from "http";

const server = http.createServer((req, res) => {
  res.write("hello");
  res.write("world");
  res.statusCode = 200;
  //   res.end("Success");
  res.end(
    JSON.stringify({
      name: "Adarsh",
    })
  );
  res.setHeader("Content-Type", "text/html");
  console.log(req.url);
  console.log(req.method);
  // console.log(req.headers);
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
