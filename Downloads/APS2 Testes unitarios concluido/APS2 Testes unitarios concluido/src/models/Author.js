import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true,"Nome do autor é obrigatorio"]
    },
    email: {
        type: String, 
        required: [true,"E-mail do autor é obrigatório"], 
        // unique: true,
    },
}, 
{
    versionKey: false,
    timestamps: true
});

const author = mongoose.model("authors", authorSchema)

export {author, authorSchema};
