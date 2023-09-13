import { IconNavbarType } from "../types"

const ICON_ROUTE = {
  chat: () => {
    return (
      <svg className="w-6 h-6 lg:w-8 lg:h-8" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1"></path>
      </svg>
    )
  },
  users: () => {
    return (
      <svg className="w-6 h-6 lg:w-8 lg:h-8" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
      </svg>
    )
  },
  logout: () => {
    return (
      <svg className="w-6 h-6 lg:w-8 lg:h-8" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
        <path d="M9 12h12l-3 -3"></path>
        <path d="M18 15l3 -3"></path>
      </svg>
    )
  }
}

export const IconsNavbar = ({ icon }: { icon: IconNavbarType }) => {
  const IconComponent = ICON_ROUTE[icon]

  return <IconComponent />
}
