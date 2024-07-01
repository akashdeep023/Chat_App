import React, { useEffect } from "react";
import { FaPenAlt } from "react-icons/fa";
import { addMyChat, addSelectedChat } from "../../redux/slices/myChatSlice";
import { useDispatch, useSelector } from "react-redux";
import {
    setChatLoading,
    setGroupChatBox,
} from "../../redux/slices/conditionSlice";
import ChatShimmer from "../loading/ChatShimmer";
import getChatName, { getChatImage } from "../../utils/getChatName";
import { VscCheckAll } from "react-icons/vsc";
import { SimpleDateAndTime, SimpleTime } from "../../utils/formateDateTime";

const MyChat = () => {
    const dispatch = useDispatch();
    const myChat = useSelector((store) => store.myChat.chat);
    const authUserId = useSelector((store) => store?.auth?._id);
    const selectedChat = useSelector((store) => store?.myChat?.selectedChat);
    const isChatLoading = useSelector(
        (store) => store?.condition?.isChatLoading
    );
    // Re render newmessage send and new group chat created
    const newMessageId = useSelector((store) => store?.message?.newMessageId);
    const isGroupChatId = useSelector((store) => store.condition.isGroupChatId);
    // All My Chat Api Call
    useEffect(() => {
        const getMyChat = () => {
            dispatch(setChatLoading(true));
            const token = localStorage.getItem("token");
            fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((json) => {
                    dispatch(addMyChat(json?.data || []));
                    dispatch(setChatLoading(false));
                })
                .catch((err) => {
                    console.log(err);
                    dispatch(setChatLoading(false));
                });
        };
        getMyChat();
    }, [newMessageId, isGroupChatId]);
    return (
        <>
            <div className="p-6 w-full h-[7vh] font-semibold flex justify-between items-center bg-slate-800 text-white border-slate-500 border-r">
                <h1 className="mr-2 whitespace-nowrap">My Chat</h1>
                <div
                    className="flex items-center gap-2 border border-slate-600 py-1 px-2 rounded-md cursor-pointer hover:bg-slate-600 active:bg-black/20"
                    title="Create New Group"
                    onClick={() => dispatch(setGroupChatBox())}
                >
                    <h1 className="line-clamp-1 lin whitespace-nowrap w-full">
                        New Group
                    </h1>
                    <FaPenAlt />
                </div>
            </div>
            <div className="flex flex-col w-full px-4 gap-1 py-2 overflow-y-auto overflow-hidden scroll-style h-[73vh]">
                {myChat.length == 0 && isChatLoading ? (
                    <ChatShimmer />
                ) : (
                    <>
                        {myChat?.length === 0 && (
                            <div className="w-full h-full flex justify-center items-center text-white">
                                <h1 className="text-base font-semibold">
                                    Start a new conversation.
                                </h1>
                            </div>
                        )}
                        {myChat?.map((chat) => {
                            return (
                                <div
                                    key={chat?._id}
                                    className={`w-full h-16 border-slate-500 border rounded-lg flex justify-start items-center p-2 font-semibold gap-2 hover:bg-black/55 to-slate-800  via-slate-300  from-slate-800 transition-all cursor-pointer ${
                                        selectedChat?._id == chat?._id
                                            ? "bg-gradient-to-tr text-black"
                                            : "text-white"
                                    }`}
                                    onClick={() => {
                                        dispatch(addSelectedChat(chat));
                                    }}
                                >
                                    <img
                                        className="h-12 min-w-12 rounded-full"
                                        src={getChatImage(chat, authUserId)}
                                        alt="img"
                                    />
                                    <div className="w-full">
                                        <div className="flex justify-between items-center w-full">
                                            <span className="line-clamp-1 capitalize">
                                                {getChatName(chat, authUserId)}
                                            </span>
                                            <span className="text-xs font-light ml-1">
                                                {chat?.latestMessage &&
                                                    SimpleTime(
                                                        chat?.latestMessage
                                                            ?.createdAt
                                                    )}
                                            </span>
                                        </div>
                                        <span className="text-xs font-light line-clamp-1 ">
                                            {chat?.latestMessage ? (
                                                <div className="flex items-end gap-1">
                                                    <span>
                                                        {chat?.latestMessage
                                                            ?.sender?._id ===
                                                            authUserId && (
                                                            <VscCheckAll
                                                                color="white"
                                                                fontSize={14}
                                                            />
                                                        )}
                                                    </span>
                                                    <span className="line-clamp-1">
                                                        {
                                                            chat?.latestMessage
                                                                ?.message
                                                        }
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-xs font-light">
                                                    {SimpleDateAndTime(
                                                        chat?.createdAt
                                                    )}
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
        </>
    );
};

export default MyChat;
