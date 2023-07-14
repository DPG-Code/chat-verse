import { useMemo } from "react"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import useConversation from "./useConversation"

// Get the routes for the sidebar
const useRoutes = () => {
  const pathname = usePathname()
  const { conversationId } = useConversation()
  
  const routes = useMemo(() => [
    {
      label: 'Chat',
      href: '/conversations',
      icon: 'chat',
      active: pathname === '/conversations' || !!conversationId
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
