'use client'
import React, { useEffect, useState } from 'react'
import GroupSearchBar from './group-search-bar'
import UserList from './user-list'
import GroupList from './group-list'
import { User } from '@prisma/client'
import { createConversation, getUsers } from '@/lib/actions/chat.action'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const dummyGroups = [
  { id: "101", name: "Cafeteria Staff", avatar: "/avatars/group1.png", onlineCount: 5 },
  { id: "102", name: "Security Team", avatar: "/avatars/group2.png", onlineCount: 2 },
  { id: "103", name: "Cleaning Crew", avatar: "/avatars/group3.png", onlineCount: 3 },
]

const ChatSidebar = () => {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { data: session } = useSession()

  useEffect(() => {
    const fetchUsers = async () => {

      try {
        const { success, data } = await getUsers()
        if (success && data) {
          setUsers(data)
        } else {
          toast.error("Failed to load users.")
        }
      } catch (error) {
        console.error("Error fetching users:", error)
        toast.error("An error occurred while fetching users.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleUserSelect = async (user: User) => {
    if (!session?.user?.id) {
      toast.error("You must be logged in to start a chat.")
      return
    }
    
    try {
      const { success, data } = await createConversation(session.user.id, user.id)
      if (success && data) {
        console.log("Conversation created:", data)
        router.push(`/list/chats/${data.id}`)
      } else {
        toast.error("Failed to create conversation.")
      }
    } catch (error) {
      console.error("Error creating conversation:", error)
      toast.error("An error occurred while starting the conversation.")
    }
  }

  return (
    <div className="flex flex-col p-5 space-y-4 w-full min-w-[300px] bg-gray-50 rounded-lg">
      <div className="w-full mb-4 flex flex-col space-y-4">
        {/* <UserSearchBar users={dummyUsers} onSelect={(user) => console.log("Selected User:", user)} /> */}
        <UserList users={users} onSelect={handleUserSelect} isLoading={isLoading} />
      </div>
      <div className="w-full mb-4 flex flex-col space-y-4">
        <GroupSearchBar groups={dummyGroups} onSelect={(group) => console.log("Selected Group:", group)} />
        <GroupList groups={dummyGroups} onSelect={(group) => console.log("Selected Group:", group)} />
      </div>
    </div>
  )
}

export default ChatSidebar
