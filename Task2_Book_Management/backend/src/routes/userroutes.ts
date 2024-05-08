// const {createuser} = require('../controller/usercontroller')
import { UserDetails } from "../controller/usercontroller";
import { Router } from "express";
import { AdminToken } from "../middleware/usermiddleware";
const UserDetail = new UserDetails();
const user = new AdminToken();

const router = Router();

router.post("/createuser", UserDetail.createuser);

router.get("/getuser", user.verifyAdminToken, UserDetail.getuser);

router.get("/getuserbysearch", UserDetail.getuserbysearch);

router.put("/updateuser/:id", user.verifyAdminToken, UserDetail.updateuser);

router.delete("/deleteuser/:id", user.verifyAdminToken, UserDetail.deleteuser);

router.post("/loginuser", UserDetail.loginuser);

router.post("/logoutuser", user.verifyAdminToken, UserDetail.logoutuser);
export default router;
