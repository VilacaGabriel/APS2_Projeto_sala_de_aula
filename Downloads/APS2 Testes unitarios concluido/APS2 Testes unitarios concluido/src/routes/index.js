import express from "express";
import post from "./postRoutes.js"
import authors from "./authorRoutes.js";
import user from "./userRoutes.js"
import auth from "./authRoutes.js"

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send
        ("Node.js com Express"));

    //app.use(express.json(), post, authors, user)
    app.use(express.json());

    app.use(auth);

    app.use(post);
    app.use(authors);
    app.use(user);
}

export default routes;