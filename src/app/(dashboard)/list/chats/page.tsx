"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; // Ensure you're using session correctly
import { format } from "date-fns";
import Link from "next/link";
import { Loader2, Users } from "lucide-react";
import { getChats } from "@/lib/actions/chat.action";
import { ChatRoom, ChatRoomUser, Message, User } from "@prisma/client";
import { toast } from "react-toastify";
import Image from "next/image";

type ChatRoomType = ChatRoom & {
  users: ChatRoomUser&{
    user:User
  }[];
  messages: Message[];
};

export default function ChatList() {
  const router = useRouter();
  const { data: session } = useSession();
  const [chats, setChats] = useState<ChatRoomType[] | []>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true)
        const { success, data } = await getChats();
        if (success && data) {
        setChats(data as unknown as ChatRoomType[]);
        setLoading(false)
        }
        setLoading(false)
      } catch (error) {
        console.error("Error fetching chats:", error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col p-5 space-y-4 w-full h-full items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col p-5 space-y-4 w-full rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Chats</h1>
        <Link
          href="/list/chats/new"
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white shadow-md hover:bg-gray-50 transition"
        >
          <Users size={20} />
          <span className="text-sm text-gray-700">Create New Group</span>
        </Link>
      </div>

      {/* Chat List */}
      <div className="space-y-4 bg-white rounded-lg shadow p-4 max-h-screen overflow-y-scroll">
        {chats.length === 0 ? (
          <p className="text-gray-500">No chats available</p>
        ) : (
          chats.map((chat) => {
            const lastMessage = chat.messages.at(-1);
            const otherUser = chat.users.find(
              (user) => user.user.id !== session?.user?.id
            );

            return (
              <div
                key={chat.id}
                onClick={() => router.push(`/list/chats/${chat.id}`)}
                className="flex items-center p-3 bg-gray-50 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition"
              >
                <Image
                  width={48}
                  height={48}
                  src={otherUser?.user?.image || "/avatar.png"}
                  alt={otherUser?.user?.name || "User"}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4 flex-1">
                  <h2 className="font-semibold text-gray-800">
                    {chat.type === "PERSONAL" ? otherUser?.user?.name : chat.name}
                  </h2>
                  <p className="text-sm text-gray-500 truncate w-[180px]">
                    {lastMessage?.text || "No messages yet"}
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {lastMessage?.createdAt
                    ? format(new Date(lastMessage.createdAt), "p")
                    : ""}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
