import { authorSchema } from "../models/Author.js";

//Data Transfer Object
export class PostDTO{
    constructor(Post){
        this.id = Post._id;
        this.title = Post.title;
        this.description = Post.description;
        this.author = Post.author;
        this.createdAt = Post.createdAt;
        this.updateAt = Post.updatedAt;
    }

    static fromRequest(body){
        return{
            id: body.id,
            title: body.title,
            description: body.description,
            author: body.author,
        };
    }
}