import { gql } from "apollo-server-express"

export default gql`
  extend type Query {
    fetchUsers: [UserDoc]
    fetchUserByID(_id: String!): UserDoc
  }

  extend type Mutation {
    postUser(input: IUserInput!): UserDoc
    editUser(input: IUserEdit!): UserDoc
    removeUser(_id: String!): UserDoc
    removeAllUsers: [UserDoc]
    signIn(email: String!, password: String!): UserDoc
  }

  type UserDoc {
    _id: String
    name: String
    phoneNumber: String
    email: String
    password: String
    userType: String
    hasUserDetail: Boolean
    error: ErrorType
    createdAt: String
    updatedAt: String
  }

  input IUserInput {
    name: String!
    phoneNumber: String!
    email: String!
    password: String!
    userType: String!
    hasUserDetail: Boolean
  }

  input IUserEdit {
    _id: String!
    name: String
    phoneNumber: String
    email: String
    password: String
    userType: String
    hasUserDetail: Boolean
  }

`