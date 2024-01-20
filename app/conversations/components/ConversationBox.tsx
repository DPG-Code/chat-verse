'use client'

import { useCallback,useMemo } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import clsx from "clsx"
import useOtherUser from "@/app/hooks/useOtherUser"
import { FullConversationType } from "@/app/types"

import Avatar from "@/app/components/Avatar"
import AvatarGroup from "@/app/components/AvatarGroup"
import { IconSeen } from "@/app/components/Icons"

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
    const messages = data.messages || []
    return messages[messages.length - 1]
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
        'p-4 px-6 w-full flex items-center gap-6 cursor-pointer border-l-[6px] border-transparent hover:border-white hover:bg-white/5 transition lg:w-[420px] 2xl:w-[720px] 2xl:px-7 2xl:py-6',
        seleted && 'bg-gray-900'
      )}
      onClick={handleClick}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )
      }
      <section className='w-full flex flex-col'>
        <header className='flex items-center justify-between'>
          <h5 className='text-white text-base font-semibold truncate 2xl:text-xl'>{data.name || otherUser.name}</h5>
          {
            lastMessage?.createdAt && (
              <p className='text-xs text-neutral-600 2xl:text-base'>{format(new Date(lastMessage.createdAt),'p')}</p>
            )
          }
        </header>
        <footer className='flex items-center justify-between'>
          <p className={clsx(
            'text-sm truncate 2xl:text-lg',
            hasSeen ? 'text-neutral-500' : 'text-white'
          )}>
            {lastMessageText}
          </p>
          {
            hasSeen ? <IconSeen status='seen' /> : <IconSeen status='' />
          }
        </footer>
      </section>
    </div>
  )
}
export default ConversationBox
