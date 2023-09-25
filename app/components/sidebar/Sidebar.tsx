import getCurrentUser from "@/app/actions/getCurrentUser"
import getConversations from "@/app/actions/getConversations"

import SiderbarContent from "./SiderbarContent"

export default async function Sidebar({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  const conversations = await getConversations()

  return (
    <div className='h-full w-full flex flex-col items-start relative lg:flex-row'>
      <SiderbarContent
        currentUser={currentUser!}
        conversations={conversations}
      />
      {children}
    </div>
  )
}
