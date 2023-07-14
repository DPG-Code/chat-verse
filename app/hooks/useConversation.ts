import { useMemo } from "react"
import { useParams } from "next/navigation"

// Get the conversation ID and check if the conversation is open
const useConversation = () => {
  const params = useParams()

  // Get the conversation ID
  const conversationId = useMemo(() => {
    if(!params?.conversationId) return ''

    if(params?.conversationId) return params?.conversationId as string
  }, [params?.conversationId])

  // Check if the conversation is open
  const isOpen = useMemo(() => !!conversationId, [conversationId])

  return useMemo(() => ({
    conversationId,
    isOpen
  }), [conversationId, isOpen])
}

export default useConversation