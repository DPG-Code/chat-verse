"use client"

import { useCallback,useMemo } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import clsx from "clsx"
import useOtherUser from "@/app/hooks/useOtherUser"
import { FullConversationType } from "@/app/types"

import Avatar from "@/app/components/Avatar"

interface ConversationBoxProps {
  data: FullConversationType
  seleted?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ data,seleted }) => {
  const otherUser = useOtherUser(data)
  const session = useSession()
  const router = useRouter()

  // Handle click event to navigate to the conversation
  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`)
  },[data.id,router])

  // Get last message with the user
  const lastMessage = useMemo(() => {
    const message = data.messages || []
    return message[data.messages.length - 1]
  },[data.messages])

  // Get the user's email
  const userEmail = useMemo(() => {
    return session.data?.user?.email
  },[session.data?.user?.email])

  // Check if the current user has seen the last message
  const hasSeen = useMemo(() => {
    if (!lastMessage) return false

    const seenArray = lastMessage.seen || []

    if (!userEmail) return false

    return seenArray.filter((user) => user.email === userEmail).length !== 0
  },[lastMessage,userEmail])

  // Get the text of the last message
  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return 'Sent an image'

    if (lastMessage?.body) return lastMessage.body

    return 'Started a conversation'
  },[lastMessage?.image,lastMessage?.body])

  return (
    <div
      className={clsx(
        'flex gap-2 hover:bg-gray-400',
        seleted && 'bg-gray-400'
      )}
      onClick={handleClick}
    >
      <Avatar user={otherUser} />
      <div className="flex flex-col gap-1">
        <strong className="truncate">{data.name || otherUser.name}</strong>
        {
          lastMessage?.createdAt && (
            <p>{format(new Date(lastMessage.createdAt),'p')}</p>
          )
        }
        <p className={clsx(
          'truncate',
          hasSeen ? 'text-gray-600' : 'text-black'
        )}>
          {lastMessageText}
        </p>
      </div>
    </div>
  )
}
export default ConversationBox
