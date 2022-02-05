const http = require("http");

const pets = [
  {
    id: 1,
    name: "braco",
    color: "black",
  },
  {
    id: 2,
    name: "pupi",
    color: "white",
  },
];

const app = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(pets));
});

const PORT = 5000;
app.listen(PORT);
console.log("paso");
