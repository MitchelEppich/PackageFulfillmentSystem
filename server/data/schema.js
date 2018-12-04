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

input OrderListInput {
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
  online: Boolean
  createdAt: String
  lastAction: String
}

input UserInput {
  id: String
  username: String
  name: String
  badge: String
  locked: Boolean
  token: String
  admin: Boolean
  online: Boolean
  lastAction: String
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

type Order {
  _id: String
  content: String
  lastUpdate: String
  status: String
  editBy: [String]
  claimed: Boolean
}

input OrderInput {
  content: String
  status: String
  who: String
  claimed: Boolean
  invoiceId: String
}

type Subscription {
  orderUpdate(orderId: String): Order
  userUpdate: User
  logUpdate: Log
}

type Mutation {
  verifyCredentials(input: UserInput!): User
  registerCredentials(input: UserInput!): User
  updateUser(input: UserInput!): User

  updateOrder(input: OrderInput!): Order
  cacheOrder(input: OrderInput!): Order

  createActionLog(input: LogInput!): Log
}

`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = schema;
