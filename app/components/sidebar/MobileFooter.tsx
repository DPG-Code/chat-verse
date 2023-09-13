'use client'

import useRoutes from "@/app/hooks/useRoutes"
import useConversation from "@/app/hooks/useConversation"

import MobileItem from "./MobileItem"

const MobileFooter = () => {
  const routes = useRoutes()
  const { isOpen } = useConversation()

  if (isOpen) return null

  return (
    <div className='p-4 w-full order-last lg:hidden'>
      <nav>
        <ul className='flex items-center justify-center gap-4'>
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
    </div>
  )
}
export default MobileFooter

