import Bookdetail, { BookrInterface } from "../models/books";
import { BookrInter } from "../interfaces/bookinterface";
import { Request, Response } from "express";

const jwt = require("jsonwebtoken");
import { bookservices } from "../services/bookservices";
const bookservice = new bookservices();

export class BookrDetails {
  async createbook(req: Request, res: Response) {
    try {
      // console.log("create User")
      let { title, author, category, description, isbn, price }: BookrInter =
        req.body; // Assuming req.body contains pname and price

      const book = await bookservice.createbooks({
        title,
        author,
        category,
        description,
        isbn,
        price,
      });

      console.log("Books Added Successfully:", book);
      res.json(book);
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
  async getbooksbypageno(req: Request, res: Response) {
    try {
      const pageno: any = req.params.pageno;
      const books = await bookservice.getallbooksbypageno(pageno);
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
  async searchbook(req: Request, res: Response) {
    try {
      const searchTerm: any = req.query;
      const books = await bookservice.searchbookdetails(searchTerm);
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
  // async filterbooks(req: Request, res: Response) {
  //   try {
  //     const searchTerm: any = req.query;
  //     console.log(searchTerm.filter);
  //     if (searchTerm.filter) {
  //       const books = await bookservice.searchbookdetails(searchTerm);
  //       if (books) {
  //         res.json(books);
  //       } else {
  //         res
  //           .status(400)
  //           .json({ message: "Books Not Available", status: true });
  //       }
  //     } else {
  //       return { message: "Please Provide Value In Body......." };
  //     }
  //   } catch (error) {
  //     res
  //       .status(500)
  //       .json({ message: "Error Occured During Get Request ", status: false });
  //   }
  // }

  async updatebook(req: Request, res: Response) {
    try {
      // console.log("create User")
      const id = req.params.id;
      let { title, author, category, description, isbn, price }: BookrInter =
        req.body; // Assuming req.body contains pname and price

      const books = await bookservice.updatebooks(id, {
        title,
        author,
        category,
        description,
        isbn,
        price,
      });

      console.log("Book Updated Successfully:");
      res.json({ message: "Book Updated Successfully", status: true });
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
      res.json({ message: "Book Deleted Successfully", status: true });
    } catch (err) {
      console.error("Error Deleting books:", err);
      res.status(500).json({
        message: "Book Does Not Deleted Please Try Again!!!!!!",
        status: false,
      });
    }
  }
}
