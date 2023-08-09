'use client'

import { useMemo,useState } from "react"
import Link from "next/link"
import useOtherUser from "@/app/hooks/useOtherUser"
import { Conversation,User } from "@prisma/client"

import Avatar from "@/app/components/Avatar"
import ProfileDrawer from "./ProfileDrawer"
import AvatarGroup from "@/app/components/AvatarGroup"

interface HeaderProps {
  conversation: Conversation & {
    users: User[]
  }
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation)
  const [drawerOpen,setDrawerOpen] = useState(false)

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`
    }

    return 'Active'
  },[conversation])

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className='w-full flex'>
        <Link
          className='lg:hidden'
          href='/conversations'
        >
          Back
        </Link>
        <div className='flex gap-2'>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )
          }
          <div className='flex flex-col'>
            <strong>{conversation.name || otherUser.name}</strong>
            {statusText}
          </div>
          <button onClick={() => setDrawerOpen(true)}>
            options
          </button>
        </div>
      </div>
    </>
  )
}
export default Header
