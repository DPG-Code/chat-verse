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
    'w-full flex items-start gap-4 p-4',
    isOwn && 'justify-end'
  )

  const avatar = clsx(isOwn && 'order-2')

  const body = clsx(
    'flex flex-col gap-2',
    isOwn && 'justify-end'
  )

  const message = clsx(
    'text-sm w-fit overflow-hidden',
    isOwn ? 'bg-sky-500 text-white' : 'bg-gray-200',
    data.image ? 'rounded-md p-0' : 'rounded-full p-2'
  )

  return (
    <div className={container}>
      <aside className={avatar}>
        <Avatar user={data.sender} />
      </aside>
      <section className={body}>
        <header className='flex items-center justify-start gap-2'>
          <p className='font-semibold'>{data.sender.name}</p>
          <span className='text-xs text-gray-500'>{format(new Date(data.createdAt),'p')}</span>
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
                width='288'
                height='288'
                className='object-cover cursor-pointer'
                alt='image'
              />
            ) : (
              <p>{data.body}</p>
            )
          }
        </div>
        {
          isLast && isOwn && seenList.length > 0 && (
            <p className='mt-2 text-xs text-gray-500'>Seen by: {seenList}</p>
          )
        }
      </section>
    </div>
  )
}
export default MessageBox
