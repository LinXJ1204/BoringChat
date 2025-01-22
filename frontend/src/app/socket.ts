import { io } from 'socket.io-client';

export const socket = io('http://140.119.164.32:5001', {
    autoConnect: false
});