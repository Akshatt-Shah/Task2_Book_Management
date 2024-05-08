// const {createuser} = require('../controller/usercontroller')
import { AuthorDetails } from "../controller/authorcontroller";
import { Router } from "express";
import { AdminToken } from "../middleware/usermiddleware";
const AuthorDetail = new AuthorDetails();
const user = new AdminToken();

const authorrouter = Router();

authorrouter.post(
  "/createauthor",
  user.verifyAdminToken,
  AuthorDetail.createauthor
);

authorrouter.get("/getauthor", AuthorDetail.getallauthor);

authorrouter.get("/getauthorbysearch", AuthorDetail.getallauthorbyseach);

authorrouter.get("/getauthorbypage/:pageno", AuthorDetail.pagination_of_author);

authorrouter.put(
  "/updateauthor/:id",
  user.verifyAdminToken,
  AuthorDetail.updateauthor
);

authorrouter.delete(
  "/deleteauthor/:id",
  user.verifyAdminToken,
  AuthorDetail.deleteauthor
);

export default authorrouter;
