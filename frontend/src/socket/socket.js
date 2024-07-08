import { io } from "socket.io-client";
// const ENDPOINT = import.meta.env.VITE_BACKEND_URL;
const ENDPOINT = "wss://chat-app-backend-jack.vercel.app";
const socket = io(ENDPOINT, {
	transports: ["websocket"],
});

export default socket;
