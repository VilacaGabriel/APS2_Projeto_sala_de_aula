import express from "express";

const app = express();
app.use(express.json())//middleware;

const posts = [
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

app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

app.post("/posts", (req, res) => {
    posts.push(req.body);
    res.status(201).send("Post criado com sucesso!");
});

app.post("/posts/:id", (req, res) => {
    const index = searchPost(req.params.id)
    posts.push(req.body);
    res.status(200).json(posts[index]);
});





export default app;