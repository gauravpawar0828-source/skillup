const r=require("express").Router(),a=require("../middleware/auth"),c=require("../controllers/profileController");
r.get("/",a(["USER"]),c.get);r.put("/",a(["USER"]),c.update);module.exports=r;
