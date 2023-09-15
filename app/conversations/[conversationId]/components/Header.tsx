'use client'

import { useMemo,useState } from "react"
import Link from "next/link"
import useOtherUser from "@/app/hooks/useOtherUser"
import { Conversation,User } from "@prisma/client"
import useActiveList from "@/app/hooks/useActiveList"

import Avatar from "@/app/components/Avatar"
import ProfileDrawer from "./ProfileDrawer"
import AvatarGroup from "@/app/components/AvatarGroup"
import { IconBack,IconOptions } from "@/app/components/Icons"

interface HeaderProps {
  conversation: Conversation & {
    users: User[]
  }
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation)
  const [drawerOpen,setDrawerOpen] = useState(false)

  // Get the members list from the useActiveList store
  const { members } = useActiveList()
  // Check if the user is active (in the members list)
  const isActive = members.indexOf(otherUser.email!) !== -1

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`
    }

    return isActive ? 'Active' : 'Offline'
  },[conversation,isActive])

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <header className='p-6 w-full flex gap-6 lg:p-12'>
        <Link
          className='text-white flex items-center lg:hidden'
          href='/conversations'
        >
          <IconBack />
        </Link>
        <aside className='w-full flex items-center gap-6'>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )
          }
          <div className='flex flex-col'>
            <h4 className='text-white text-xl font-semibold lg:text-2xl'>{conversation.name || otherUser.name}</h4>
            <span className='text-sm font-medium text-neutral-300'>{statusText}</span>
          </div>
          <button className='text-white ml-auto' onClick={() => setDrawerOpen(true)}>
            <IconOptions />
          </button>
        </aside>
      </header>
    </>
  )
}
export default Header
