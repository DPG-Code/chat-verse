'use client'

import { useState } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import clsx from "clsx"
import { format } from "date-fns"
import { FullMessageType } from "@/app/types"

import Avatar from "@/app/components/Avatar"
import ImageModal from "./ImageModal"

interface MessageBoxPops {
  data: FullMessageType
  isLast?: boolean
}

const MessageBox: React.FC<MessageBoxPops> = ({ data,isLast }) => {
  const session = useSession()
  const [imageModalOpen,setImageModalOpen] = useState(false)

  // Check if the message is sent by the current user
  const isOwn = session.data?.user?.email === data.sender.email

  // Get the list of users who have seen the message
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data.sender.email)
    .map((user) => user.name)
    .join(', ')

  // Define CSS classes based on message ownership and type
  const container = clsx(
    'py-4 w-full flex items-start gap-4',
    isOwn && 'justify-end'
  )

  const avatar = clsx(isOwn && 'order-2')

  const body = clsx(
    'flex flex-col gap-4',
    isOwn && 'justify-end items-end'
  )

  const message = clsx(
    'text-lg font-light w-fit overflow-hidden lg:texl-xl',
    isOwn ? 'bg-fuchsia-800/25 text-white' : 'bg-neutral-900 text-white',
    (!data.image && isOwn) && 'rounded-l-2xl rounded-b-2xl p-2 px-4',
    (!data.image && !isOwn) && 'rounded-r-2xl rounded-b-2xl p-2 px-4',
    data.image && 'w-52 h-52 p-0 lg:w-96 lg:h-96'
  )

  return (
    <div className={container}>
      <aside className={avatar}>
        <Avatar user={data.sender} />
      </aside>
      <section className={body}>
        <header className='flex items-center justify-start gap-6'>
          <p className={`${isOwn && 'order-2'} text-white text-lg font-semibold lg:text-xl`}>{data.sender.name}</p>
          <p className='text-xs text-neutral-400 font-medium lg:text-sm'>{format(new Date(data.createdAt),'p')}</p>
        </header>
        <div className={message}>
          <ImageModal
            isOpen={imageModalOpen}
            src={data.image}
            onClose={() => setImageModalOpen(false)}
          />
          {
            data.image ? (
              <Image
                onClick={() => setImageModalOpen(true)}
                src={data.image}
                width='208'
                height='208'
                className='w-52 h-52 rounded-xl object-cover cursor-pointer lg:w-96 lg:h-96'
                alt='image'
              />
            ) : (
              <p>{data.body}</p>
            )
          }
        </div>
        {
          isLast && isOwn && seenList.length > 0 && (
            <p className='mt-2 text-xs text-neutral-400 lg:text-sm'>Seen by: <span className='font-semibold'>{seenList}</span></p>
          )
        }
      </section>
    </div>
  )
}
export default MessageBox
