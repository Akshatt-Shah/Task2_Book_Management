import mongoose, { startSession } from "mongoose";
import user, { UserInterface } from "../models/usermodel";
import { UserInter } from "../interfaces/userinterface";

export class userservices {
  async createuser({ name, password, type }: UserInter): Promise<any> {
    const data: UserInterface = await user.create({ name, password, type });
    data.save();
    return { user: data, status: true };
  }

  async getalluser(): Promise<any> {
    const data: UserInterface[] = await user.find({});
    return { user: data, status: true };
  }

  async getalluserbysearch(searchTerm: any): Promise<any> {
    const regex = new RegExp(searchTerm.search, "i");
    const User = await user.find({
      $or: [{ name: regex }],
    });
    return { user: User, status: true };
  }

  async deleteuser(id: any): Promise<any> {
    let session: mongoose.ClientSession | null = null;

    try {
      await user.findByIdAndDelete(id);

      return { message: "User Deleted Successfully", status: true };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async updateuser(id: any, { name, password, type }: UserInter): Promise<any> {
    const data: UserInterface | null = await user.findByIdAndUpdate(id, {
      name,
      password,
      type,
    });
    return { user: data, status: true };
  }

  async logineuser({
    name: name,
    password: password,
  }: UserInter): Promise<any> {
    console.log(name, password);
    const data: UserInterface[] | null = await user.findOne({ name: name });
    console.log(data);
    return { user: data, status: true };
  }
}
