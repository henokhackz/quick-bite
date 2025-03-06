
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ChatWindowProps } from "@/app/(dashboard)/list/chats/[chatId]/page";
import UserModal from "./user-modal";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { getUsers } from "@/lib/actions/chat.action";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";





export default function ChatHeader({ chatData }: { chatData: ChatWindowProps }) {
  const isPersonal = chatData.type === "PERSONAL";
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false)


  useEffect(()=>{
    const fetchUsers = async () => {
      try {
        setIsLoading(true)
        const {success, data} = await getUsers()
        if(success && data){
          setUsers(data)
          setIsLoading(false)
        }
      if(!success || !data){
        toast.error('something went wrong probably its my shitty code ')

      }
      setIsLoading(false)
      } catch (error) {
        console.log(error);
        setIsLoading(false)
        toast.error('something went wrong probably its my shitty code ')

      }
    }
    fetchUsers()
  }, [])


  // Find the other user in a personal chat
  const sender = isPersonal
    ? chatData.users?.find((user) => user.id !== session?.user?.id)
    : null;

  const chatName = isPersonal ? sender?.user.name ?? "Unknown User" : chatData.name;
  // const avatar = isPersonal ? sender?.avatar ?? "/avatar.png" : "/group-avatar.png";

  // const status = isPersonal
  //   ? sender?.status === "online"
  //     ? "Online"
  //     : `Last seen: ${sender?.lastSeen ? new Intl.DateTimeFormat("en-US", { dateStyle: "short", timeStyle: "short" }).format(new Date(sender.lastSeen)) : "Unknown"}`
  //   : `${chatData.users?.length ?? 0} members online`;

  const status = 'offline'

  console.log(chatData.users?.[0], 'user data')

  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      {/* Avatar & Info */}
      
      <Link href={"/list/chats"} className="flex items-center gap-3">
         <div className="flex gap-2 items-center justify-center">
          <Image
            src={'/avatar.png'}
            alt="Avatar"
            height={40}
            width={40}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold">{chatName}</h2>
         
          <p className="text-sm text-gray-500">{chatData.type === "PERSONAL"? status : chatData.description }</p>
        </div>
      </Link>

      {/* More Options */}
      <div className="flex gap-2 items-center justify-center">
        {isLoading ?<Loader2  size={20} className='text-gray-500 hover:gray-600'/> :  <UserModal users={users} isLoading={isLoading}/>}
        </div>
    </div>
  );
}
