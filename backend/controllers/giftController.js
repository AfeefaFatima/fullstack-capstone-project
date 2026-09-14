import { ObjectId } from "mongodb";
import { getDatabase } from "../config/db.js";
import { giftCollection, giftPayload } from "../models/Gift.js";

export async function getGifts(req,res) {
  const db=getDatabase();
  const gifts=await db.collection(giftCollection()).find({}).sort({createdAt:-1}).toArray();
  res.json(gifts);
}

export async function getGiftById(req,res) {
  const id=req.params.id;
  if(!ObjectId.isValid(id)) return res.status(400).json({message:"Invalid item id"});
  const gift=await getDatabase().collection(giftCollection()).findOne({_id:new ObjectId(id)});
  if(!gift) return res.status(404).json({message:"Item not found"});
  res.json(gift);
}

export async function createGift(req,res) {
  if(!req.user) return res.status(401).json({message:"Authentication required"});
  const payload=giftPayload(req.body, req.user.id);
  if(!payload.title || !payload.description) return res.status(400).json({message:"Title and description are required"});
  const result=await getDatabase().collection(giftCollection()).insertOne(payload);
  res.status(201).json({...payload,_id:result.insertedId});
}

export async function addComment(req,res) {
  if(!req.user) return res.status(401).json({message:"Authentication required"});
  const text=String(req.body.text||"").trim();
  if(!text) return res.status(400).json({message:"Comment is required"});
  if(!ObjectId.isValid(req.params.id)) return res.status(400).json({message:"Invalid item id"});
  const comment={_id:new ObjectId(),text,userId:req.user.id,userName:req.user.name,createdAt:new Date()};
  const result=await getDatabase().collection(giftCollection()).findOneAndUpdate(
    {_id:new ObjectId(req.params.id)},{$push:{comments:comment}},{returnDocument:"after"}
  );
  if(!result) return res.status(404).json({message:"Item not found"});
  res.status(201).json(result);
}
