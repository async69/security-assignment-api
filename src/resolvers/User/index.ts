import { UserModel } from "../../models/User/user.model"
import { GQLPostUser, GQLEditUser, IUserDoc, IUserID, ILoginInput } from "../../models/User/user.types"
import DBWrapper from "../../wrappers/APIGenerator"
import bcrypt from 'bcrypt'

const DBModel = new DBWrapper(UserModel)
const { Create, Edit, Fetch, FetchOne, Remove, RemoveAll } = DBModel.getAPICalls()

const UserResolver = {
  Query: {
    async fetchUsers(_: any, prop: any): Promise<IUserDoc[]> {
      return await Fetch() as unknown as IUserDoc[]
    },
    async fetchUserByID(_: any, prop: IUserID): Promise<IUserDoc> {
      return await FetchOne(prop._id) as unknown as IUserDoc
    }
  },

  Mutation: {
    async postUser(_: any, prop: GQLPostUser): Promise<IUserDoc> {
      const hashedPwd = bcrypt.hashSync(prop.input.password, 10)
      return await Create({
        ...prop.input,
        password: hashedPwd
      }) as unknown as IUserDoc
    },
    async editUser(_: any, prop: GQLEditUser): Promise<IUserDoc> {
      return await Edit(prop.input) as unknown as IUserDoc
    },
    async removeAllUsers(_: any, prop: any): Promise<IUserDoc[]> {
      return await RemoveAll() as unknown as IUserDoc[]
    },
    async removeUser(_: any, prop: any) {
      return await Remove(prop._id) as unknown as IUserDoc
    },
    async signIn(_:any, prop: ILoginInput) {
      const foundUser = await FetchOne(prop.email, "email") as unknown as IUserDoc
      if (foundUser.error) {
        return foundUser;
      }
      const isEqual = bcrypt.compareSync(prop.password, foundUser.password)
      if (!isEqual) {
        return { error: { type: 400, message: "Incorrect email or password" }}
      } else {
        return foundUser
      }
    }
  }
}

export default UserResolver