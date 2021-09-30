import { ApolloServer, gql } from 'apollo-server';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
const UserAPI = require('./datasources/UserAPI');

const dataSources = () => ({
    UserAPI: new UserAPI(),
  });

const server = new ApolloServer({typeDefs, resolvers,dataSources});

server.listen().then(({url}:{url: string}) => {
    console.log(`Server listening at ${url}`);
})