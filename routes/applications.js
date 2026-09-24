const r=require("express").Router(),a=require("../middleware/auth"),c=require("../controllers/applicationController");
r.get("/",a(["USER"]),c.list);r.post("/",a(["USER"]),c.create);r.put("/:id",a(["USER"]),c.update);module.exports=r;
