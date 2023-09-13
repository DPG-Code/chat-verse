'use client'

import { useState,useRef,useEffect } from 'react'
import { FullMessageType } from "@/app/types"
import useConversation from '@/app/hooks/useConversation'
import { pusherClient } from '@/app/libs/pusher'
import axios from 'axios'
import { find } from 'lodash'

import MessageBox from './MessageBox'

interface BodyProps {
  initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages,setMessages] = useState(initialMessages)
  // Ref for scrolling to the bottom
  const bottomRef = useRef<HTMLDivElement>(null)

  const { conversationId } = useConversation()

  // Update the conversation's seen status
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  },[conversationId])

  useEffect(() => {
    pusherClient.subscribe(conversationId!)
    bottomRef.current?.scrollIntoView() // Scroll to the bottom

    const messageHandler = (message: FullMessageType) => {
      // Update seen status
      axios.post(`/api/conversations/${conversationId}/seen`)

      setMessages((current) => {
        // Check if the message already exists
        if (find(current,{ id: message.id })) return current
        return [...current,message]
      })

      bottomRef.current?.scrollIntoView()
    }

    // Handler for updating messages
    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) => current.map((currentMessage) => {
        if (currentMessage.id === newMessage.id) return newMessage
        return currentMessage
      }))
    }

    // Bind event listeners
    pusherClient.bind('messages:new',messageHandler)
    pusherClient.bind('messages:update',updateMessageHandler)

    // Unsubscribe and clean up event listeners when component unmounts
    return () => {
      pusherClient.unsubscribe(conversationId!)
      pusherClient.unbind('messages:new',messageHandler)
      pusherClient.unbind('messages:update',updateMessageHandler)
    }
  },[conversationId])

  return (
    <section className='px-6 flex-1 overflow-y-auto'>
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
    </section>
  )
}
export default Body
