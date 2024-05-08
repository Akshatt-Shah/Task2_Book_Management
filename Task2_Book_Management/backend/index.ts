import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// const router = require("./src/routes/userroutes");
// router

// const prouter = require("./routes/profileroutes");
// const productrouter = require("./routes/productroutes");
// const cartrouter = require("./routes/cartroutes");
// const pdfrouter = require("./routes/pdfroutes");
import cookieparser from "cookie-parser";
import router from "./src/routes/userroutes";
import bookrouter from "./src/routes/bookcategoryroutes";
import bookdetailsrouter from "./src/routes/booksroute";
import authorrouter from "./src/routes/authorroutes";

dotenv.config();
const app = express();
app.use(cookieparser());

// Middleware to parse JSON bodies
app.use(express.json());

app.use(router);
app.use(bookrouter);
app.use(bookdetailsrouter);
app.use(authorrouter);
// app.use(prouter);
// app.use(productrouter);
// app.use(cartrouter);
// app.use(pdfrouter);
let portString = process.env.PORT;
if (!portString) {
  portString = "5000";
}
const port = parseInt(portString);
const Mongo_Url = process.env.MONGO_URL;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
if (Mongo_Url) {
  mongoose
    .connect(
      "mongodb+srv://akshat:akki5101@cluster0.dxszy3f.mongodb.net/Task2_Book_Management?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
} else {
  console.log("MongoDB Not Connected");
}
