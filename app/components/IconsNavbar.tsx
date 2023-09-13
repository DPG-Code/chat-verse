import { IconNavbarType } from "../types"

const ICON_ROUTE = {
  chat: () => {
    return (
      <svg
        className="w-6 h-6"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M0 0h24v24H0z" stroke="none" />
        <path d="M3 20l1.3-3.9C1.976 12.663 2.874 8.228 6.4 5.726c3.526-2.501 8.59-2.296 11.845.48 3.255 2.777 3.695 7.266 1.029 10.501C16.608 19.942 11.659 20.922 7.7 19L3 20" />
      </svg>
    )
  },
  users: () => {
    return (
      <svg
        className="w-6 h-6"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M0 0h24v24H0z" stroke="none" />
        <path d="M5 7a4 4 0 108 0 4 4 0 10-8 0M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2M16 3.13a4 4 0 010 7.75M21 21v-2a4 4 0 00-3-3.85" />
      </svg>
    )
  },
  logout: () => {
    return (
      <svg
        className="w-6 h-6"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M0 0h24v24H0z" stroke="none" />
        <path d="M10 8V6a2 2 0 012-2h7a2 2 0 012 2v12a2 2 0 01-2 2h-7a2 2 0 01-2-2v-2" />
        <path d="M15 12H3l3-3M6 15l-3-3" />
      </svg>
    )
  }
}

export const IconsNavbar = ({ icon }: { icon: IconNavbarType }) => {
  const IconComponent = ICON_ROUTE[icon]

  return <IconComponent />
}
