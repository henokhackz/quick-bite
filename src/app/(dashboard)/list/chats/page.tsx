"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import {Users } from "lucide-react";

const dummyChats = [
  {
    id: "1",
    type: "PERSONAL",
    user: { name: "John Doe", avatar: "/avatar.png" },
    lastMessage: { text: "Hey, how are you?", createdAt: new Date() },
  },
  {
    id: "2",
    type: "GROUP",
    group: { name: "Developers", avatar: "/avatar.png" },
    lastMessage: { text: "Let's have a meeting tomorrow.", createdAt: new Date() },
  },
  {
    id: "3",
    type: "GROUP",
    group: { name: "Developers", avatar: "/avatar.png" },
    lastMessage: { text: "Let's have a meeting tomorrow.", createdAt: new Date() },
  },
  {
    id: "4",
    type: "GROUP",
    group: { name: "Developers", avatar: "/avatar.png" },
    lastMessage: { text: "Let's have a meeting tomorrow.", createdAt: new Date() },
  },
];

export default function ChatList() {
  const router = useRouter();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setChats(dummyChats);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col p-5 space-y-4 w-full  rounded-lg  ">
      <div className="flex items-center justify-between w-full">
      <h1 className="text-2xl font-semibold mb-4">Chats</h1>
        <Link href={'/list/chats/new'} className="flex gap-2 items-center shadow-md text-dashboardForeground/80 px-2 py-4 rounded-lg bg-white hover:bg-gray-50 duration-300 transition-all ">
        <Users size={20}/>
        <span className="text-sm text-dashboardForeground/80">create new group</span>
        </Link>
         </div>
      <div className="space-y-4 bg-white rounded-lg shadow p-4">
        {chats.length === 0 ? (
          <p>Loading chats...</p>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => router.push(`/list/chats/${chat.id}`)}
              className="flex items-center p-3 bg-gray-50 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100"
            >
              <img
                src={chat.type === "PERSONAL" ? chat.user.avatar : chat.group.avatar}
                alt="Avatar"
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-4">
                <h2 className="font-semibold">
                  {chat.type === "PERSONAL" ? chat?.user.name : chat.group.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {chat.lastMessage?.text || "No messages yet"}
                </p>
              </div>
              <span className="ml-auto text-xs text-gray-400">
                {chat.lastMessage ? format(new Date(chat.lastMessage.createdAt), "p") : ""}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
