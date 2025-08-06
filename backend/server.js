import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from './lib/db.js';
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();

const app = express()

const port = process.env.PORT || 3000;
const __dirname = path.resolve();


app.use(express.json());

app.use('/users', userRoutes)
app.use("/blogs", blogRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")))
    app.get('/{*any}', (req,res) => {
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })
}


app.listen(port, () => {
    connectDB()
    console.log('Server is Live on ' + port)
})