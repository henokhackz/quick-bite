import { User as PrismaUser } from '@prisma/client';
import { CheckCircle, Circle } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const User = ({ user, onSelect, isLoading }: { 
  user: PrismaUser & { status?: string }; 
  onSelect: (user: PrismaUser) => void;
  isLoading: boolean; 
}) => {
  return (
    <li
      className={`flex items-center justify-between p-2 border rounded-lg cursor-pointer transition ${
        isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
      }`}
      onClick={() => !isLoading && onSelect(user)}
    >
      <div className="flex items-center gap-3">
        <Image 
          src={'/avatar.png'} 
          height={40} 
          width={40} 
          alt="User Avatar" 
          className="w-10 h-10 rounded-full object-cover" 
        />
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-gray-500">
            {user.status === "online" ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      {user.status === "online" ? (
        <CheckCircle className="text-green-500" size={20} />
      ) : (
        <Circle className="text-gray-400" size={20} />
      )}
    </li>
  );
};

export default User;
