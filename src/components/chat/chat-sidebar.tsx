'use client'
import React from 'react'
import UserSearchBar from './user-search-bar'
import GroupSearchBar from './group-search-bar';
import UserList from './user-list';
import GroupList from './group-list';

const dummyUsers = [
  { id: "1", name: "John Doe", avatar: "/avatars/john.png", status: "online" },
  { id: "2", name: "Jane Smith", avatar: "/avatars/jane.png", status: "offline" },
  { id: "3", name: "Michael Brown", avatar: "/avatars/michael.png", status: "online" },
  { id: "4", name: "Emily White", avatar: "/avatars/emily.png", status: "offline" },
];

const dummyGroups = [
  { id: "101", name: "Cafeteria Staff", avatar: "/avatars/group1.png", onlineCount: 5 },
  { id: "102", name: "Security Team", avatar: "/avatars/group2.png", onlineCount: 2 },
  { id: "103", name: "Cleaning Crew", avatar: "/avatars/group3.png", onlineCount: 3 },
];


const ChatSidebar = () => {
  return (
    <div className='flex flex-col p-5 space-y-4 w-full min-w-[300px] bg-gray-50 rounded-lg'>
      <div className='w-full mb-4 flex flex-col space-y-4'>
<UserSearchBar users={dummyUsers} onSelect={(user) => console.log("Selected User:", user)} />
<UserList users={dummyUsers} onSelect={(user) => console.log("Selected User:", user)}/>
      </div>
      <div className='w-full mb-4 flex flex-col space-y-4'>
<GroupSearchBar groups={dummyGroups} onSelect={(group) => console.log("Selected Group:", group)} />
<GroupList groups={dummyGroups} onSelect={(group) => console.log("Selected Group:", group)}/>
     </div>

  </div>
  )
}

export default ChatSidebar
