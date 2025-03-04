import ChatWindow from '@/components/chat/chat-window'
import React from 'react'

const ChatPage = ({params}:{params:{chatId:string}}) => {
    console.log(params.chatId)
  return (
    <div className='flex p-5 w-full'>
<ChatWindow/>
    </div>
  )
}

export default ChatPage
