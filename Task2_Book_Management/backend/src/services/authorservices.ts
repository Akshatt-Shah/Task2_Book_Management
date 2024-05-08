import mongoose, { startSession } from "mongoose";
import Author, { AuthorInterface } from "../models/author";
import { AuthorInter } from "../interfaces/authorinterface";
import Bookdetail, { BookrInterface } from "../models/books";

export class Authorservices {
  async createauthor({
    name,
    biography,
    nationality,
  }: AuthorInter): Promise<any> {
    const data: AuthorInter = await Author.create({
      name,
      biography,
      nationality,
    });

    return { user: data, status: true };
  }

  async getallauthor(): Promise<any> {
    const data: AuthorInter[] = await Author.find({});
    return { user: data, status: true };
  }

  async getallauthorbysearch(searchTerm: any): Promise<any> {
    const regex = new RegExp(searchTerm.search, "i"); // 'i' makes the search case-insensitive
    const author = await Author.find({
      $or: [{ name: regex }, { biography: regex }, { nationality: regex }],
    });
    return { user: author, status: true };
  }

  async deleteauthor(id: any): Promise<any> {
    try {
      let session: mongoose.ClientSession | null = null;
      session = await mongoose.startSession();
      session.startTransaction();
      const data = await Author.findById(id);
      if (data !== null) {
        await Bookdetail.deleteMany({ author: data._id });

        await Author.deleteMany({ _id: data._id });

        await session.commitTransaction();
        session.endSession();

        return { message: "Author Deleted Successfully", status: true };
      } else {
        return { message: "Author Not Deleted", status: false };
      }
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async updateauthor(
    id: any,
    { name, biography, nationality }: AuthorInter
  ): Promise<any> {
    const data: AuthorInter | null = await Author.findByIdAndUpdate(id, {
      name,
      biography,
      nationality,
    });
    return { user: data, status: true };
  }
  async findauthorbypagination(pageno: any): Promise<any> {
    const record = 5;
    const skip = (pageno - 1) * record;
    const data: Object | [] = await Author.find().skip(skip).limit(record);
    return { user: data, status: true };
  }

  //   async logineuser({
  //     name: name,
  //     password: password,
  //   }: UserInter): Promise<any> {
  //     console.log(name, password);
  //     const data: UserInterface[] | null = await user.findOne({ name: name });
  //     console.log(data);
  //     return { user: data, status: true };
  //   }
}
