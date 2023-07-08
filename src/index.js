import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import resolvers from './schema/resolvers/index.js'
import typeDefs from './schema/typeDefs/index.js'

const startServer = async() => {
    const app = express()
    dotenv.config()

    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
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