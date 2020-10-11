import { Context } from "koa";
import { User } from "src/models/User";
import UserStore from "..//stores/User";

type KeyPair = { [key: string]: string };
export default class UserService {
  userStore: UserStore;

  constructor() {
    this.userStore = new UserStore();
  }

  create = async (ctx: Context): Promise<void> => {
    const { email, id: _id } = ctx.state.user as KeyPair;
    const { firstName, lastName, photo = "https://randomuser.me/api/portraits/lego/0.jpg" } = ctx
      .request.body as KeyPair;

    const { _id: id, ...rest } = (await this.userStore.create({
      _id,
      email,
      firstName,
      lastName,
      photo
    })) as User;

    ctx.body = { ...rest, id };
  };

  read = async (ctx: Context): Promise<void> => {
    const { id } = ctx.params as KeyPair;

    const user = await this.userStore.read(id);
    ctx.assert(user, 404, "User not found.");

    const { _id, email, firstName, lastName, photo } = (user as unknown) as KeyPair;
    ctx.body = { id: _id, email, firstName, lastName, photo };
  };
}
