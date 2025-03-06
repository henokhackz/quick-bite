'use client'

import { User } from '@prisma/client'
import React, { useState } from 'react'
import Image from 'next/image'

const ChatUserCard = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [newMember , setNewMember] = useState<User | null>(null)

  const handleAddMember = () => {
    setNewMember(user)
    setIsOpen(false)
  }


  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="w-full flex flex-col space-y-2 p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-all cursor-pointer border border-gray-200"
    >
      <div className="flex items-center gap-3">
        <Image
          src={user?.image || '/avatar.png'}
          alt="User avatar"
          width={32}
          height={32}
          className="w-8 h-8 object-cover rounded-full"
        />
        <div>
          <h3 className="text-sm font-medium text-gray-900">{user?.name}</h3>
          <p className="text-xs text-gray-500">{user.role}</p>
        </div>
      </div>

      {isOpen && (
        <div className="relative w-full mt-2">
          <div className="absolute left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-lg p-3 w-60 border border-gray-200">
            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
            <button className="mt-2 w-full text-xs font-medium text-blue-600 hover:underline" >
              Add to Group
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatUserCard
