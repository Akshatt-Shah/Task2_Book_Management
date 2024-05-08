import User, { UserInterface } from "../models/usermodel";
import { BookInter } from "../interfaces/bookcategoryinterface";
import { Request, Response } from "express";

const jwt = require("jsonwebtoken");
import { bookcategoryservices } from "../services/bookcategoryservices";
const bookservice = new bookcategoryservices();

export class BookrDetails {
  async createbook(req: Request, res: Response) {
    try {
      // console.log("create User")
      let { name }: BookInter = req.body; // Assuming req.body contains pname and price

      if (name !== undefined && name.valueOf().length > 0) {
        const book = await bookservice.createbooks({ name });

        console.log("Books Added Successfully:", book);
        res.json({ message: "Books Registration Successfully", status: true });
      } else {
        res
          .status(400)
          .json({ message: "Please Provide Value In Body", status: false });
      }
    } catch (err) {
      console.error("Error adding user:", err);
      res.status(400).json({
        message: "Books Already added please choose another name",
        status: false,
      });
    }
  }

  async getbooks(req: Request, res: Response) {
    try {
      const books = await bookservice.getallbooks();
      if (books.length !== 0) {
        res.json(books);
      } else {
        res.status(400).json({ message: "Books Not Available", status: true });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error Occured During Get Request ", status: false });
    }
  }
  async getbookscategorybysearch(req: Request, res: Response) {
    try {
      const searchTerm: any = req.query;
      const books = await bookservice.getallbooksbysearch(searchTerm);
      if (books.length !== 0) {
        res.json(books);
      } else {
        res.status(400).json({ message: "Books Not Available", status: true });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error Occured During Get Request ", status: false });
    }
  }
  async getbooksbypageno(req: Request, res: Response) {
    try {
      const pageno = req.params.pageno;

      const books = await bookservice.getallbooksbypage(pageno);
      if (books.length !== 0) {
        res.json(books);
      } else {
        res.status(400).json({ message: "Books Not Available", status: true });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error Occured During Get Request ", status: false });
    }
  }

  async updatebook(req: Request, res: Response) {
    try {
      // console.log("create User")
      const id = req.params.id;
      let { name }: BookInter = req.body; // Assuming req.body contains pname and price
      if (name !== undefined && name.valueOf().length > 0) {
        const books = await bookservice.updatebooks(id, { name });

        console.log("Book Added Successfully:");
        res.json({ message: "Book Updated Successfully", status: true });
      } else {
        res
          .status(400)
          .json({ message: "Please Provide Value In Body", status: false });
      }
    } catch (err) {
      console.error("Error adding user:", err);
      res.status(500).json({
        message: "Book Does Not Updated Please Try Again!!!!!!",
        status: false,
      });
    }
  }
  async deletebook(req: Request, res: Response) {
    try {
      // console.log("create User")
      const id = req.params.id;

      const books = await bookservice.deletebooks(id);

      console.log("Book Deleted Successfully:");
      res.json({ message: books, status: true });
    } catch (err) {
      console.error("Error Deleting books:", err);
      res.status(500).json({
        message: "Book Does Not Deleted Please Try Again!!!!!!",
        status: false,
      });
    }
  }
}
