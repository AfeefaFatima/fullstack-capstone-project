import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { getDatabase } from "../config/db.js";
import { userCollection } from "../models/User.js";

const safeUser=u=>({id:u._id.toString(),name:u.name,email:u.email,city:u.city||"",phone:u.phone||"",bio:u.bio||""});
const tokenFor=u=>jwt.sign({id:u._id.toString(),email:u.email,name:u.name},process.env.JWT_SECRET||"giftlink-dev-secret",{expiresIn:"2h"});

export async function register(req,res){
  const name=String(req.body.name||"").trim(),email=String(req.body.email||"").trim().toLowerCase(),password=String(req.body.password||"");
  if(!name||!email||password.length<6) return res.status(400).json({message:"Name, valid email and password of at least 6 characters are required"});
  const users=getDatabase().collection(userCollection());
  if(await users.findOne({email})) return res.status(409).json({message:"Email is already registered"});
  const user={name,email,password:await bcrypt.hash(password,12),city:"",phone:"",bio:"",createdAt:new Date()};
  const r=await users.insertOne(user); const saved={...user,_id:r.insertedId}; delete saved.password;
  res.status(201).json({user:safeUser(saved),token:tokenFor(saved)});
}

export async function login(req,res){
  const email=String(req.body.email||"").trim().toLowerCase(),password=String(req.body.password||"");
  const user=await getDatabase().collection(userCollection()).findOne({email});
  if(!user || !(await bcrypt.compare(password,user.password))) return res.status(401).json({message:"Invalid email or password"});
  res.json({user:safeUser(user),token:tokenFor(user)});
}

export async function updateUser(req,res){
  const updates={name:String(req.body.name||"").trim(),city:String(req.body.city||"").trim(),phone:String(req.body.phone||"").trim(),bio:String(req.body.bio||"").trim()};
  const r=await getDatabase().collection(userCollection()).findOneAndUpdate({_id:new ObjectId(req.user.id)},{$set:updates},{returnDocument:"after"});
  if(!r) return res.status(404).json({message:"User not found"});
  res.json({user:safeUser(r)});
}
