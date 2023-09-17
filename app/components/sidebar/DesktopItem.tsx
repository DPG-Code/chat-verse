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
}

const DesktopItem: React.FC<DesktopItemProps> = ({ label,href,icon,active,onClick }) => {
  const handleClick = () => {
    if (onClick) return onClick()
  }

  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          'text-neutral-500 hover:text-white transition',
          active && 'text-white'
        )}
      >
        <IconsNavbar icon={icon as IconNavbarType} />
        <strong className='sr-only'>{label}</strong>
      </Link>
    </li>
  )
}
export default DesktopItem
