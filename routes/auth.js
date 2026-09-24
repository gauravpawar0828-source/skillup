const router=require("express").Router(),c=require("../controllers/authController");
router.post("/register",c.register);router.post("/login",c.login);router.post("/admin-login",c.adminLogin);module.exports=router;
