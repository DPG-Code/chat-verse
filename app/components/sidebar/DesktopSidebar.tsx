'use client'

import { useState } from "react"
import { User } from "@prisma/client"
import useRoutes from "@/app/hooks/useRoutes"
import useDontSeenMessages from "@/app/hooks/useDontSeenMessages"
import { FullConversationType } from "@/app/types"

import DesktopItem from "./DesktopItem"
import Avatar from "../Avatar"
import SettingsModal from "./SettingsModal"

interface DesktopSidebarProps {
  currentUser: User
  conversations: FullConversationType[]
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser,conversations }) => {
  const routes = useRoutes()
  const [isOpen,setIsOpen] = useState(false)

  const messagesNotSeen = useDontSeenMessages(conversations)

  return (
    <>
      <SettingsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        currentUser={currentUser}
      />
      <aside className='py-12 w-32 h-full bg-neutral-950 hidden absolute left-0 z-30 lg:min-h-[520px] lg:flex lg:flex-col lg:justify-between lg:items-center'>
        <nav>
          <ul className='flex flex-col items-center gap-16'>
            {
              routes.map((route) => (
                <DesktopItem
                  key={route.label}
                  label={route.label}
                  href={route.href}
                  icon={route.icon}
                  active={route.active}
                  onClick={route.onClick}
                  messagesNotSeen={messagesNotSeen}
                />
              ))
            }
          </ul>
        </nav>
        <footer className='cursor-pointer' onClick={() => setIsOpen(true)}>
          <Avatar user={currentUser} />
        </footer>
      </aside>
    </>
  )
}
export default DesktopSidebar
