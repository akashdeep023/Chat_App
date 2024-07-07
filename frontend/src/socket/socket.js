import { io } from "socket.io-client";
// const ENDPOINT = import.meta.env.VITE_BACKEND_URL;
// const ENDPOINT = "ws://localhost:9000";
const ENDPOINT = "https://chat-app-backend-jack.vercel.app";
const socket = io(ENDPOINT, {
	path: "/socket",
	reconnection: true,
	reconnectionAttempts: 10,
	transports: ["websocket", "polling"],
	// withCredentials: true,
});

export default socket;
