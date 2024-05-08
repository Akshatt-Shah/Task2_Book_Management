import User, { UserInterface } from "../models/usermodel";
import { UserInter } from "../interfaces/userinterface";
import { Request, Response } from "express";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { userservices } from "../services/userservices";
const userservice = new userservices();
export class UserDetails {
  async createuser(req: Request, res: Response) {
    console.log("first");
    try {
      // console.log("create User")
      let { name, password, type }: UserInter = req.body; // Assuming req.body contains pname and price

      if (
        name !== undefined &&
        password !== undefined &&
        name.valueOf().length > 0 &&
        password.valueOf().length > 0
      ) {
        password = await bcrypt.hash(password, 10);
        console.log(password);
        console.log({ name, password });
        const user = await userservice.createuser({ name, password, type });

        console.log("User Added Successfully:", user);
        res.json({ message: "User Registration Successfully", status: true });
      } else {
        res
          .status(400)
          .json({ message: "Please Provide Value In Body", status: false });
      }
    } catch (err) {
      console.error("Error adding user:", err);
      res.status(400).json({
        message: "User Already added please choose another name",
        status: false,
      });
    }
  }

  async getuser(req: Request, res: Response) {
    try {
      const user = await userservice.getalluser();
      if (user.length !== 0) {
        res.json(user);
      } else {
        res.status(400).json({ message: "User Not Available", status: true });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error Occured During Get Request ", status: false });
    }
  }
  async getuserbysearch(req: Request, res: Response) {
    try {
      const searchTerm: any = req.query;
      const user = await userservice.getalluserbysearch(searchTerm);
      if (user.length !== 0) {
        res.json(user);
      } else {
        res.status(400).json({ message: "User Not Available", status: true });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error Occured During Get Request ", status: false });
    }
  }

  async updateuser(req: Request, res: Response) {
    try {
      // console.log("create User")
      const id = req.params.id;
      let { name, password, type }: UserInterface = req.body; // Assuming req.body contains pname and price
      if (
        name !== undefined &&
        password !== undefined &&
        name.valueOf().length > 0 &&
        password.valueOf().length > 0
      ) {
        password = await bcrypt.hash(password, 10);
        console.log({ name, password });
        const user = await userservice.updateuser(id, { name, password, type });

        console.log("User Added Successfully:");
        res.json({ message: "User Updated Successfully", status: true });
      } else {
        res
          .status(400)
          .json({ message: "Please Provide Value In Body", status: false });
      }
    } catch (err) {
      console.error("Error adding user:", err);
      res.status(500).json({
        message: "User Does Not Updated Please Try Again!!!!!!",
        status: false,
      });
    }
  }

  async deleteuser(req: Request, res: Response) {
    try {
      // console.log("create User")
      const id = req.params.id;
      // const token = Object.keys(req.cookies);
      // if (token.length > 0) {
      //   token.forEach((cookie) => {
      //     res.clearCookie(cookie);
      //   });
      // }
      // await profile.deleteMany({ userid: id });
      console.log("first");
      const user = await userservice.deleteuser(id);

      res.json(user);
    } catch (err) {
      console.error("Error Deleting user:", err);
      res.status(400).json({
        message: "User Does Not Deleted Please Try Again!!!!!!",
        status: false,
      });
    }
  }

  async loginuser(req: Request, res: Response) {
    try {
      const { name, password }: UserInter = req.body;
      if (
        name !== undefined &&
        password !== undefined &&
        name.valueOf().length > 0 &&
        password.valueOf().length > 0
      ) {
        const data = await userservice.logineuser({
          name: name,
          password: password,
        });

        if (data.length != 0) {
          console.log("first");
          console.log(data);
          console.log(password);
          const isAuthentic = await bcrypt.compare(
            password,
            data.user.password
          );
          if (isAuthentic === true) {
            const token = jwt.sign({ id: data.user._id }, "your-secret-key", {
              expiresIn: "12h",
            });
            res.cookie("usertoken", token);
            res.json({
              message: "Login Successfull",
              status: true,
              token: token,
            });
          } else {
            res
              .status(400)
              .json({ message: "Login Unsuccessfull", status: false });
          }
        }
      } else {
        res
          .status(400)
          .json({ message: "Please Provide Value In Body", status: false });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Login Failed Due To Some Reason" });
    }
  }
  async logoutuser(req: Request, res: Response) {
    try {
      const token = Object.keys(req.cookies);
      if (token.length > 0) {
        token.forEach((cookie) => {
          res.clearCookie(cookie);
        });

        res.status(400).json({ message: "Logout Successful", status: true });
      } else {
        return res
          .status(400)
          .json({ message: "User Already Logout", status: false });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Login Failed Due To Some Reason" });
    }
  }
}
