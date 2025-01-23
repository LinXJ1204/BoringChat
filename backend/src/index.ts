import express, { Request, Response } from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT =5001;
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {},
    cors: {
        origin: ["http://localhost:3000", "http://192.168.212.35:3000", "http://140.119.164.32:5002", "https://boringchats.xyz"]
    }
});

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
