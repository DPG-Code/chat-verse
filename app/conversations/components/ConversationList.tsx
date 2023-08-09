'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import clsx from "clsx"
import { User } from "@prisma/client"
import useConversation from "@/app/hooks/useConversation"
import { FullConversationType } from "@/app/types"

import ConversationBox from "./ConversationBox"
import GroupChatModal from "./GroupChatModal"

interface ConversationListProps {
  initialItems: FullConversationType[]
  users: User[]
}

const ConversationList: React.FC<ConversationListProps> = ({ initialItems,users }) => {
  const [items,setItems] = useState(initialItems)
  const [isModalOpen,setIsModalOpen] = useState(false)

  const router = useRouter()
  const { conversationId,isOpen } = useConversation()

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className={clsx(
        'flex flex-col',
        isOpen ? 'hidden' : 'block'
      )}>
        <strong>Messages</strong>
        <div onClick={() => setIsModalOpen(true)}>crear grupo</div>
        <div className='flex flex-col gap-2'>
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
      </div>
    </>
  )
}
export default ConversationList
