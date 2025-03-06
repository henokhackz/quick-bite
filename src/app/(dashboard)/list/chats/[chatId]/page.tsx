import ChatWindow from '@/components/chat/chat-window'
import { ChatRoom, Message, ChatRoomUser, User } from '@prisma/client'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

export type ChatWindowProps = ChatRoom & {
  messages: (Message & { sender: User })[],
  users: (ChatRoomUser & { user: User })[]
}

const ChatPage = async ({ params }: { params: { chatId: string } }) => {
  const chatId = params.chatId;

  const chat = await prisma.chatRoom.findUnique({
    where: { id: chatId },
    include: {
      messages: { include: { sender: true } },
      users: { include: { user: true } }
    }
  });
 

  if (!chat) {
    return notFound(); 
  }

  return (
    <div className="flex p-5 w-full">
      <ChatWindow chat={chat as ChatWindowProps} />
    </div>
  );
}

export default ChatPage;
