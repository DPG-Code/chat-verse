import { usePathname } from "next/navigation"
import { useMemo } from "react"
import useConversation from "./useConversation"
import { signOut } from "next-auth/react"

// Get routes for sidebar
const useRoutes = () => {
  const pathname = usePathname()
  const { conversationId } = useConversation()
  
  const routes = useMemo(() => [
    {
      label: 'Chat',
      href: '/conversation',
      icon: 'chat',
      active: pathname === '/conversation' || !!conversationId
    },
    {
      label: 'Users',
      href: '/users',
      icon: 'users',
      active: pathname === '/users'
    },
    {
      label: 'Logout',
      href: '#',
      icon: 'logout',
      onClick: () => signOut()
    }
  ], [conversationId, pathname])

  return routes
}
export default useRoutes
