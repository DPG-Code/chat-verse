'use client'

import useRoutes from "@/app/hooks/useRoutes"
import useConversation from "@/app/hooks/useConversation"

import MobileItem from "./MobileItem"

const MobileFooter = () => {
  const routes = useRoutes()
  const { isOpen } = useConversation()

  if (isOpen) return null

  return (
    <div className="flex items-end justify-end lg:hidden">
      <ul className="flex flex-col items-center justify-center">
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
    </div>
  )
}
export default MobileFooter

