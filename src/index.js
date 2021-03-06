import { GraphQLServer, PubSub } from "graphql-yoga";

import prisma from "./prisma";
import db from "./db";
import { resolvers, fragmentReplacements } from "./resolvers";

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context(request) {
    return {
      db,
      pubsub,
      prisma,
      request
    };
  },
  fragmentReplacements
});

server.start({ port: 4001 }, ({ port }) =>
  console.log(`Server started on port ${port}`)
);
