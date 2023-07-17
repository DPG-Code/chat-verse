'use client'

import { useState,useRef,useEffect } from 'react'
import { FullMessageType } from "@/app/types"
import useConversation from '@/app/hooks/useConversation'
import axios from 'axios'

import MessageBox from './MessageBox'

interface BodyProps {
  initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages,setMessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)

  const { conversationId } = useConversation()

  // Update the conversation's seen status
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  },[conversationId])

  return (
    <div className='flex-1 overflow-y-auto'>
      {
        messages.map((message,i) => (
          <MessageBox
            key={message.id}
            isLast={i === messages.length - 1}
            data={message}
          />
        ))
      }
      <div ref={bottomRef} className='pt-24' />
    </div>
  )
}
export default Body
