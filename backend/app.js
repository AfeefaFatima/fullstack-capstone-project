import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import giftRoutes from "./routes/giftRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app=express();
const __filename=fileURLToPath(import.meta.url),__dirname=path.dirname(__filename);
app.use(cors());
app.use(express.json());
app.use("/uploads",express.static(path.join(__dirname,"uploads")));
app.get("/",(req,res)=>res.json({name:"GiftLink API",status:"running"}));
app.use("/api/gifts",giftRoutes);
app.use("/api/search",searchRoutes);
app.use("/api/auth",authRoutes);
app.use((err,req,res,next)=>{console.error(err);res.status(500).json({message:"Server error"});});


export default app;
