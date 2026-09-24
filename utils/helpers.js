exports.sign=(jwt,user)=>jwt.sign(
 {id:user.id,email:user.email,name:user.name,role:user.role},
 process.env.JWT_SECRET||"change_me",{expiresIn:"7d"}
);
exports.profileCompletion=p=>{
 const checks=[p.headline,p.education,p.skills,p.preferred_location,p.work_mode,p.job_type,Number(p.experience_years)>=0];
 return Math.round(checks.filter(Boolean).length/checks.length*100);
};
