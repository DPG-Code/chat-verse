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
    <div className="h-full flex">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter />
      <div>
        {children}
      </div>
    </div>
  )
}
