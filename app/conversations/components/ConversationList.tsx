'use client'

import { useEffect,useMemo,useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import clsx from "clsx"
import { User } from "@prisma/client"
import useConversation from "@/app/hooks/useConversation"
import { FullConversationType } from "@/app/types"
import { pusherClient } from "@/app/libs/pusher"
import { find } from "lodash"

import ConversationBox from "./ConversationBox"
import GroupChatModal from "./GroupChatModal"
import { IconGroup } from "@/app/components/Icons"

interface ConversationListProps {
  initialItems: FullConversationType[]
  users: User[]
}

const ConversationList: React.FC<ConversationListProps> = ({ initialItems,users }) => {
  const session = useSession()
  const [items,setItems] = useState(initialItems)
  const [isModalOpen,setIsModalOpen] = useState(false)

  const router = useRouter()
  const { conversationId,isOpen } = useConversation()

  // Generate Pusher key from user's email
  const pusherKey = useMemo(() => {
    return session.data?.user?.email
  },[session.data?.user?.email])

  useEffect(() => {
    if (!pusherKey) return

    pusherClient.subscribe(pusherKey)

    // Handlers for different Pusher events
    const newConversaionHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current,{ id: conversation.id })) return current
        return [conversation,...current]
      })
    }

    const updateConversaionHandler = (conversation: FullConversationType) => {
      setItems((current) => current.map((currentConversation) => {
        if (currentConversation.id === conversation.id) {
          return {
            ...currentConversation,
            messages: conversation.messages
          }
        }

        return currentConversation
      }))
    }

    const removeConversaionHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((currentConversation) => currentConversation.id !== conversation.id)]
      })

      if (conversationId === conversation.id) router.push('/conversation')
    }

    // Bind event listeners
    pusherClient.bind('conversation:new',newConversaionHandler)
    pusherClient.bind('conversation:update',updateConversaionHandler)
    pusherClient.bind('conversation:remove',removeConversaionHandler)

    // Unsubscribe and clean up event listeners when component unmounts
    return () => {
      pusherClient.unsubscribe(pusherKey)
      pusherClient.unbind('conversation:new',newConversaionHandler)
      pusherClient.unbind('conversation:update',updateConversaionHandler)
      pusherClient.unbind('conversation:remove',removeConversaionHandler)
    }
  },[pusherKey,conversationId,router])

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <section id='conversation-container' className={clsx(
        'px-6 pt-12 w-full flex flex-col overflow-hidden lg:px-12 gap-10',
        isOpen ? 'hidden' : 'block'
      )}>
        <header className='flex items-center justify-between'>
          <h3 className='text-white text-2xl font-bold lg:text-4xl'>Messages</h3>
          <button className='text-white' onClick={() => setIsModalOpen(true)}>
            <IconGroup />
          </button>
        </header>
        <div className='h-full w-full flex flex-col overflow-y-scroll z-20'>
          {
            items.map((item) => (
              <ConversationBox
                key={item.id}
                data={item}
                seleted={conversationId === item.id}
              />
            ))
          }
        </div>
      </section>
    </>
  )
}
export default ConversationList
