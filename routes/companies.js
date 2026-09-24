const r=require("express").Router();
r.get("/",async(req,res)=>{try{const [x]=await req.app.locals.db.query(`SELECT c.*,COUNT(j.id) job_count FROM companies c LEFT JOIN jobs j ON j.company_id=c.id AND j.is_active=1 GROUP BY c.id ORDER BY job_count DESC,c.name`);res.json({success:true,companies:x})}catch(e){res.status(500).json({success:false,message:e.message})}});
r.get("/:id",async(req,res)=>{try{const [[c]]=await req.app.locals.db.query("SELECT * FROM companies WHERE id=?",[req.params.id]);const [jobs]=await req.app.locals.db.query("SELECT * FROM jobs WHERE company_id=? AND is_active=1 ORDER BY posted_at DESC",[req.params.id]);res.json({success:true,company:c,jobs})}catch(e){res.status(500).json({success:false,message:e.message})}});
module.exports=r;
