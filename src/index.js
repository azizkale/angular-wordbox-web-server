import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'

import resolvers from './schema/resolvers'
import typeDefs from './schema/typeDefs'

const startServer = async () => {
  const app = express()

  await mongoose.connect('mongodb://localhost:27017/word', {
    useNewUrlParser: true,
  })

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  server.applyMiddleware({ app })

  app.listen({ port: 4000 }, () =>
    // eslint-disable-next-line no-console
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
    ),
  )
}

startServer()
