"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import clsx from "clsx"
import useConversation from "@/app/hooks/useConversation"
import { FullConversationType } from "@/app/types"

import ConversationBox from "./ConversationBox"

interface ConversationListProps {
  initialItems: FullConversationType[]
}

const ConversationList: React.FC<ConversationListProps> = ({ initialItems }) => {
  const [items,setItems] = useState(initialItems)
  const router = useRouter()
  const { conversationId,isOpen } = useConversation()

  return (
    <div className={clsx(
      'flex flex-col',
      isOpen ? 'hidden' : 'block'
    )}>
      <strong>Messages</strong>
      <div className="flex flex-col gap-2">
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
  )
}
export default ConversationList
