import { LucideMoveLeft, MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ChatHeader({ chatData }: { chatData: any }) {
  const isPersonal = chatData.type === "personal";
//   const avatar = isPersonal ? chatData.user.avatar : chatData.group.avatar;
  const name = isPersonal ? chatData.user.name : chatData.group.name;
  const status = isPersonal
    ? chatData.user.status === "online"
      ? "Online"
      : `Last seen: ${new Intl.DateTimeFormat("en-US", { dateStyle: "short", timeStyle: "short" }).format(new Date(chatData.user.lastSeen))}`
    : `${chatData.group.onlineCount} members online`;

  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      {/* Avatar & Info */}
      <Link href={'/list/chats'} className="flex items-center gap-3">
        <div className="flex gap-2 items-center justify-center">
         <LucideMoveLeft size={20} className="text-gray-500 "/>
        <Image
          src={"/avatar.png"}
          alt="Avatar"
          height={40}
          width={40}
          className="w-10 h-10 rounded-full object-cover"
        />
        </div>
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-sm text-gray-500">{status}</p>
        </div>
      </Link>

      {/* More Options */}
      <button className="p-2 text-gray-600 hover:text-gray-800">
        <MoreVertical size={24} />
      </button>
    </div>
  );
}
