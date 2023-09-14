'use client'

import { useState } from "react"
import { User } from "@prisma/client"
import useRoutes from "@/app/hooks/useRoutes"

import DesktopItem from "./DesktopItem"
import Avatar from "../Avatar"
import SettingsModal from "./SettingsModal"

interface DesktopSidebarProps {
  currentUser: User
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes()
  const [isOpen,setIsOpen] = useState(false)

  return (
    <>
      <SettingsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        currentUser={currentUser}
      />
      <aside className='py-12 w-32 h-full bg-white hidden absolute left-0 z-40 lg:flex lg:flex-col lg:justify-between lg:items-center'>
        <nav>
          <ul className='flex flex-col items-center gap-12'>
            {
              routes.map((route) => (
                <DesktopItem
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
        <footer className='cursor-pointer' onClick={() => setIsOpen(true)}>
          <Avatar user={currentUser} />
        </footer>
      </aside>
    </>
  )
}
export default DesktopSidebar
