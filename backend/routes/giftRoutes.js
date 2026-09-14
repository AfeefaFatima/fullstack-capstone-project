import express from "express";
import { connectToDatabase } from "../config/db.js";
import { getGifts, getGiftById, createGift, addComment } from "../controllers/giftController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(async (req, res, next) => {
    try {
        await connectToDatabase();
        next();
    } catch (e) {
        next(e);
    }
});

router.get("/", getGifts);
router.get("/:id", getGiftById);
router.post("/", authMiddleware, createGift);
router.post("/:id/comments", authMiddleware, addComment);


export default router;
