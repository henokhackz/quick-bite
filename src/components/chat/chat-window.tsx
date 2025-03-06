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
  const [messages, setMessages] = useState<Message[]>(chat.messages || []);

  const { data: session } = useSession()

  //listen to new message
  useEffect(()=>{
    pusherClient.subscribe('chat')
    pusherClient.bind('new-message', ({data}:{data:Message})=>{
      setMessages([...messages, data])
    })

  }, [])

  // Function to handle sending a new message
  
  const onSendMessage = async(messageText: string) => {
    try {
      //@ts-expect-error type error will check it later
      if(!session && !session?.user){
        return
      }
      const {success, data} = await createMessage(messageText,session?.user.id as string, chat.id )
      if(success && data){
        setMessages([...messages, data])
      }

    } catch (error) {
      console.log(error)
      toast.error('something went wrong')
      
    }
    // TODO: Send message to backend (Pusher, WebSocket, API)

  };

  useEffect(() => {
    setMessages(chat.messages);
  }, [chat.messages]);


  return (
    <div className="w-full p-5 rounded-2xl bg-white">
      <div className="mb-4 flex flex-col space-y-4 w-full">
        <ChatHeader chatData={chat} />
       {chat.type === 'GROUP' && 
       ( <><h3 className="text-sm font-semibold text-gray-500 ">Members</h3><UserCarousel users={chat.users} /></>
       )
       }
        <ChatMessages messages={messages} currentUserId={session?.user.id as string} />
        <ChatInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};

export default ChatWindow;
