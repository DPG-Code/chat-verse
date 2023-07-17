'use client'

import { useSession } from "next-auth/react"
import { FullMessageType } from "@/app/types"
import Image from "next/image"
import clsx from "clsx"
import { format } from "date-fns"

import Avatar from "@/app/components/Avatar"

interface MessageBoxPops {
  data: FullMessageType
  isLast?: boolean
}

const MessageBox: React.FC<MessageBoxPops> = ({ data,isLast }) => {
  const session = useSession()

  // Check if the message is sent by the current user
  const isOwn = session.data?.user?.email === data.sender.email

  // Get the list of users who have seen the message
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data.sender.email)
    .map((user) => user.name)
    .join(', ')

  // Define CSS classes based on message ownership and type
  const container = clsx(
    'flex gap-3 p-4',
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
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className='flex items-center gap-1'>
          {data.sender.name}
          {format(new Date(data.createdAt),'p')}
        </div>
        <div className={message}>
          {
            data.image ? (
              <Image
                src={data.image}
                width='288'
                height='288'
                className="object-cover cursor-pointer"
                alt='image'
              />
            ) : (
              <p>{data.body}</p>
            )
          }
        </div>
        {
          isLast && isOwn && seenList.length > 0 && (
            <p>Seen by: {seenList}</p>
          )
        }
      </div>
    </div>
  )
}
export default MessageBox
