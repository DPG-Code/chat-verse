'use client'

import { useState } from "react"
import { User } from "@prisma/client"
import useRoutes from "@/app/hooks/useRoutes"
import useConversation from "@/app/hooks/useConversation"

import MobileItem from "./MobileItem"
import Avatar from "../Avatar"
import SettingsModal from "./SettingsModal"

interface MobileFooterProps {
  currentUser: User
}

const MobileFooter: React.FC<MobileFooterProps> = ({ currentUser }) => {
  const routes = useRoutes()
  const [isModalOpen,setIsModalOpen] = useState(false)
  const { isOpen } = useConversation()

  if (isOpen) return null

  return (
    <>
      <SettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentUser={currentUser}
      />
      <div className='py-10 w-full flex items-center justify-center gap-8 order-last lg:hidden'>
        <nav>
          <ul className='flex items-center justify-center gap-8'>
            {
              routes.map((route) => (
                <MobileItem
                  key={route.label}
                  label={route.label}
                  href={route.href}
                  icon={route.icon}
                  active={route.active}
                  onClick={route.onClick}
                />
              ))
            }
          </ul>
        </nav>
        <footer className='cursor-pointer' onClick={() => setIsModalOpen(true)}>
          <Avatar user={currentUser} />
        </footer>
      </div>
    </>
  )
}
export default MobileFooter

