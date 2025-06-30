"use client";

import { useState, useEffect, useRef } from "react";
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
import { find } from "lodash";
import GroupUsersSidebar from "./group-sidebar";

const ChatWindow = ({ chat }: { chat: ChatWindowProps }) => {
  const { data: session } = useSession();
  const currentuser = session?.user;

  const [messages, setMessages] = useState<Message[]>(chat.messages || []);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chat.id || !currentuser) {
      console.log("Chat ID is undefined. Skipping Pusher subscription.");
      return;
    }

    console.log(`Subscribing to Pusher with chat ID: ${chat.id}`);
    pusherClient.subscribe(chat.id);
    pusherClient.subscribe(currentuser.id as string);

    console.log("Pusher Connection State:", pusherClient.connection.state);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

    const handleNewMessage = (data: { messages: Message[] }) => {
      console.log("Received new message:", data, "new messages", typeof data);

      setMessages((prevMessages) => {
        if (find(prevMessages, { id: data.messages[0].id })) {
          return prevMessages;
        }
        return [...prevMessages, data.messages[0]];
      });
    };
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    const handleUpdatedMessage = (data: { messages: Message[] }) => {
      console.log("Received updated message:", data, "updated messages", typeof data);
      setMessages((prevMessages) => {
        return prevMessages.map((message) => {
          if (message.id === data.messages[0].id) {
            return data.messages[0];
          }
          return message;
        });
      });
    };
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

    pusherClient.bind("new-message", handleNewMessage);
    pusherClient.bind("update-message", handleUpdatedMessage);

    return () => {
      console.log(`Unsubscribing from Pusher chat ID: ${'chat'}`);
      pusherClient.unbind("new-message", handleNewMessage);
      pusherClient.unbind("update-message", handleUpdatedMessage);
      pusherClient.unsubscribe(chat.id);
      pusherClient.unsubscribe(currentuser?.id as string);
    };
  }, [chat.id, messages]);

  useEffect(() => {
    if (chat.messages) {
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
    <div className="flex flex-col lg:flex-row h-full w-full rounded-lg  gap-4  ">
      <div className="hidden lg:block lg:w-1/4 h-full bg-white rounded-lg p-5">
        <GroupUsersSidebar latestMessage={messages[messages.length - 1]} users={chat.users} />
      </div>
      <div className="flex flex-col w-full lg:w-3/4  h-full bg-white rounded-lg p-5 ">
        <ChatHeader chatData={chat} />
        {chat.type === "GROUP" && (
          <div className="mb-4 flex  justify-center lg:hidden w-full items-start gap-2 flex-col p-5 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-500">Members</h3>
            <UserCarousel users={chat.users} />
          </div>
        )}
        <div className="flex-1 overflow-y-auto">
          <ChatMessages messages={messages} currentUserId={session?.user.id as string} chatId={chat.id} />
        </div>
        <ChatInput onSendMessage={onSendMessage} bottomRef={bottomRef} />
      </div>
    </div>
  );
};

export default ChatWindow;

