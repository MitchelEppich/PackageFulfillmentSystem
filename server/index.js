const next = require("next");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { execute, subscribe } = require("graphql");
const { createServer } = require("http");
const { SubscriptionServer } = require("subscriptions-transport-ws");

require("dotenv").config();

// our packages
const schema = require("./data/schema");

// next.js setup
const port = process.env.PORT || -1;
const url = process.env.URL || "FAILED";
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const subscriptionsPath = "/subscriptions";
const subscriptionsEndpoint = `ws://${url}:${port}${subscriptionsPath}`;

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.M_URL,
  { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("We are connected!"));

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(
      cors({
        origin: "*"
      })
    );

    // server.get("/watch/:_id", (req, res) => {
    //   app.render(req, res, "/", {});
    // });

    server.use(
      "/graphql",
      bodyParser.json(),
      graphqlExpress((req, res) => {
        return {
          schema,
          context: {
            token: req.headers.authorization
              ? req.headers.authorization.substring("Bearer ".length)
              : ""
          }
        };
      })
    );
    server.use(
      "/graphiql",
      graphiqlExpress({
        endpointURL: "/graphql",
        subscriptionsEndpoint: subscriptionsEndpoint
      })
    );

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    const ws = createServer(server);
    ws.listen(port, url, () => {
      // remove url before heroku!!
      console.log(`Apollo Server is now running on https://${url}:${port}`);
      // Set up the WebSocket for handling GraphQL subscriptions
      new SubscriptionServer(
        {
          execute,
          subscribe,
          schema
        },
        {
          server: ws,
          path: "/subscriptions"
        }
      );
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
