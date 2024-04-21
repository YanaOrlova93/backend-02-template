const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, async () => {
  console.log(`Server running at http://localhost:3001`);
  const open = await import('open');
  open.default(`http://localhost:3001`);
});

const http = require("http");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  if (request.url === "/users") {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: application/json";
    response.write(getUsers());
    response.end();
    return;
  }
  if (url.searchParams.has("hello") === true && url.searchParams.get("hello") === "") {
    response.status = 400;
    response.header = "Content-Type: text/strings";
    response.write("Enter a name");
    response.end();
    return;
  }
  if (url.searchParams.get("hello")) {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: text/strings";
    response.write(`Hello, ${url.searchParams.get("hello")}`);
    response.end();
    return;
  }
  if (url.searchParams.toString().length > 0) {
    response.status = 500;
    response.end();
    return
  }
  response.status = 200;
  response.statusMessage = "OK";
  response.header = "Content-Type: text/plain";
  response.write("Hello, World!");
  console.log(url.searchParams.values());
  response.end();
});

server.listen(3000, () => {
  console.log("Сервер запущен по адресу http:/127.0.0.1:3001");
});


