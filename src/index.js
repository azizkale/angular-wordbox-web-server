import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import http from 'http';
import resolvers from './schema/resolvers/index.js';
import typeDefs from './schema/typeDefs/index.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

(async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const app = express();
        app.use(express.json());

        const server = new ApolloServer({
            typeDefs,
            resolvers,
        });

        await server.start();

        server.applyMiddleware({
            app,
            cors: {
                origin: ['http://localhost:4200', 'http://192.168.0.17:4200'],
            },
        });

        app.get('/api', (req, res) => {
            res.send('api works!');
        });

        const httpServer = http.createServer(app);
        httpServer.listen(PORT, () => {
            console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
})();