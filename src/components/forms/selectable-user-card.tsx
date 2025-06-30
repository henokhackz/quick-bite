'use client'

import { User } from '@prisma/client'
import React, { useState } from 'react'
import Image from 'next/image'

export const SelectableUserCard = ({ user, setSelectedUsers, selectedUsers }: { user: User, setSelectedUsers: (users: User[]) => void, selectedUsers: User[] }) => {
  const [isSelected, setIsSelected] = useState(false)

  const handleSelectUser = () => {
    let updatedUsers = []
    if (isSelected) {
      updatedUsers = selectedUsers.filter(u => u.id !== user.id)
    } else {
      updatedUsers = [...selectedUsers, user]
    }
    setSelectedUsers(updatedUsers)
    setIsSelected(!isSelected)
  }

  return (
    <div
      onClick={handleSelectUser}
      className={`w-full flex flex-col space-y-2 p-4 rounded-lg shadow-md transition-all cursor-pointer border border-gray-200 ${isSelected ? 'bg-blue-100 border-blue-500' : 'bg-white hover:shadow-lg'}`}
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
    </div>
  )
}
