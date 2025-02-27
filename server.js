// import http from "http";
import app from "./src/app.js";

const PORT = 3000;

// const rotas = {
//     "/": "API com Express e Node.js",
//     "/post":"Rota de postagens",
//     "/autores":"Rota de autores",
// }

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { "content-type": "text-plain" });
//     res.end(rotas[req.url]);
// });

// server.listen(PORT, () => {
//     console.log("Servidor na escuta!");
// });

app.listen(PORT, () => {
    console.log("Servidor na escuta!");
});