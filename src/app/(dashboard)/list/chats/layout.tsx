
import React from 'react'

const ChatLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='p-5 rounded-lg flex gap-2 items-start w-full overflow-hidden  '>
       {children}
    </div>
  )
}

export default ChatLayout
