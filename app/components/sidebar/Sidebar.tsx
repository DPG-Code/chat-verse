import getCurrentUser from "@/app/actions/getCurrentUser"
import getConversations from "@/app/actions/getConversations"

import DesktopSidebar from "./DesktopSidebar"
import MobileFooter from "./MobileFooter"

export default async function Sidebar({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  const conversations = await getConversations()

  return (
    <div className='h-full w-full flex flex-col items-start relative lg:flex-row'>
      <DesktopSidebar
        currentUser={currentUser!}
        conversations={conversations!}
      />
      <MobileFooter
        currentUser={currentUser!}
        conversations={conversations!}
      />
      {children}
    </div>
  )
}
