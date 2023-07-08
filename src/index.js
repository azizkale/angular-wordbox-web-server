import { ApolloServer } from "apollo-server";
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors';
import express from 'express';
import http from 'http';
import resolvers from './schema/resolvers/index.js'
import typeDefs from './schema/typeDefs/index.js'
import { expressMiddleware } from '@apollo/server/express4';

dotenv.config();

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async() => {
        const app = express();
        const httpServer = http.createServer(app);

        const server = new ApolloServer({
            typeDefs,
            resolvers
        });

        await server.listen();

        await app.use(
            '/graphql',
            cors({
                origin: [
                    "http://localhost:4200",
                    "http://192.168.0.17:4200",
                ]
            }), expressMiddleware(server),

        );

        app.get('/api', (req, res) => {
            res.send('api works!')
        })

        await httpServer.listen(PORT, () => {
            console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
        });
    })
    .catch(error => {
        console.error("Failed to connect to MongoDB:", error);
    });