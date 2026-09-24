function norm(s){return String(s||"").toLowerCase().replace(/[^a-z0-9+#.\s]/g," ")}
function userSkills(p){return String(p.skills||"").split(",").map(norm).map(x=>x.trim()).filter(Boolean)}
function scoreJob(p,j){
 const us=userSkills(p), js=norm(j.skills);let score=0;
 const hits=us.filter(s=>js.includes(s));score+=us.length?Math.round(hits.length/us.length*45):0;
 const pref=norm([p.preferred_location,p.preferred_locations].join(","));
 const loc=norm(j.location);
 if(pref&&loc&&pref.includes(loc.split(",")[0].trim()))score+=22;
 else if(pref&&/maharashtra/.test(pref)&&/mumbai|thane|navi mumbai|pune|nagpur|maharashtra/.test(loc))score+=17;
 else if(pref&&/remote/.test(pref)&&/remote/.test(loc))score+=22;
 const e=Number(p.experience_years||0),a=Number(j.experience_min||0),b=Number(j.experience_max||99);
 if(e>=a&&e<=b)score+=13;else if(e>=a-1)score+=7;
 if(p.work_mode&&p.work_mode!=="Any"&&norm(p.work_mode)===norm(j.work_mode))score+=7;
 if(p.job_type&&p.job_type!=="Any"&&norm(p.job_type)===norm(j.job_type))score+=5;
 const max=Number(p.max_salary||0),min=Number(p.min_salary||0);
 if(max&&Number(j.min_salary||0)<=max)score+=4;
 const age=Math.max(0,(Date.now()-new Date(j.posted_at||Date.now()).getTime())/86400000);
 score+=Math.max(0,4-Math.floor(age));
 return Math.min(100,Math.round(score));
}
function reasons(p,j){
 const r=[],us=userSkills(p),js=norm(j.skills),hits=us.filter(s=>js.includes(s));
 if(hits.length)r.push(`${hits.length} skill match${hits.length>1?"es":""}: ${hits.slice(0,4).join(", ")}`);
 const pref=norm([p.preferred_location,p.preferred_locations].join(","));
 if(pref&&norm(j.location).split(",")[0]&&pref.includes(norm(j.location).split(",")[0]))r.push("Preferred location match");
 else if(/maharashtra/.test(pref)&&/maharashtra/.test(norm(j.location)))r.push("Maharashtra location match");
 if(p.work_mode!=="Any"&&norm(p.work_mode)===norm(j.work_mode))r.push("Preferred work mode");
 if(p.job_type!=="Any"&&norm(p.job_type)===norm(j.job_type))r.push("Preferred job type");
 if(Number(p.experience_years||0)>=Number(j.experience_min||0)&&Number(p.experience_years||0)<=Number(j.experience_max||99))r.push("Experience range match");
 if((Date.now()-new Date(j.posted_at).getTime())/86400000<3)r.push("Recently posted");
 return r.length?r:["General profile compatibility"];
}
module.exports={scoreJob,reasons};
