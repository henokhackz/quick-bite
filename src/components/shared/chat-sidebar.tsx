import React from 'react'

const ChatSideBar = () => {
  return (
    <div className='w-full px-5 rounded-lg bg-gray-50 space-y-4'>
        <div className='mb-4'>
        <UserSearch/>
        <UserList/>
        </div> 
        <div className='mb-4'>
        <GoupSearch/>
        <GroupList/>
        </div>


      
    </div>
  )
}

export default ChatSideBar
