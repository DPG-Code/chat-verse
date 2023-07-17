'use client'

import { useMemo } from "react"
import Link from "next/link"
import { Conversation,User } from "@prisma/client"
import useOtherUser from "@/app/hooks/useOtherUser"
import Avatar from "@/app/components/Avatar"

interface HeaderProps {
  conversation: Conversation & {
    users: User[]
  }
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation)

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`
    }

    return 'Active'
  },[conversation])

  return (
    <div className="w-full flex">
      <Link
        className="lg:hidden"
        href='/conversations'
      >
        Back
      </Link>
      <div className='flex gap-2'>
        <Avatar user={otherUser} />
        <div className="flex flex-col">
          <strong>{conversation.name || otherUser.name}</strong>
          {statusText}
        </div>
        <button onClick={() => { }}>
          options
        </button>
      </div>
    </div>
  )
}
export default Header
