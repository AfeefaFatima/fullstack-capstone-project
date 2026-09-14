import "dotenv/config";
import app from "./app.js";
import { connectToDatabase } from "./config/db.js";

await connectToDatabase();

export default app;