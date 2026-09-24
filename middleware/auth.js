const jwt=require("jsonwebtoken");
module.exports=(roles=[])=> (req,res,next)=>{
  const h=req.headers.authorization||"";
  const token=h.startsWith("Bearer ")?h.slice(7):null;
  if(!token)return res.status(401).json({success:false,message:"Authentication required"});
  try{
    req.user=jwt.verify(token,process.env.JWT_SECRET||"change_me");
    if(roles.length&&!roles.includes(req.user.role))return res.status(403).json({success:false,message:"Access denied"});
    next();
  }catch(e){return res.status(401).json({success:false,message:"Invalid or expired token"});}
};
