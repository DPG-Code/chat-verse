import getCurrentUser from "@/app/actions/getCurrentUser"

import DesktopSidebar from "./DesktopSidebar"
import MobileFooter from "./MobileFooter"

export default async function Sidebar({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <div className='h-full w-full flex flex-col items-start relative lg:flex-row'>
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter currentUser={currentUser!} />
      {children}
    </div>
  )
}
