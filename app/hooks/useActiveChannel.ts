import { useEffect, useState } from "react"
import useActiveList from "./useActiveList"
import { Channel, Members } from "pusher-js"
import { pusherClient } from "../libs/pusher"

const useActiveChannel = () => {
  const {set, add, remove} = useActiveList()
  // Initialize the state for the active Pusher channel
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null)

  useEffect(() => {
    let channel = activeChannel

    // Subscribe to the Pusher channel if it's not already active
    if(!channel) {
      channel = pusherClient.subscribe('presence-messenger')
      setActiveChannel(channel)
    }

    const setMembers = (members: Members) => {
      const initialMember: string[] = []
      // Iterate through members and add their IDs to the active list
      members.each((member: Record<string, any>) => initialMember.push(member.id))
      set(initialMember)
    }

    const addMembers = (member: Record<string, any>) => add(member.id)

    const removeMembers = (member: Record<string, any>) => remove(member.id)

    // Bind event listeners to the Pusher channel
    channel.bind('pusher:subscription_succeeded', setMembers)
    channel.bind('pusher:member_added', addMembers)
    channel.bind('pusher:member_removed', removeMembers)

    // Clean up by unsubscribing from the channel when the component unmounts
    return () => {
      if(activeChannel) {
        pusherClient.unsubscribe('presence-messenger')
        setActiveChannel(null)
      }
    }
  }, [activeChannel, set, add, remove])
}
export default useActiveChannel
