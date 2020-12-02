import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import bodyParser from 'body-parser'
import cors from 'cors'
import routerIsAuth from './Routes/isAuth'

import resolvers from './schema/resolvers'
import typeDefs from './schema/typeDefs'

const startServer = async () => {
  const app = express()
  dotenv.config()

  app.use(cors())
  app.use(bodyParser.json())
  // Router of isAuth
  app.use('/apiIsAuth', routerIsAuth)

  await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
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
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}ql`,
    ),
  )
}

startServer()
