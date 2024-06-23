import GroupLogo from "../assets/group.png";
const getChatName = (chat, authUserId) => {
	const chatName =
		chat?.chatName == "Messenger"
			? authUserId == chat.users[0]._id
				? chat.users[1].firstName + " " + chat.users[1].lastName
				: chat.users[0].firstName + " " + chat.users[0].lastName
			: chat?.chatName;
	return chatName;
};
export const getChatImage = (chat, authUserId) => {
	const ImageLogo =
		chat?.chatName == "Messenger"
			? authUserId == chat.users[0]._id
				? chat.users[1].image
				: chat.users[0].image
			: GroupLogo;
	return ImageLogo;
};
export default getChatName;
