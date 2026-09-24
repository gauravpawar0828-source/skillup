exports.email=v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v||""));
exports.password=v=>String(v||"").length>=6;
exports.required=(v)=>String(v||"").trim().length>0;
