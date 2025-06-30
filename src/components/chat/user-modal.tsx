'use client'
import { User } from '@prisma/client'
import { Loader2, MoreVertical, X } from 'lucide-react'
import React, { useState } from 'react'
import { ChatUserCard } from './chat-user-card';


type UserModalProps = { users: User[]; isLoading: boolean ; groupId: string};

const UserModal = ({ users, isLoading , groupId}: UserModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative'>
      <button 
        className='p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition' 
        onClick={() => setIsOpen(!isOpen)}
      >
        <MoreVertical size={20} className='text-gray-500' />
      </button>

      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm'>
          <div className='bg-white rounded-lg shadow-xl w-[90%] max-w-md max-h-[80vh] overflow-hidden animate-fade-in'>
            {/* Header */}
            <div className='flex items-center justify-between bg-gray-100 p-4 border-b'>
              <p className='text-lg font-semibold'>Users</p>
              <button className='text-gray-500 hover:text-gray-600' onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* User List */}
            <div className='p-4 space-y-3 overflow-y-auto max-h-[60vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
              {isLoading ? (
                <div className='flex justify-center py-10'>
                  <Loader2 className='w-6 h-6 animate-spin text-gray-500' />
                </div>
              ) : (
                users.length > 0 ? (
                  users.map((user) => <ChatUserCard key={user.id} user={user} groupId={groupId}/>)
                ) : (
                  <p className='text-gray-500 text-center'>No users found</p>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserModal;
