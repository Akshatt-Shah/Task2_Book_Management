// const {createuser} = require('../controller/usercontroller')
import { BookrDetails } from "../controller/bookcontroller";
import { Router } from "express";
import { AdminToken } from "../middleware/usermiddleware";
const BookDetail = new BookrDetails();
const user = new AdminToken();

const bookdetailsrouter = Router();

bookdetailsrouter.post(
  "/addbookdetails",
  user.verifyAdminToken,
  BookDetail.createbook
);

bookdetailsrouter.get("/getbooksdetails", BookDetail.getbooks);

bookdetailsrouter.get(
  "/getbooksdetailsbypageno/:pageno",
  BookDetail.getbooksbypageno
);

bookdetailsrouter.get("/getbooksdetailsbysearch", BookDetail.searchbook);

bookdetailsrouter.get("/getbooksdetailsbyfilter", BookDetail.searchbook);

bookdetailsrouter.put(
  "/updatebookdetails/:id",
  user.verifyAdminToken,
  BookDetail.updatebook
);

bookdetailsrouter.delete(
  "/deletebookdetails/:id",
  user.verifyAdminToken,
  BookDetail.deletebook
);

export default bookdetailsrouter;
