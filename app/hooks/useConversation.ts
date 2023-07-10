import { useParams } from "next/navigation"
import { useMemo } from "react"

// Get conversation ID and if this conversation is open
const useConversation = () => {
  const params = useParams()

  const conversationId = useMemo(() => {
    if(!params?.conversationId) return ''

    if(params?.conversationId) return params?.conversationId as string
  }, [params?.conversationId])

  const isOpen = useMemo(() => !!conversationId, [conversationId])

  return useMemo(() => ({
    conversationId,
    isOpen
  }), [conversationId, isOpen])
}

export default useConversation