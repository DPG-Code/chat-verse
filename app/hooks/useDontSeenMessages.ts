import { useMemo } from "react"
import { useSession } from "next-auth/react"
import { FullConversationType } from "../types"

// Get quantity of message not seen information
const useDontSeenMessages = (conversations: FullConversationType[]) : boolean[] => {
  const session = useSession()

  // Get last messages with the user
  const lastMessages = useMemo(() => {
    const lastMessagesArray = conversations.map((conversation) => {
      const messages = conversation.messages || []
      return messages[messages.length - 1]
    })

    return lastMessagesArray
  }, [conversations])

  // Get the user's email
  const userEmail = useMemo(() => {
    return session.data?.user?.email
  },[session.data?.user?.email])

  // Check if the current user has seen the last messages
  const hasNotSeen = useMemo(() => {
    const notSeen = lastMessages.map((message) => {
      const seenArray = message.seen || []
      if (!userEmail) return false
      return seenArray.filter((user) => user.email === userEmail).length !== 0
    })

    return notSeen.filter((seen) => seen !== true)
  },[userEmail, lastMessages])

  return hasNotSeen
}

export default useDontSeenMessages