import express, { application } from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import path from "path";
import {dirname} from "path";

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({
    extended: false
}));

const __dirname = path.resolve();
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect("mongodb://localhost:27017/Blogioo").then(()=>{
    console.log("Successfully connected to mongoDB");
}).catch((err)=>{
    console.error(err);
})

app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);

app.listen(4000, ()=>{
    console.log("Server is Connected");
})