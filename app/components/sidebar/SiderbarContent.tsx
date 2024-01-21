'use client'

import { useState } from "react"
import { User } from "@prisma/client"
import useRoutes from "@/app/hooks/useRoutes"
import useConversation from "@/app/hooks/useConversation"
import useDontSeenMessages from "@/app/hooks/useDontSeenMessages"
import { FullConversationType } from "@/app/types"

import SiderbarItem from "./SiderbarItem"
import Avatar from "../Avatar"
import SettingsModal from "./SettingsModal"

interface SiderbarContentProps {
  currentUser: User
  conversations: FullConversationType[]
}

const SiderbarContent: React.FC<SiderbarContentProps> = ({ currentUser,conversations }) => {
  const routes = useRoutes()
  const [isModalOpen,setIsModalOpen] = useState(false)
  const { isOpen } = useConversation()
  const messagesNotSeen = useDontSeenMessages(conversations)

  // if (isOpen) return null

  return (
    <>
      <SettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentUser={currentUser}
      />
      <aside
        className={`${isOpen ? 'hidden lg:flex' : 'flex'} bg-neutral-950 z-30 absolute w-full h-24 items-center justify-center gap-10 bottom-0 lg:py-12 lg:w-28 lg:h-full lg:left-0 lg:min-h-[520px] lg:border-r lg:border-neutral-700 lg:flex-col lg:gap-0 2xl:w-32`}
      >
        <img className='w-auto h-8 invert hidden lg:mb-16 lg:block' src='/chatverse-icon.webp' alt='chatverse-icon' />
        <nav className="lg:mb-auto">
          <ul className='flex items-center justify-center gap-12 lg:flex-col lg:gap-16'>
            {
              routes.map((route) => (
                <SiderbarItem
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
        <div data-test-id='settings-profile' className='tooltip cursor-pointer' onClick={() => setIsModalOpen(true)}>
          <Avatar user={currentUser} />
          <span className='tooltiptext-profile'>Profile</span>
        </div>
      </aside>
    </>
  )
}
export default SiderbarContent
