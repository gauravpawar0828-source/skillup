const {scoreJob,reasons}=require("../services/recommender");
exports.list=async(req,res)=>{
 const db=req.app.locals.db,{q="",location="",mode="Any",type="Any",skill="",page=1}=req.query;
 const size=12,offset=(Math.max(1,Number(page))-1)*size;let sql=`SELECT j.*,c.name company_name,c.industry,c.website company_website,c.is_verified FROM jobs j LEFT JOIN companies c ON c.id=j.company_id WHERE j.is_active=1`,p=[];
 if(q){sql+=" AND (j.title LIKE ? OR j.skills LIKE ? OR c.name LIKE ?)";let x=`%${q}%`;p.push(x,x,x)}
 if(location){sql+=" AND j.location LIKE ?";p.push(`%${location}%`)}
 if(mode!=="Any"){sql+=" AND j.work_mode=?";p.push(mode)}
 if(type!=="Any"){sql+=" AND j.job_type=?";p.push(type)}
 if(skill){sql+=" AND j.skills LIKE ?";p.push(`%${skill}%`)}
 sql+=" ORDER BY j.posted_at DESC LIMIT ? OFFSET ?";p.push(size,offset);
 try{const [jobs]=await db.query(sql,p);res.json({success:true,jobs,page:Number(page)})}catch(e){res.status(500).json({success:false,message:e.message})}
};
exports.get=async(req,res)=>{try{const [r]=await req.app.locals.db.query(`SELECT j.*,c.name company_name,c.industry,c.description company_description,c.website company_website,c.headquarters,c.is_verified FROM jobs j LEFT JOIN companies c ON c.id=j.company_id WHERE j.id=?`,[req.params.id]);if(!r.length)return res.status(404).json({success:false,message:"Job not found"});res.json({success:true,job:r[0]})}catch(e){res.status(500).json({success:false,message:e.message})}};
exports.recommend=async(req,res)=>{try{const db=req.app.locals.db;const [[p]]=await db.query("SELECT p.*,GROUP_CONCAT(s.name) skills FROM profiles p LEFT JOIN user_skills us ON us.user_id=p.user_id LEFT JOIN skills s ON s.id=us.skill_id WHERE p.user_id=? GROUP BY p.id",[req.user.id]);const [jobs]=await db.query(`SELECT j.*,c.name company_name,c.industry,c.is_verified FROM jobs j LEFT JOIN companies c ON c.id=j.company_id WHERE j.is_active=1 ORDER BY j.posted_at DESC LIMIT 300`);const ranked=jobs.map(j=>{let m=scoreJob(p||{},j);return {...j,match_score:m,reasons:reasons(p||{},j)}}).sort((a,b)=>b.match_score-a.match_score).slice(0,30);for(const j of ranked)await db.query("INSERT INTO recommendation_logs(user_id,job_id,match_score,reasons) VALUES(?,?,?,?)",[req.user.id,j.id,j.match_score,j.reasons.join(" | ")]);res.json({success:true,jobs:ranked})}catch(e){res.status(500).json({success:false,message:e.message})}};
