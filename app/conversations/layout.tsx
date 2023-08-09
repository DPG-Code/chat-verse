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
      <div className='h-full'>
        <ConversationList
          initialItems={conversation}
          users={users}
        />
        {children}
      </div>
    </Sidebar>
  )
}
