//import http from "http";
import app from "./src/app.js";

const PORT = 3005;

app.listen(PORT, () => {
    console.log("Servidor na escuta!");
});
 
//mongodb+srv://Eduward55:AHNES@cluster0.bwh8u.mongodb.net/api-post?retryWrites=true&w=majority&appName=Cluster0