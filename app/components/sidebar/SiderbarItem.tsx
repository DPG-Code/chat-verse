'use client'

import clsx from "clsx"
import Link from "next/link"
import { IconsNavbar } from "../IconsNavbar"
import { IconNavbarType } from "@/app/types"

interface SiderbarItemProps {
  label: string
  href: string
  icon: string
  active?: boolean
  onClick?: () => void
  messagesNotSeen: boolean[]
}

const SiderbarItem: React.FC<SiderbarItemProps> = ({ label,href,icon,active,onClick,messagesNotSeen }) => {
  const handleClick = () => {
    if (onClick) return onClick()
  }

  return (
    <li
      data-test-id={icon}
      onClick={handleClick}
    >
      <Link
        href={href}
        className={clsx(
          'tooltip text-neutral-400 hover:text-white transition relative',
          active && 'text-white'
        )}
      >
        <IconsNavbar icon={icon as IconNavbarType} />
        {
          icon as IconNavbarType === "chat" && messagesNotSeen.length > 0 && (
            <span className='w-2 h-2 bg-red-500 ring-2 ring-neutral-950 rounded-full absolute block top-0 right-0 lg:w-3 lg:h-3'></span>
          )
        }
        <span className='tooltiptext'>{label}</span>
      </Link>
    </li>
  )
}
export default SiderbarItem
