import ChatSidebar from '@/components/chat/chat-sidebar'
import React from 'react'

const ChatLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='px-2 py-4 rounded-lg flex gap-2 items-start w-full overflow-hidden justify-center '>
      <div className='flex-1 '>
       {children}

      </div>
      <div className='w-[14%] lg:w-[30%] flex-end hidden md:flex'>
         <ChatSidebar/>
    </div>
      
    </div>
  )
}

export default ChatLayout
