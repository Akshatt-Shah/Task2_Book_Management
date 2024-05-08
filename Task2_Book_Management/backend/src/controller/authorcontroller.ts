import Author, { AuthorInterface } from "../models/author";
import { AuthorInter } from "../interfaces/authorinterface";
import { Request, Response } from "express";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { Authorservices } from "../services/authorservices";
const Authorservice = new Authorservices();
export class AuthorDetails {
  async createauthor(req: Request, res: Response) {
    console.log("first");
    try {
      // console.log("create User")
      let { name, biography, nationality }: AuthorInter = req.body; // Assuming req.body contains pname and price

      const user = await Authorservice.createauthor({
        name,
        biography,
        nationality,
      });

      console.log("Author Added Successfully:", user);
      res.json(user);
    } catch (err) {
      console.error("Error adding user:", err);
      res.status(400).json({
        message: "Author Already added please choose another name",
        status: false,
      });
    }
  }

  async getallauthor(req: Request, res: Response) {
    try {
      const user = await Authorservice.getallauthor();
      if (user.length !== 0) {
        res.json(user);
      } else {
        res.status(400).json({ message: "Author Not Available", status: true });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error Occured During Get Request ", status: false });
    }
  }
  async getallauthorbyseach(req: Request, res: Response) {
    try {
      const searchTerm: any = req.query;
      const author = await Authorservice.getallauthorbysearch(searchTerm);
      if (author.length !== 0) {
        res.json(author);
      } else {
        res.status(400).json({ message: "Author Not Available", status: true });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error Occured During Get Request ", status: false });
    }
  }

  async updateauthor(req: Request, res: Response) {
    try {
      // console.log("create User")
      const id = req.params.id;
      let { name, biography, nationality }: AuthorInter = req.body; // Assuming req.body contains pname and price

      const user = await Authorservice.updateauthor(id, {
        name,
        biography,
        nationality,
      });

      console.log("Author Added Successfully:");
      res.json(user);
    } catch (err) {
      console.error("Error adding Author:", err);
      res.status(500).json({
        message: "Author Does Not Updated Please Try Again!!!!!!",
        status: false,
      });
    }
  }

  async deleteauthor(req: Request, res: Response) {
    try {
      // console.log("create User")
      const id = req.params.id;

      // await profile.deleteMany({ userid: id });
      console.log("first");
      const user = await Authorservice.deleteauthor(id);

      res.json(user);
      // console.log("User Deleted Successfully:");
      // res.json({ message: "User Deleted Successfully", status: true });
    } catch (err) {
      console.error("Error Deleting user:", err);
      res.status(400).json({
        message: "User Does Not Deleted Please Try Again!!!!!!",
        status: false,
      });
    }
  }

  async pagination_of_author(req: Request, res: Response) {
    try {
      // console.log("create User")
      const pageno = req.params.pageno;

      // await profile.deleteMany({ userid: id });
      console.log("first");
      const user = await Authorservice.findauthorbypagination(pageno);

      res.json(user);
      // console.log("User Deleted Successfully:");
      // res.json({ message: "User Deleted Successfully", status: true });
    } catch (err) {
      console.error("Error Deleting user:", err);
      res.status(400).json({
        message: "User Does Not Deleted Please Try Again!!!!!!",
        status: false,
      });
    }
  }

  // async loginuser(req: Request, res: Response) {
  //   try {
  //     const { name, password }: UserInter = req.body;
  //     if (
  //       name !== undefined &&
  //       password !== undefined &&
  //       name.valueOf().length > 0 &&
  //       password.valueOf().length > 0
  //     ) {
  //       const data = await userservice.logineuser({
  //         name: name,
  //         password: password,
  //       });

  //       if (data.length != 0) {
  //         console.log("first");
  //         console.log(data);
  //         console.log(password);
  //         const isAuthentic = await bcrypt.compare(
  //           password,
  //           data.user.password
  //         );
  //         if (isAuthentic === true) {
  //           const token = jwt.sign({ id: data.user._id }, "your-secret-key", {
  //             expiresIn: "12h",
  //           });
  //           res.cookie("usertoken", token);
  //           res.json({
  //             message: "Login Successfull",
  //             status: true,
  //             token: token,
  //           });
  //         } else {
  //           res
  //             .status(400)
  //             .json({ message: "Login Unsuccessfull", status: false });
  //         }
  //       }
  //     } else {
  //       res
  //         .status(400)
  //         .json({ message: "Please Provide Value In Body", status: false });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ message: "Login Failed Due To Some Reason" });
  //   }
  // }
  // async logoutuser(req: Request, res: Response) {
  //   try {
  //     const token = Object.keys(req.cookies);
  //     if (token.length > 0) {
  //       token.forEach((cookie) => {
  //         res.clearCookie(cookie);
  //       });

  //       res.status(400).json({ message: "Logout Successful", status: true });
  //     } else {
  //       return res
  //         .status(400)
  //         .json({ message: "User Already Logout", status: false });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ message: "Login Failed Due To Some Reason" });
  //   }
  // }
}
