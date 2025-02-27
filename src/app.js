import express from "express";

const app = express();

const post = [
    {
        id: 1,
        title: "Aula 1",
        description: "Descrião da aula 1",
        author: "Fulano de tal"
    },
    {
        id: 2,
        title: "Aula 2",
        description: "Descrião da aula 2",
        author: "Beltrano da Silva"
    },
    {
        id: 3,
        title: "Aula 3",
        description: "Descrião da aula 3",
        author: "Ciclano Souza"
    },
]


app.get("/", (req, res) => {
    res.status(200).send("API com Express e Node.js");
});

app.get("/posts", (res))

export default app;