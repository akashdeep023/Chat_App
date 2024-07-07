import { io } from "socket.io-client";
const ENDPOINT = import.meta.env.VITE_BACKEND_URL;
const socket = io(ENDPOINT, {
	cert:
		import.meta.env.VITE_NODE_ENV === "production"
			? import.meta.env.VITE_SSL_CERT
			: "",
	key:
		import.meta.env.VITE_NODE_ENV === "production"
			? import.meta.env.VITE_SSL_KEY
			: "",
	path: "/socket",
	reconnection: true,
	reconnectionAttempts: 10,
	transports: ["websocket", "polling"],
	// withCredentials: true,
});

export default socket;
