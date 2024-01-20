import getConversations from "../actions/getConversations"
import getUsers from "../actions/getUsers"

import Sidebar from "../components/sidebar/Sidebar"
import ConversationList from "./components/ConversationList"

export default async function ConversationLayout({
  children
}: {
  children: React.ReactNode
}) {
  const conversation = await getConversations()
  const users = await getUsers()

  return (
    // @ts-ignore Server Component
    <Sidebar>
      <main className='h-full w-full flex lg:pl-28 2xl:pl-32'>
        <ConversationList
          initialItems={conversation}
          users={users}
        />
        {children}
      </main>
    </Sidebar>
  )
}
