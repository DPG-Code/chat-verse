'use client'

import { useEffect,useMemo,useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import clsx from "clsx"
import { User } from "@prisma/client"
import useConversation from "@/app/hooks/useConversation"
import { FullConversationType } from "@/app/types"
import { pusherClient } from "@/app/libs/pusher"
import { find } from "lodash"
import useDontSeenMessages from "@/app/hooks/useDontSeenMessages"

import ConversationBox from "./ConversationBox"
import GroupChatModal from "./GroupChatModal"
import { IconGroup,IconSearch } from "@/app/components/Icons"

interface ConversationListProps {
  initialItems: FullConversationType[]
  users: User[]
}

const ConversationList: React.FC<ConversationListProps> = ({ initialItems,users }) => {
  const session = useSession()
  const [items,setItems] = useState(initialItems)
  const [filteredConversation,setFilteredConversation] = useState<FullConversationType[]>(items)
  const [isModalOpen,setIsModalOpen] = useState(false)
  const messagesNotSeen = useDontSeenMessages(initialItems)

  const router = useRouter()
  const { conversationId,isOpen } = useConversation()

  // Generate Pusher key from user's email
  const pusherKey = useMemo(() => {
    return session.data?.user?.email
  },[session.data?.user?.email])

  const filterConversations = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase()
    const filtered = items.filter(conversation => conversation.name?.toLocaleLowerCase().includes(searchTerm) || conversation.users[1].name?.toLocaleLowerCase().includes(searchTerm))
    setFilteredConversation(filtered)
  }

  useEffect(() => {
    if (!pusherKey) return

    pusherClient.subscribe(pusherKey)

    // Handlers for different Pusher events
    const newConversaionHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current,{ id: conversation.id })) return current
        return [conversation,...current]
      })
    }

    const updateConversaionHandler = (conversation: FullConversationType) => {
      setItems((current) => current.map((currentConversation) => {
        if (currentConversation.id === conversation.id) {
          return {
            ...currentConversation,
            messages: conversation.messages
          }
        }

        return currentConversation
      }))
    }

    const removeConversaionHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((currentConversation) => currentConversation.id !== conversation.id)]
      })

      if (conversationId === conversation.id) router.push('/conversations')
    }

    // Bind event listeners
    pusherClient.bind('conversation:new',newConversaionHandler)
    pusherClient.bind('conversation:update',updateConversaionHandler)
    pusherClient.bind('conversation:remove',removeConversaionHandler)

    // Unsubscribe and clean up event listeners when component unmounts
    return () => {
      pusherClient.unsubscribe(pusherKey)
      pusherClient.unbind('conversation:new',newConversaionHandler)
      pusherClient.unbind('conversation:update',updateConversaionHandler)
      pusherClient.unbind('conversation:remove',removeConversaionHandler)
    }
  },[pusherKey,conversationId,router])


  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <section id='conversation-container' className={clsx(
        'w-full flex flex-col overflow-hidden gap-6 lg:gap-10',
        isOpen ? 'hidden' : 'block'
      )}>
        <header className='px-6 pt-12 flex items-center justify-between z-20 2xl:px-12'>
          <h3 className='text-white text-2xl font-semibold flex items-center gap-4 lg:text-3xl'>
            Messages
            <p className={`w-7 h-7 flex items-center justify-center text-xs rounded-full text-white lg:w-8 lg:h-8 2xl:w-10 2xl:h-10 2xl:text-sm ${messagesNotSeen.length > 0 ? 'bg-fuchsia-700/50' : 'bg-neutral-700'}`}>
              {
                messagesNotSeen.length === 0
                  ? '0'
                  : messagesNotSeen.length < 100
                    ? `${messagesNotSeen.length}`
                    : '+99'
              }
            </p>
          </h3>
          <button data-test-id="group-chat" onClick={() => setIsModalOpen(true)}>
            <div className='block text-neutral-500 hover:text-white transition lg:hidden'>
              <IconGroup size='w-7 h-7' />
            </div>
            <div className='hidden p-1.5 w-auto border border-neutral-300 backdrop-blur bg-neutral-400/5 text-white font-light text-xl items-center justify-between gap-6 rounded-full hover:bg-neutral-400/10 transition lg:flex'>
              <span className='ml-3'>New group</span>
              <div className='p-2 bg-white text-[#0a0a0a] grid place-content-center rounded-full'>
                <IconGroup size='w-6 h-6 2xl:w-8 2xl:h-8' />
              </div>
            </div>
          </button>
        </header>
        <div className='px-6 w-full flex relative items-center lg:pr-0 lg:w-[420px] 2xl:pr-0 2xl:w-[720px] 2xl:px-12'>
          <input
            className='py-2 px-6 border border-neutral-700 outline-0 w-full text-lg bg-neutral-900 text-white placeholder:text-neutral-500 rounded-xl 2xl:py-3 2xl:px-7 2xl:text-xl'
            type='text'
            placeholder='Search conversations...'
            onChange={filterConversations}
          />
          <IconSearch size='w-6 h-6 text-neutral-500 absolute right-6 2xl:right-7' />
        </div>
        <div className='h-full w-full flex flex-col overflow-y-scroll z-20'>
          {
            filteredConversation.map((item) => (
              <ConversationBox
                key={item.id}
                data={item}
                seleted={conversationId === item.id}
              />
            ))
          }
        </div>
      </section>
    </>
  )
}
export default ConversationList
