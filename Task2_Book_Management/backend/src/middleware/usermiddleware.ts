const jwt = require("jsonwebtoken");
import { Request, Response } from "express";
import user from "../models/usermodel";
export class AdminToken {
  async verifyAdminToken(req: Request, res: Response, next: any) {
    // Extract the token from the request headers
    try {
      console.log("Middleware");
      // const tokennn = req.headers.authorization;
      const tokennn = req.cookies.usertoken;
      if (!tokennn) {
        return res.json({
          error:
            "If You Want To Modify Product Then Please Login With Admin Account",
          status: false,
        });
      }

      const decoded = jwt.verify(
        tokennn,
        "your-secret-key",
        async (err: any, decoded: any) => {
          if (err) {
            console.error("JWT verification error:", err.message);
            return res.json({
              error: "Unauthorized: Invalid token",
              status: false,
            });
          } else {
            const data: any = await user.findById(decoded.id);
            console.log(data);
            if (data.type === "admin") {
              next();
            } else {
              return res.json({
                error: "Only Admin Can Access This Page",
                status: false,
              });
            }
          }

          // Store decoded user information in request object for further use
          // req.users = decoded;
          //  // Call the next middleware or route handler
        }
      );
    } catch (error: any) {
      return res.json({ message: error.message, status: false });
    }
  }

  async verifyAuthorToken(req: Request, res: Response, next: any) {
    // Extract the token from the request headers
    try {
      console.log("Middleware");
      // const tokennn = req.headers.authorization;
      const tokennn = req.cookies.usertoken;
      if (!tokennn) {
        return res.json({
          error:
            "If You Want To Modify Product Then Please Login With Admin Account",
          status: false,
        });
      }

      const decoded = jwt.verify(
        tokennn,
        "your-secret-key",
        async (err: any, decoded: any) => {
          if (err) {
            console.error("JWT verification error:", err.message);
            return res.json({
              error: "Unauthorized: Invalid token",
              status: false,
            });
          } else {
            const data: any = await user.findById(decoded.id);
            console.log(data);
            if (data.type === "author") {
              next();
            } else {
              return res.json({
                error: "Only Author Can Access This Page",
                status: false,
              });
            }
          }

          // Store decoded user information in request object for further use
          // req.users = decoded;
          //  // Call the next middleware or route handler
        }
      );
    } catch (error: any) {
      return res.json({ message: error.message, status: false });
    }
  }

  async verifyUserToken(req: Request, res: Response, next: any) {
    // Extract the token from the request headers
    try {
      console.log("Middleware");
      // const tokennn = req.headers.authorization;
      const tokennn = req.cookies.usertoken;
      if (!tokennn) {
        return res.json({
          error:
            "If You Want To Modify Product Then Please Login With Admin Account",
          status: false,
        });
      }

      const decoded = jwt.verify(
        tokennn,
        "your-secret-key",
        async (err: any, decoded: any) => {
          if (err) {
            console.error("JWT verification error:", err.message);
            return res.json({
              error: "Unauthorized: Invalid token",
              status: false,
            });
          } else {
            const data: any = await user.findById(decoded.id);
            console.log(data);
            if (data.type === "user") {
              next();
            } else {
              return res.json({
                error: "Only User Can Access This Page",
                status: false,
              });
            }
          }

          // Store decoded user information in request object for further use
          // req.users = decoded;
          //  // Call the next middleware or route handler
        }
      );
    } catch (error: any) {
      return res.json({ message: error.message, status: false });
    }
  }
}
