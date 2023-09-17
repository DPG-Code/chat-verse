'use client'

import clsx from "clsx"
import Link from "next/link"
import { IconsNavbar } from "../IconsNavbar"
import { IconNavbarType } from "@/app/types"

interface MobileItemProps {
  label: string
  href: string
  icon: string
  active?: boolean
  onClick?: () => void
}

const MobileItem: React.FC<MobileItemProps> = ({ label,href,icon,active,onClick }) => {
  const handleClick = () => {
    if (onClick) return onClick()
  }

  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          'text-neutral-400 hover:text-white transition',
          active && 'text-white'
        )}
      >
        <IconsNavbar icon={icon as IconNavbarType} />
        <strong className='sr-only'>{label}</strong>
      </Link>
    </li>
  )
}
export default MobileItem
