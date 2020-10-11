import UserModel, { User, UserDocument } from "../models/User";

export default class UserStore {
  create = async (params: User): Promise<UserDocument | null> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = (await UserModel.create(params)).toObject();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return user;
  };

  read = async (id: string): Promise<UserDocument | null> => {
    return UserModel.findOne({ _id: id });
  };
}
