import ChatWindow from '@/components/chat/chat-window';
import { ChatRoom, Message, ChatRoomUser, User } from '@prisma/client';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import GroupUsersSidebar from '@/components/chat/group-sidebar';

export type ChatWindowProps = ChatRoom & {
  messages: (Message & { sender: User })[];
  users: (ChatRoomUser & { user: User })[];
};

const ChatPage = async ({ params }: { params: { chatId: string } }) => {
  const chatId = params.chatId;


  const chat = await prisma.chatRoom.findUnique({
    where: { id: chatId },
    include: {
      messages: {
        include: { sender: true },
        orderBy: { createdAt: 'desc' }, 
      },
      users: { include: { user: true } },
    },
  });

  if (!chat) {
    return notFound();
  }

  return (
    <div className="flex h-screen gap-2">
      {/* Sidebar with Group Users & Latest Messages */}
      <div className="w-50 bg-white shadow-md border-r p-4 hidden lg:block rounded-lg h-full">
        <h2 className="text-lg font-semibold mb-4">Members</h2>
        {chat.users && <GroupUsersSidebar users={chat.users} messages={chat.messages} chatId={chatId} />}
      </div>

      {/* Main Chat Window */}
      <div className="flex-1 flex flex-col">
        <ChatWindow chat={chat as ChatWindowProps} />
      </div>
    </div>
  );
};

export default ChatPage;
