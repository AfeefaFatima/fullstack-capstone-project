import "dotenv/config";
import { MongoClient, ObjectId } from "mongodb";
const uri = process.env.MONGODB_URI , dbName = process.env.DB_NAME;
const client = new MongoClient(uri); await client.connect(); const db = client.db(dbName);
await db.collection("gifts").deleteMany({});
const ids = ["650000000000000000000001", "650000000000000000000002",
    "650000000000000000000003", "650000000000000000000004",
    "650000000000000000000005", "650000000000000000000006",
    "650000000000000000000007", "650000000000000000000008",
    "650000000000000000000009", "650000000000000000000010",
    "650000000000000000000011", "650000000000000000000012",
    "650000000000000000000013", "650000000000000000000014",
    "650000000000000000000015", "650000000000000000000016"];
const base = [
    ["Wooden Chair", "Furniture", "chair.svg"], ["Desk Lamp", "Home Decor", "lamp.svg"], ["Book Bundle", "Books", "books.svg"], ["Kitchen Storage Set", "Kitchen", "gift-box.svg"],
    ["Study Chair", "Furniture", "chair.svg"], ["Reading Lamp", "Home Decor", "lamp.svg"], ["Children Books", "Books", "books.svg"], ["Serving Bowls", "Kitchen", "gift-box.svg"],
    ["Side Chair", "Furniture", "chair.svg"], ["Bedside Lamp", "Home Decor", "lamp.svg"], ["Novel Collection", "Books", "books.svg"], ["Food Containers", "Kitchen", "gift-box.svg"],
    ["Office Chair", "Furniture", "chair.svg"], ["Table Lamp", "Home Decor", "lamp.svg"], ["Textbook Set", "Books", "books.svg"], ["Dinner Set", "Kitchen", "gift-box.svg"]];
const docs = base.map(([title, category, img], i) => ({ _id: new ObjectId(ids[i]), title, description: `A useful ${title.toLowerCase()} available for free through GiftLink.`, category, condition: i % 3 === 0 ? "Like New" : i % 3 === 1 ? "Good" : "Used - Good", location: i % 2 ? "Lahore" : "Islamabad", imageUrl: `/uploads/${img}`, status: "available", ownerId: "seed-user", createdAt: new Date(Date.now() - i * 86400000), comments: [] }));
const r = await db.collection("gifts").insertMany(docs); console.log(`inserted_items: ${Object.keys(r.insertedIds).length}`); console.log(r.insertedIds); await client.close();
