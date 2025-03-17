'use client'

import { User, Message, ChatRoomUser } from '@prisma/client';


interface GroupUsersSidebarProps {
  users: (ChatRoomUser & { user: User | null })[];
  latestMessage: Message | null;
}

const GroupUsersSidebar: React.FC<GroupUsersSidebarProps> = ({ users, latestMessage}) => {

  
  return (
    <div>
      {users.map(({ user }) => {
        if(!user) return null

        return (
          <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer h-full">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
              {user?.name?.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="font-medium">{user.name}</p>
              <p className={latestMessage?.seenIds.includes(user.id)? "text-gray-500" : "text-gray-700"}>
                {latestMessage ? latestMessage.text : "No messages yet"}
              </p>
              {latestMessage?.seenIds.includes(user.id) && (
                <p className="text-gray-500 text-xs">Seen</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GroupUsersSidebar;
