import express from "express";
//graphql
import {ApolloServer} from "apollo-server-express";
import {typeDefs} from "./data/schema";
import {resolvers} from './data/resolvers'

const app = express();
const server = new ApolloServer({typeDefs, resolvers});
const port_server = "4000";

server.applyMiddleware({app});

app.listen({port: port_server}, () => console.log(`El servidor esta corriendo http://localhost:${port_server}${server.graphqlPath}`));