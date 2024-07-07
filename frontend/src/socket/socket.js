import { io } from "socket.io-client";
const ENDPOINT = import.meta.env.VITE_BACKEND_URL;
const socket = io(ENDPOINT, {
	path: "/socket",
	reconnection: true,
	reconnectionAttempts: 10,
	transports: ["websocket", "polling"],
	// withCredentials: true,
});

export default socket;
