import { getDatabase } from "../config/db.js";
import { giftCollection } from "../models/Gift.js";

export async function searchGifts(req,res) {
  const q=String(req.query.q||"").trim();
  const category=String(req.query.category||"").trim();
  const filter={};
  if(category && category.toLowerCase()!=="all") filter.category=category;
  if(q){ const regex=new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"i"); filter.$or=[{title:regex},{description:regex},{location:regex}]; }
  const gifts=await getDatabase().collection(giftCollection()).find(filter).sort({createdAt:-1}).toArray();
  res.json(gifts);
}
