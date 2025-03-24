import { io } from 'socket.io-client';



export const socket = io(process.env.NEXT_PUBLIC_HOST || "https://chat.boringchats.xyz", {
    autoConnect: false
});