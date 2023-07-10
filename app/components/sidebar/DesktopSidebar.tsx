'use client'

import { useState } from "react"
import { User } from "@prisma/client"
import useRoutes from "@/app/hooks/useRoutes"

import DesktopItem from "./DesktopItem"
import Avatar from "../Avatar"

interface DesktopSidebarProps {
  currentUser: User
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes()
  const [isOpen,setIsOpen] = useState(false)

  return (
    <div className="h-full hidden lg:flex">
      <nav>
        <ul className="flex flex-col items-center justify-center">
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
      <div onClick={() => setIsOpen(true)}>
        <Avatar user={currentUser} />
      </div>
    </div>
  )
}
export default DesktopSidebar
