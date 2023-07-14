import { useMemo } from "react"
import { useSession } from "next-auth/react"
import { User } from "@prisma/client"
import { FullConversationType } from "../types"

// Get the other user in a conversation
const useOtherUser = (conversation: FullConversationType | { users: User[] }) => {
  const session = useSession()

  const otherUser = useMemo(() => {
    const currentUserEmail = session.data?.user?.email

    const otherUser = conversation.users.filter((user) =>  user.email !== currentUserEmail)

    return otherUser[0]
  }, [session.data?.user?.email, conversation.users])

  return otherUser
}
export default useOtherUser
