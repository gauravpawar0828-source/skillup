const bcrypt=require("bcryptjs"),jwt=require("jsonwebtoken");
const {email,password,required}=require("../utils/validators");
exports.register=async(req,res)=>{
 const db=req.app.locals.db,{name,email:e,password:p}=req.body;
 if(!required(name)||!email(e)||!password(p))return res.status(400).json({success:false,message:"Enter name, valid email and 6+ character password"});
 try{
  const [x]=await db.query("SELECT id FROM users WHERE email=?",[e.toLowerCase()]);
  if(x.length)return res.status(409).json({success:false,message:"Email already registered"});
  const hash=await bcrypt.hash(p,12),[r]=await db.query("INSERT INTO users(name,email,password_hash) VALUES(?,?,?)",[name.trim(),e.toLowerCase(),hash]);
  await db.query("INSERT INTO profiles(user_id,preferred_locations) VALUES(?,?)",[r.insertId,"Mumbai, Thane, Navi Mumbai, Pune, Maharashtra, Remote India"]);
  const u={id:r.insertId,name:name.trim(),email:e.toLowerCase(),role:"USER"};
  res.status(201).json({success:true,token:jwt.sign(u,process.env.JWT_SECRET||"change_me",{expiresIn:"7d"}),user:u});
 }catch(err){res.status(500).json({success:false,message:err.message});}
};
exports.login=async(req,res)=>{
 const db=req.app.locals.db,{email:e,password:p}=req.body;
 try{
  const [r]=await db.query("SELECT * FROM users WHERE email=? AND is_active=1",[String(e||"").toLowerCase().trim()]);
  if(!r.length||!(await bcrypt.compare(p||"",r[0].password_hash)))return res.status(401).json({success:false,message:"Invalid credentials"});
  const u={id:r[0].id,name:r[0].name,email:r[0].email,role:r[0].role};
  res.json({success:true,token:jwt.sign(u,process.env.JWT_SECRET||"change_me",{expiresIn:"7d"}),user:u});
 }catch(err){res.status(500).json({success:false,message:err.message});}
};
exports.adminLogin=async(req,res)=>{
 const {email:e,password:p}=req.body;
 const adminEmail=process.env.ADMIN_EMAIL||"admin@careerjob.local",adminPassword=process.env.ADMIN_PASSWORD||"Admin@12345";
 if(e===adminEmail&&p===adminPassword){
  const u={id:0,name:"CareerJob Admin",email:e,role:"ADMIN"};
  return res.json({success:true,token:jwt.sign(u,process.env.JWT_SECRET||"change_me",{expiresIn:"7d"}),user:u});
 }
 try{
  const db=req.app.locals.db,[r]=await db.query("SELECT * FROM users WHERE email=? AND role='ADMIN' AND is_active=1",[e]);
  if(!r.length||!(await bcrypt.compare(p,r[0].password_hash)))return res.status(401).json({success:false,message:"Invalid admin credentials"});
  const u={id:r[0].id,name:r[0].name,email:r[0].email,role:"ADMIN"};
  res.json({success:true,token:jwt.sign(u,process.env.JWT_SECRET||"change_me",{expiresIn:"7d"}),user:u});
 }catch(err){res.status(500).json({success:false,message:err.message});}
};
