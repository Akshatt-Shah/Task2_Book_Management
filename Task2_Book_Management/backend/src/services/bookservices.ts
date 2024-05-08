import mongoose, { startSession } from "mongoose";
import Bookdetail, { BookrInterface } from "../models/books";
import { BookrInter } from "../interfaces/bookinterface";
import Author from "../models/author";
import bookescategory from "../models/bookescategory";
import { BookInter } from "../interfaces/bookcategoryinterface";
import author from "../models/author";

export class bookservices {
  async createbooks({
    title,
    author,
    category,
    description,
    isbn,
    price,
  }: BookrInter): Promise<any> {
    console.log(author);
    const authorid = await Author.findById(author);
    if (authorid !== null) {
      const categorydata = await bookescategory.findById(category);
      if (categorydata !== null) {
        const data: BookrInter = await Bookdetail.create({
          title,
          author,
          category,
          description,
          isbn,
          price,
        });
        // data.save();
        return { user: data, status: true };
      } else {
        return { message: "Category Is Not Available", status: false };
      }
    } else {
      return { message: "Author Is Not Available", status: false };
    }
  }
  async getallbooks(): Promise<any> {
    const data: BookrInter[] = await Bookdetail.find();
    return { user: data, status: true };
  }
  async getallbooksbypageno(pageno: any): Promise<any> {
    const record = 5;
    const skip = (pageno - 1) * record;
    const data: object = await Bookdetail.find().skip(skip).limit(record);
    return { user: data, status: true };
  }
  async searchbookdetails(searchTerm: any): Promise<any> {
    if (searchTerm.search) {
      try {
        const regex = new RegExp(searchTerm.search, "i"); // 'i' makes the search case-insensitive
        const books = await Bookdetail.find({
          $or: [{ title: regex }, { description: regex }],
        });

        return books;
      } catch (error) {
        console.error("Error searching books:", error);
        throw error;
      }
    } else if (searchTerm.filter) {
      try {
        const filter = searchTerm.filter;
        console.log(filter);
        const authordata = await author.findById(filter);
        const filteredBooks = await Bookdetail.find({
          $or: [{ category: filter }, { author: filter }],
        });
        console.log(filteredBooks);
        if (authordata) {
          // const category = await bookescategory.findById(filter);
          // if (category) {
          //   return {
          //     Authorname: authordata.name,
          //     category: category.name,
          //     filteredBooks,
          //   };
          // } else {
          return { authorname: authordata.name, filteredBooks };
          // }
        } else {
          const category = await bookescategory.findById(filter);
          if (category) {
            return {
              Category_Name: category.name,
              filteredBooks,
            };
          } else {
            return { message: "No data found ", status: false };
          }
        }
      } catch (error) {
        console.error("Error searching books:", error);
        return { message: "No data found", status: false };
      }
    }
  }
  // async filterbooks(filter: any): Promise<any> {
  //   try {
  //     console.log(filter);
  //     const authordata = await author.findById(filter);
  //     const filteredBooks = await Bookdetail.find({
  //       $or: [{ category: filter }, { author: filter }],
  //     });
  //     console.log(filteredBooks);
  //     if (authordata) {
  //       // const category = await bookescategory.findById(filter);
  //       // if (category) {
  //       //   return {
  //       //     Authorname: authordata.name,
  //       //     category: category.name,
  //       //     filteredBooks,
  //       //   };
  //       // } else {
  //       return { authorname: authordata.name, filteredBooks };
  //       // }
  //     } else {
  //       const category = await bookescategory.findById(filter);
  //       if (category) {
  //         return {
  //           Category_Name: category.name,
  //           filteredBooks,
  //         };
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error searching books:", error);
  //     return { message: "No data found", status: false };
  //   }
  // }

  async updatebooks(
    id: any,
    { title, author, category, description, isbn, price }: BookrInter
  ): Promise<any> {
    const data: BookInter | null = await Bookdetail.findByIdAndUpdate(id, {
      title,
      author,
      category,
      description,
      isbn,
      price,
    });
    return { user: data, status: true };
  }
  async deletebooks(id: any): Promise<any> {
    const data: BookInter | null = await Bookdetail.findByIdAndDelete(id);
    return { user: data, status: true };
  }
}
