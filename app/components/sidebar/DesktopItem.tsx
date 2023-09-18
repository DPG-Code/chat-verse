'use client'

import clsx from "clsx"
import Link from "next/link"
import { IconsNavbar } from "../IconsNavbar"
import { IconNavbarType } from "@/app/types"

interface DesktopItemProps {
  label: string
  href: string
  icon: string
  active?: boolean
  onClick?: () => void
  messagesNotSeen: boolean[]
}

const DesktopItem: React.FC<DesktopItemProps> = ({ label,href,icon,active,onClick,messagesNotSeen }) => {
  const handleClick = () => {
    if (onClick) return onClick()
  }

  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          'text-neutral-500 hover:text-white transition relative',
          active && 'text-white'
        )}
      >
        <IconsNavbar icon={icon as IconNavbarType} />
        {
          icon as IconNavbarType === "chat" && messagesNotSeen.length > 0 && (
            <span className='w-3 h-3 bg-red-500 ring-2 ring-neutral-950 rounded-full absolute block top-0 right-0'></span>
          )
        }
        <strong className='sr-only'>{label}</strong>
      </Link>
    </li>
  )
}
export default DesktopItem
