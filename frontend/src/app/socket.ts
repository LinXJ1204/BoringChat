import { io } from 'socket.io-client';



export const socket = io(process.env.NEXT_PUBLIC_HOST || "http://140.119.164.32:5001", {
    autoConnect: false
});