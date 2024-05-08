import mongoose, { startSession } from "mongoose";
import Books, { BookCategoryInterface } from "../models/bookescategory";
import { BookInter } from "../interfaces/bookcategoryinterface";
import Bookdetail, { BookrInterface } from "../models/books";

export class bookcategoryservices {
  async createbooks({ name }: BookInter): Promise<any> {
    const data: BookInter = await Books.create({ name });
    // data.save();
    return { user: data, status: true };
  }
  async getallbooks(): Promise<any> {
    const data: BookInter[] = await Books.find();

    return { user: data, status: true };
  }
  async getallbooksbysearch(searchTerm: any): Promise<any> {
    const regex = new RegExp(searchTerm.search, "i"); // 'i' makes the search case-insensitive
    const bookscategory = await Books.find({
      $or: [{ name: regex }],
    });
    return { bookscategory: bookscategory, status: true };
  }
  async getallbooksbypage(pageno: any): Promise<any> {
    const record = 5;
    const skip = (pageno - 1) * record;
    const data: Object | [] = await Books.find().skip(skip).limit(record);

    return { user: data, status: true };
  }

  async updatebooks(id: any, { name }: BookInter): Promise<any> {
    const data: BookInter | null = await Books.findByIdAndUpdate(id, {
      name,
    });
    return { user: data, status: true };
  }
  async deletebooks(id: any): Promise<any> {
    let session: mongoose.ClientSession | null = null;
    session = await mongoose.startSession();
    session.startTransaction();
    const data: BookInter | null = await Books.findById(id);
    console.log(data);
    if (data !== null) {
      await Bookdetail.deleteMany({ category: data._id });

      await Books.deleteMany({ _id: data._id });

      await session.commitTransaction();
      session.endSession();

      return { user: data, status: true };
    } else {
      return { message: "Book Not Deleted", status: false };
    }
  }
}
