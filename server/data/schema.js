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

  allSttCaches: [String]
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
  invoiceId: String
  invoiceNumber: String
  itemContent: String
  entryContent: String
  orderDate: String
  customerName: String
  customerEmail: String
  customerPhone:String
  totalCost:Float
  companyName: String
  lastUpdate: String
  status: String
  editBy: [String]
  claimed: Boolean
  notes: [String]
  totalItems: Int
}

input OrderInput {
  invoiceId: String
  invoiceNumber: String
  itemContent: String
  entryContent: String
  orderDate: String
  customerName: String
  customerEmail: String
  customerPhone:String
  totalCost:Float
  companyName: String
  status: String
  who: String
  claimed: Boolean
  note: String
  notes: [String]
  totalItems: Int
}

type SttCache {
  cachedValues: [String]
}

input SttCacheInput {
  values: [String]
}

input SotiInput {
  content: String
}

type Subscription {
  orderUpdate(orderId: String): Order
  userUpdate: User
  logUpdate: Log
}

type Mutation {
  postOrderToSoti(input: SotiInput!): String

  verifyCredentials(input: UserInput!): User
  registerCredentials(input: UserInput!): User
  updateUser(input: UserInput!): User
  deleteUser(input: UserInput!): User

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
