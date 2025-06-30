'use client';

import { User, Message, ChatRoomUser } from '@prisma/client';
import { useSession } from 'next-auth/react';

interface GroupUsersSidebarProps {
  users: (ChatRoomUser & { user: User | null })[];
  latestMessage: Message | null;
}

const GroupUsersSidebar: React.FC<GroupUsersSidebarProps> = ({
  users,
  latestMessage,
}) => {
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;

  return (
    <div className="space-y-2 bg-white rounded-xl shadow-sm border p-4">
      <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-2">Group Members</h2>

      {users.map(({ user }) => {
        if (!user) return null;

        const seen = latestMessage?.seenIds.includes(user.id);
        const isOnline = user.id === currentUserId;

        return (
          <div
            key={user.id}
            className="flex items-center gap-4 p-3 rounded-md hover:bg-gray-50 transition"
          >
            {/* Avatar with Online/Offline Dot */}
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-lg">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  isOnline ? 'bg-green-500' : 'bg-gray-400'
                }`}
              ></span>
            </div>

            {/* User Details */}
            <div className="flex-1 overflow-hidden">
              <p className="font-medium text-gray-800 truncate">{user.name}</p>
              <p
                className={`text-sm truncate ${
                  seen ? 'text-gray-400' : 'text-gray-700 font-medium'
                }`}
              >
                {latestMessage ? latestMessage.text : 'No messages yet'}
              </p>
              {seen && <p className="text-xs text-gray-400 mt-0.5">Seen</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GroupUsersSidebar;
