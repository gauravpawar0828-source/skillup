const r=require("express").Router(),a=require("../middleware/auth"),c=require("../controllers/jobController");
r.get("/",c.list);r.get("/recommendations",a(["USER"]),c.recommend);r.get("/:id",c.get);module.exports=r;
