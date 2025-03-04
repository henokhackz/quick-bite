'use client'
import ChatHeader from './chatHeader'
import ChatMessages from './chat-messages'
import ChatInput from './chatInput'

const messages = [
  {
    "id": "msg1",
    "senderId": "1",
    "receiverId": "2",
    "message": "Hey Jane, can you update the meal schedule?",
    "timestamp": "2025-03-03T08:30:00Z"
  },
  {
    "id": "msg2",
    "senderId": "2",
    "receiverId": "1",
    "message": "Sure, I’ll do it now!",
    "timestamp": "2025-03-03T08:32:00Z"
  },
  {
    "id": "msg3",
    "senderId": "3",
    "receiverId": "5",
    "message": "Can you check the new stock?",
    "timestamp": "2025-03-03T09:00:00Z"
  },
  {
    "id": "msg4",
    "senderId": "5",
    "receiverId": "3",
    "message": "Yes, everything is in order.",
    "timestamp": "2025-03-03T09:05:00Z"
  },
  {
    "id": "msg5",
    "senderId": "6",
    "receiverId": "7",
    "message": "Meeting at 3 PM, don't forget!",
    "timestamp": "2025-03-03T10:00:00Z"
  }
]


const chatHeaderData = {
  "id": "chat1",
  "type": "personal",
  "user": {
    "id": "2",
    "name": "Jane Smith",
    "role": "Cafeteria Staff",
    "avatar": "/avatars/staff1.png",
    "status": "offline",
    "lastSeen": "2025-03-03T08:32:00Z"
  }
}


const ChatWindow = () => {

    const onSendMessage = (message: string) => {
      console.log(message)
    }

  return (
    <div className='w-full p-5 rounded-2xl  bg-white'>
        <div className='mb-4 flex flex-col space-y-4'>
      <ChatHeader chatData={chatHeaderData} />
      <ChatMessages messages={messages} currentUserId='1'/>
      <ChatInput onSendMessage={onSendMessage}/>
        </div>

    </div>
  )
}

export default ChatWindow
