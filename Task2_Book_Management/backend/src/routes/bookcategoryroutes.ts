// const {createuser} = require('../controller/usercontroller')
import { BookrDetails } from "../controller/bookcategorycontroller";
import { Router } from "express";
import { AdminToken } from "../middleware/usermiddleware";
const BookDetail = new BookrDetails();
const user = new AdminToken();

const bookrouter = Router();

bookrouter.post("/addbooks", user.verifyAdminToken, BookDetail.createbook);

bookrouter.get("/getbooks", BookDetail.getbooks);

bookrouter.get("/getbooksbypageno/:pageno", BookDetail.getbooksbypageno);

bookrouter.get(
  "/getbooksCategorybysearch/",
  BookDetail.getbookscategorybysearch
);

bookrouter.put("/updatebook/:id", user.verifyAdminToken, BookDetail.updatebook);

bookrouter.delete(
  "/deletebook/:id",
  user.verifyAdminToken,
  BookDetail.deletebook
);

export default bookrouter;
