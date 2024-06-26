import React, { useRef, useState } from "react";
import { FaFolderOpen, FaPaperPlane } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setSendLoading } from "../../redux/auth/conditionSlice";
import { addNewMessageId } from "../../redux/auth/messageSlice";
import { LuLoader } from "react-icons/lu";

const MessageSend = ({ chatId }) => {
	const mediaFile = useRef();
	const [inputText, setMessage] = useState("");
	const [mediaBox, setMediaBox] = useState(false);
	const [mediaURL, setMediaURL] = useState("");
	const dispatch = useDispatch();
	const isSendLoading = useSelector(
		(store) => store?.condition?.isSendLoading
	);
	// Media Box Control
	const handleMediaBox = () => {
		if (mediaFile.current?.files[0]) {
			const file = mediaFile.current.files[0];
			const url = URL.createObjectURL(file);
			setMediaURL(url);
			setMediaBox(true);
		} else {
			setMediaBox(false);
		}
	};
	// Media Box Hidden && Input file remove
	const clearMediaFile = () => {
		mediaFile.current.value = "";
		setMediaURL("");
		setMediaBox(false);
	};
	// Send Message Api call
	const handleSendMessage = async () => {
		if (inputText?.trim()) {
			const message = inputText?.trim();
			dispatch(setSendLoading(true));
			const token = localStorage.getItem("token");
			fetch(`${import.meta.env.VITE_BACKEND_URL}/api/message`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					message: message,
					chatId: chatId,
				}),
			})
				.then((res) => res.json())
				.then((json) => {
					dispatch(addNewMessageId(json?.data?._id));
					setMessage("");
					dispatch(setSendLoading(false));
				})
				.catch((err) => {
					console.log(err);
					dispatch(setSendLoading(false));
					setMessage("");
				});
		}
	};

	return (
		<>
			{mediaBox && (
				<div className="border-slate-500 border rounded-md absolute bottom-[7vh] mb-1 left-2 bg-slate-800 w-60 h-48 ">
					<img
						src={mediaURL}
						alt="media"
						className="h-full w-full object-contain"
					/>
					<MdOutlineClose
						title="Delete"
						size={25}
						className="absolute top-2 right-3 cursor-pointer text-white bg-slate-800 rounded-xl p-1"
						onClick={clearMediaFile}
					/>
				</div>
			)}
			<form
				className="w-full flex items-center gap-1 h-[7vh] p-3 bg-slate-800 text-white"
				onSubmit={(e) => e.preventDefault()}
			>
				<label htmlFor="media" className="cursor-pointer">
					<FaFolderOpen
						title="Open File"
						size={22}
						className="active:scale-75 hover:text-green-400"
					/>
				</label>
				<input
					ref={mediaFile}
					type="file"
					name="image"
					accept="image/png, image/jpg, image/gif, image/jpeg"
					id="media"
					className="hidden"
					onChange={handleMediaBox}
				/>
				<input
					type="text"
					className="outline-none p-2 w-full bg-transparent"
					placeholder="Type a message"
					value={inputText}
					onChange={(e) => setMessage(e.target?.value)}
				/>
				<span className="flex justify-center items-center">
					{inputText?.trim() &&
						(isSendLoading ? (
							<button className="outline-none p-2 border-slate-500 border-l">
								<LuLoader
									title="loading..."
									fontSize={18}
									className="animate-spin"
								/>
							</button>
						) : (
							<button
								className="outline-none p-2 border-slate-500 border-l"
								onClick={handleSendMessage}
							>
								<FaPaperPlane
									title="Send"
									size={18}
									className="active:scale-75 hover:text-green-400"
								/>
							</button>
						))}
				</span>
			</form>
		</>
	);
};

export default MessageSend;
