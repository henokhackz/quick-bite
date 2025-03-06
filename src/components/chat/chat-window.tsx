"use client";

import { useState, useEffect } from "react";
import ChatHeader from "./chatHeader";
import ChatMessages from "./chat-messages";
import ChatInput from "./chatInput";
import { ChatWindowProps } from "@/app/(dashboard)/list/chats/[chatId]/page";
import { Message } from "@prisma/client";
import UserCarousel from "./user-carousel";



const ChatWindow = ({ chat }: { chat: ChatWindowProps }) => {
  const [messages, setMessages] = useState<Message[]>(chat.messages || []);

  // Function to handle sending a new message
  const onSendMessage = (messageText: string) => {
    // const newMessage: Partial<Message> = {
    //   id: crypto.randomUUID(), 
    //   chatRoomId: chat.id,
    //   senderId: "1", 
    //   text: messageText,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // };

    // // Optimistically update the UI
    // setMessages((prev) => [...prev, newMessage]);

    // TODO: Send message to backend (Pusher, WebSocket, API)
    console.log("Sending message:", messageText);
  };

  useEffect(() => {
    setMessages(chat.messages);
  }, [chat.messages]);

  console.log(chat.users,'this is not chat users')

  return (
    <div className="w-full p-5 rounded-2xl bg-white">
      <div className="mb-4 flex flex-col space-y-4">
        <UserCarousel users={chat.users}/>
        <ChatHeader chatData={chat} />
        <ChatMessages messages={messages} currentUserId="1" />
        <ChatInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};

export default ChatWindow;
