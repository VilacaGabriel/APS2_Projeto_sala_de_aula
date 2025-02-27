import express from "express";

const app = express();
app.use(express.json());//middleware

const posts = [
    {
        id: 1,
        title: "Aula 1",
        description: "Descrição da aula 1",
        author: "Fulado de Tal"
    },
    {
        id: 2,
        title: "Aula 2",
        description: "Descrição da aula 2",
        author: "Beltrano da Silva"
    },
    {
        id: 3,
        title: "Aula 3",
        description: "Descrição da aula 3",
        author: "Ciclano Souza"
    },
]

function searchPost(id) {
    return posts.findIndex(posts => {
        return posts.id === Number(id);
    });
}

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

app.get("/posts/:id", (req, res) => {
    const index = searchPost(req.params.id);
    res.status(200).json(posts[index]);
});

app.put("/posts/:id", (req, res) => {
    const index = searchPost(req.params.id);
    posts[index].title = req.body.title;
    posts[index].description = req.body.description;
    posts[index].author = req.body.author;
    res.status(200).json(posts[index]);
});

app.delete("/posts/:id", (req, res) => {
    const index = searchPost(req.params.id);
    posts.splice(index, 1);
    res.status(200).send("Post removido com sucesso!");
});

export default app;