import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ChatWindowProps } from "@/app/(dashboard)/list/chats/[chatId]/page";
import UserModal from "./user-modal";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { getUsers } from "@/lib/actions/chat.action";
import { toast } from "react-toastify";

export default function ChatHeader({ chatData }: { chatData: ChatWindowProps }) {
  const isPersonal = chatData.type === "PERSONAL";
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const { success, data } = await getUsers();
        if (success && data) {
          setUsers(data);
        } else {
          toast.error("Failed to load users. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("An unexpected error occurred while fetching users.");
      } finally {
        setIsLoading(false);
      }
    };

    // Reset state when chatData.id changes
    setUsers([]);

    fetchUsers();
  }, [chatData.id]);



  const status = isPersonal ? "Offline" : chatData.description;
  const receiver = chatData.users.find(chatRoom=>chatRoom.user.id !== session?.user.id)
  const chatName = isPersonal ? receiver?.user.name : chatData.name;

  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      {/* Avatar & Info */}
      <Link href={"/list/chats"} className="flex items-center gap-3">
        <div className="flex gap-2 items-center justify-center">
          <Image
            src={"/avatar.png"}
            alt="Avatar"
            height={40}
            width={40}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold">{chatName}</h2>
          <p className="text-sm text-gray-500">{status}</p>
        </div>
      </Link>

      {/* More Options */}
      <div className="flex gap-2 items-center justify-center">
        {!isLoading && chatData.type === "GROUP" && (
          <UserModal users={users} isLoading={isLoading} groupId={chatData.id} />
        )}
      </div>
    </div>
  );
}
