import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Nome é obrigatório."]
    },
    email: {
        type: String,
        required: [true, "E-mail é obrigatório."],
        unique: true,
    },
    password: {
        type: String, 
        required: [true,"Password é obrigatório."]
    },
});

const user = mongoose.model("user", userSchema);

export {user, userSchema};