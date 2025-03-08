"use client";

import { useState, useEffect } from "react";
import ChatHeader from "./chatHeader";
import ChatMessages from "./chat-messages";
import ChatInput from "./chatInput";
import { ChatWindowProps } from "@/app/(dashboard)/list/chats/[chatId]/page";
import { Message } from "@prisma/client";
import UserCarousel from "./user-carousel";
import { createMessage } from "@/lib/actions/chat.action";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { pusherClient } from "@/lib/pusher/pusher";

const ChatWindow = ({ chat }: { chat: ChatWindowProps }) => {
  const { data: session } = useSession();

  
  const [messages, setMessages] = useState<Message[]>(chat.messages || []);

  useEffect(() => {
    console.log('so strange ')
    if (!chat?.id) {
      console.log("Chat ID is undefined. Skipping Pusher subscription.");
      return;
    }

    console.log(`Subscribing to Pusher with chat ID: ${chat.id}`);
    pusherClient.subscribe(chat.id);

    const handleNewMessage = ({ newMessages }: { newMessages: Message[] }) => {
      console.log("Received new messages:", newMessages);
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    };

    pusherClient.bind("new-message", handleNewMessage);

    return () => {
      console.log(`Unsubscribing from Pusher chat ID: ${chat.id}`);
      pusherClient.unbind("new-message", handleNewMessage);
      pusherClient.unsubscribe(chat.id);
    };
  }, [chat.id]);

  useEffect(() => {
    if (chat.messages) {
      console.log("Updating messages from chat prop");
      setMessages(chat.messages);
    }
  }, [chat.messages]);

  const onSendMessage = async (messageText: string) => {
    try {
      if (!session?.user?.id) {
        toast.error("You must be logged in to send messages.");
        return;
      }

      const { success, data } = await createMessage(messageText, session.user.id, chat.id);
      if (success && data) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full p-5 rounded-lg bg-white h-full">
      <div className="mb-4 flex flex-col space-y-4 w-full h-full">
        <ChatHeader chatData={chat} />
        {chat.type === "GROUP" && (
          <>
            <h3 className="text-sm font-semibold text-gray-500">Members</h3>
            <UserCarousel users={chat.users} />
          </>
        )}
        <ChatMessages messages={messages} currentUserId={session?.user.id as string} chatId={chat.id} />
        <ChatInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};

export default ChatWindow;
