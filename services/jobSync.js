const {DemoProvider}=require("./jobProviders");
exports.sync=async db=>{
 const p=new DemoProvider(),jobs=await p.fetchJobs();let added=0;
 for(const j of jobs){
  const [[c]]=await db.query("SELECT id FROM companies WHERE name=?",[j.company]);
  if(!c)continue;
  await db.query(`INSERT INTO jobs(external_id,provider,source_type,company_id,title,description,skills,location,state,country,min_salary,max_salary,experience_min,experience_max,job_type,work_mode,application_url,posted_at,is_active) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1) ON DUPLICATE KEY UPDATE title=VALUES(title),description=VALUES(description),skills=VALUES(skills),location=VALUES(location),posted_at=VALUES(posted_at),is_active=1`,[j.external_id,j.provider,j.source_type||"LIVE_API",c.id,j.title,j.description,j.skills,j.location,j.state,j.country||"India",j.min_salary||0,j.max_salary||0,j.experience_min||0,j.experience_max||99,j.job_type||"Full-time",j.work_mode||"On-site",j.application_url,j.posted_at]);added++;
 }
 await db.query("INSERT INTO sync_logs(provider,status,jobs_received,jobs_added,message) VALUES(?,?,?,?,?)",[p.constructor.name,"Success",jobs.length,added,"Provider sync completed"]);
 return {received:jobs.length,added};
};
