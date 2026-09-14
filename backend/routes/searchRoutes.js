import express from "express";
import { connectToDatabase } from "../config/db.js";
import { searchGifts } from "../controllers/searchController.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        await connectToDatabase();
        await searchGifts(req, res);
    } catch (e) {
        next(e);
    }
});


export default router;
