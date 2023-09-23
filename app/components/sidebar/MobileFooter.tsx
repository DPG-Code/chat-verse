'use client'

import { useState } from "react"
import { User } from "@prisma/client"
import useRoutes from "@/app/hooks/useRoutes"
import useConversation from "@/app/hooks/useConversation"
import useDontSeenMessages from "@/app/hooks/useDontSeenMessages"
import { FullConversationType } from "@/app/types"

import MobileItem from "./MobileItem"
import Avatar from "../Avatar"
import SettingsModal from "./SettingsModal"

interface MobileFooterProps {
  currentUser: User
  conversations: FullConversationType[]
}

const MobileFooter: React.FC<MobileFooterProps> = ({ currentUser,conversations }) => {
  const routes = useRoutes()
  const [isModalOpen,setIsModalOpen] = useState(false)
  const { isOpen } = useConversation()
  const messagesNotSeen = useDontSeenMessages(conversations)

  if (isOpen) return null

  return (
    <>
      <SettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentUser={currentUser}
      />
      <footer className='w-full h-24 bg-neutral-950 flex items-center justify-center gap-8 absolute bottom-0 z-30 lg:hidden'>
        <nav>
          <ul className='flex items-center justify-center gap-12'>
            {
              routes.map((route) => (
                <MobileItem
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
        <div data-test-id='settings-profile' className='cursor-pointer' onClick={() => setIsModalOpen(true)}>
          <Avatar user={currentUser} />
        </div>
      </footer>
    </>
  )
}
export default MobileFooter

