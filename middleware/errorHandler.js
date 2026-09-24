module.exports=(err,req,res,next)=>{
 console.error(err);
 res.status(500).json({success:false,message:"Server error",detail:process.env.NODE_ENV==="development"?err.message:undefined});
};
