import { io } from "socket.io-client";
const ENDPOINT = import.meta.env.VITE_BACKEND_URL;
console.log(ENDPOINT);
const socket = io(ENDPOINT, {
	transports: ["polling"],
	// path: "/api/new/socket",
});

export default socket;
