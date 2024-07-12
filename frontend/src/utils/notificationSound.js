import tune from "../assets/tune.wav";

export const receivedSound = () => {
	const audio = new Audio(tune);
	audio.play().catch((error) => {
		console.error("Error playing the audio:", error);
	});
};
