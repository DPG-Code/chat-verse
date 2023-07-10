'use client'

import clsx from "clsx"
import Link from "next/link"

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
          'text-gray-500 hover:text-black',
          active && 'text-black'
        )}
      >
        <span>{icon}</span>
        <strong className="sr-only">{label}</strong>
      </Link>
    </li>
  )
}
export default DesktopItem
