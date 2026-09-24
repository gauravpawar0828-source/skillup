const r=require("express").Router(),a=require("../middleware/auth");
r.get("/",a(["USER"]),async(req,res)=>{try{const [x]=await req.app.locals.db.query(`SELECT j.*,c.name company_name FROM saved_jobs s JOIN jobs j ON j.id=s.job_id LEFT JOIN companies c ON c.id=j.company_id WHERE s.user_id=? ORDER BY s.created_at DESC`,[req.user.id]);res.json({success:true,jobs:x})}catch(e){res.status(500).json({success:false,message:e.message})}});
r.post("/:id",a(["USER"]),async(req,res)=>{try{await req.app.locals.db.query("INSERT IGNORE INTO saved_jobs(user_id,job_id) VALUES(?,?)",[req.user.id,req.params.id]);res.json({success:true})}catch(e){res.status(500).json({success:false,message:e.message})}});
r.delete("/:id",a(["USER"]),async(req,res)=>{try{await req.app.locals.db.query("DELETE FROM saved_jobs WHERE user_id=? AND job_id=?",[req.user.id,req.params.id]);res.json({success:true})}catch(e){res.status(500).json({success:false,message:e.message})}});
module.exports=r;
