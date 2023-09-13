import getConversationById from "@/app/actions/getConversationById"
import getMessages from "@/app/actions/getMessages"

import EmptyState from "@/app/components/EmptyState"
import Header from "./components/Header"
import Body from "./components/Body"
import Form from "./components/Form"

interface IParams {
  conversationId: string
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId)
  const messages = await getMessages(params.conversationId)

  if (!conversation) {
    return (
      <div className='w-full h-full'>
        <EmptyState />
      </div>
    )
  }

  return (
    <div className='w-full h-full max-h-screen'>
      <Header conversation={conversation} />
      <Body initialMessages={messages} />
      <Form />
    </div>
  )
}
export default ConversationId
