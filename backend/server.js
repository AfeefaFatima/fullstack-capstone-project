import "dotenv/config";
import app from "./app.js";
import { connectToDatabase } from "./config/db.js";
const PORT = process.env.PORT || 5000;
await connectToDatabase();
app.listen(PORT, () => console.log(`GiftLink API listening on port ${PORT}`));
