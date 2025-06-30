import mongoose from "mongoose";

async function connectToDatabase(){
    mongoose.connect("mongodb+srv://admin:admin123@cluster0.wwtyt.mongodb.net/api-post?retryWrites=true&w=majority&appName=Cluster0");

    return mongoose.connection;
}

export default connectToDatabase();

