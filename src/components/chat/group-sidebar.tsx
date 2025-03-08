'use client'
import { pusherClient } from '@/lib/pusher/pusher';
import { User, Message, ChatRoomUser } from '@prisma/client';
import { useEffect, useState } from 'react';

interface GroupUsersSidebarProps {
  users: (ChatRoomUser & { user: User | null })[];
  messages: Message[];
  chatId: string;
}

const GroupUsersSidebar: React.FC<GroupUsersSidebarProps> = ({ users, messages: initialMessages, chatId }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  useEffect(() => {
    pusherClient.subscribe(chatId);

    const handleNewMessage = ({ newMessages }: { newMessages: Message[] }) => {
      console.log(newMessages, 'new messages web socket')
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    };

    pusherClient.bind('new-message', handleNewMessage);

    // Cleanup on unmount
    return () => {
      pusherClient.unbind('new-message', handleNewMessage);
      pusherClient.unsubscribe(chatId);
    };
  }, [chatId]); 

  return (
    <div>
      {users.map(({ user }) => {
        if(!user) return null
        const latestMessage = messages.find((msg) => msg.senderId === user.id);

        return (
          <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer h-full">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
              {user?.name?.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500 truncate max-w-[150px]">
                {latestMessage ? latestMessage.text : "No messages yet"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GroupUsersSidebar;
