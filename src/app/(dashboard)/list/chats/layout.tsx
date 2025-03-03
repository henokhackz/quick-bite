import React from 'react'

const ChatLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='min-h-screen p-5 py-4 rounded-lg flex gap-2 itmes-center'>
       {children}
      <div className='w-[14%] lg:w-[16%] xl:w-[16%] flex-end'>
         <ChatSidebar/>
    </div>
    </div>
  )
}

export default ChatLayout
