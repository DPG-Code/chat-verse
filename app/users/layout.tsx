import getUsers from "../actions/getUsers"

import Sidebar from "../components/sidebar/Sidebar"
import UserList from "./components/UserList"

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const users = await getUsers()

  return (
    // @ts-ignore Server Component
    <Sidebar>
      <main className='h-full w-full flex'>
        <UserList items={users} />
        {children}
      </main>
    </Sidebar>
  )
}
