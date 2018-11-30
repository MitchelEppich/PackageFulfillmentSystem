const { makeExecutableSchema } = require("graphql-tools");
const resolvers = require("./resolvers");

const typeDefs = `
type Query {
  user(input: UserInput!): User
  allUsers(filter: UserFilter): [User]!
  log(input: LogInput!): Log
  allLogs(filter: LogFilter): [Log]!
  fetchOrderList(input: OrderListInput): String
  fetchOrder(input: OrderInput): String
}

input OrderInput {
  invoice_id: String
}

input OrderListInput {
  headers: String
  url: String
}

input UserFilter {
  OR: [UserFilter!]
  is_admin: Boolean
}

type User {
  _id: String
  username: String
  name: String
  badge: String
  locked: Boolean
  token: String
  admin: Boolean
  createdAt: String
}

input UserInput {
  username: String
  name: String
  badge: String
  locked: Boolean
  token: String
  admin: Boolean
}

input LogFilter {
  OR: [LogFilter!]
}

type Log {
  _id: String
  who: String
  task: String
  createdAt: String
}

input LogInput {
  who: String
  task: String
  createdAt: String
}

type Mutation {
  verifyCredentials(input: UserInput!): User
  registerCredentials(input: UserInput!): User

  createActionLog(input: LogInput!): Log
}

`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = schema;
