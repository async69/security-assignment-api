import { gql } from "apollo-server-express"
import User from "./User/user"

const Linker = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }

  type ErrorType {
    type: Int
    message: String
  }
`

export default [
  Linker, User
]