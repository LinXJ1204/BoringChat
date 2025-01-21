import { io } from 'socket.io-client';

export const socket = io('http://192.168.212.35:5001', {
    autoConnect: false
});