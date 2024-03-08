'use client'

import { useMemo,useState } from 'react'
import useOtherUser from "@/app/hooks/useOtherUser"
import { Conversation,User } from "@prisma/client"
import { format } from 'date-fns'
import useActiveList from '@/app/hooks/useActiveList'
import { motion } from 'framer-motion'

import ConfirmModal from './ConfirmModal'
import Avatar from '@/app/components/Avatar'
import AvatarGroup from '@/app/components/AvatarGroup'
import { IconClose,IconGroup,IconTrash } from '@/app/components/Icons'

interface ProfileDrawerProps {
  data: Conversation & {
    users: User[]
  }
  isOpen: boolean
  onClose: () => void
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ data,isOpen,onClose }) => {
  const otherUser = useOtherUser(data)
  const [confirmOpen,setConfirmOpen] = useState(false)

  // Get the members list from the useActiveList store
  const { members } = useActiveList()
  // Check if the user is active (in the members list)
  const isActive = members.indexOf(otherUser.email!) !== -1

  // Get the formatted date in a readable format
  const joinedData = useMemo(() => {
    return format(new Date(otherUser.createdAt),'PP')
  },[otherUser.createdAt])

  // Get the title of the conversation or the name of the user
  const title = useMemo(() => {
    return data.name || otherUser.name
  },[data.name,otherUser.name])

  // Get the status text, which is the number of members for groups or "Active" for individual users
  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} Members`
    }

    return isActive ? 'Active' : 'Offline'
  },[data.isGroup,data.users.length,isActive])

  const variantsContainer = {
    open: { display: 'flex' },
    closed: { display: 'none' },
  }

  const variantsModal = {
    open: { x: 0 },
    closed: { x: '100%' },
  }

  return (
    <>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      />
      <motion.section
        className={`${isOpen ? 'flex' : 'hidden'} w-full h-full backdrop-blur bg-neutral-950/25 flex justify-end absolute z-30 overflow-hidden lg:-ml-32`}
        animate={isOpen ? "open" : "closed"}
        variants={variantsContainer}
      >
        <motion.div
          className='px-6 pt-20 h-full bg-neutral-950 shadow-2xl flex flex-col overflow-y-scroll gap-8 relative lg:px-16 lg:pt-24'
          animate={isOpen ? "open" : "closed"}
          variants={variantsModal}
        >
          <header className='flex flex-col items-center justify-center gap-4 lg:gap-6'>
            {data.isGroup ? (
              <AvatarGroup users={data.users} />
            ) : (
              <Avatar user={otherUser} />
            )
            }
            <h3 className='text-white text-2xl font-semibold lg:text-4xl'>{title}</h3>
            <p className='-mt-4 text-base font-medium text-neutral-400 lg:text-lg'>{statusText}</p>
          </header>
          {/* Information members group */}
          {data.isGroup && (
            <article className='px-4 py-2 w-full flex flex-col gap-2 bg-neutral-900 rounded-lg 2xl:px-6 2xl:py-3 2xl:rounded-xl'>
              <div className='flex items-center gap-2'>
                <IconGroup size='text-white w-5 h-5' />
                <h5 className='text-white text-base font-semibold sm:flex-shrink-0 lg:text-lg 2xl:text-xl'>Team Members ({data.users.length})</h5>
              </div>
              <div className='w-full flex flex-col'>
                {data.users.map((user,i) => <p key={i} className='text-neutral-400 text-sm font-semibold truncate lg:text-base 2xl:text-lg'>{user.email}</p>)}
              </div>
            </article>
          )}
          {/* Information no group */}
          {!data.isGroup && (
            <article className='px-4 py-2 w-full flex flex-col gap-1 bg-neutral-900 rounded-lg 2xl:px-6 2xl:py-3 2xl:rounded-xl'>
              <h5 className='text-white text-base font-semibold sm:flex-shrink-0 lg:text-lg 2xl:text-xl'>Email</h5>
              <p className='text-neutral-500 text-sm font-semibold lg:text-base 2xl:text-lg'>{otherUser.email}</p>
            </article>
          )}
          {!data.isGroup && (
            <article className='px-4 py-2 w-full flex flex-col gap-1 bg-neutral-900 rounded-lg 2xl:px-6 2xl:py-3 2xl:rounded-xl'>
              <h5 className='text-white text-base font-semibold sm:flex-shrink-0 lg:text-lg 2xl:text-xl'>Joined</h5>
              <time className='text-neutral-500 text-sm font-semibold lg:text-base 2xl:text-lg' dateTime={joinedData}>{joinedData}</time>
            </article>
          )}
          <button
            data-test-id='open-modal-delete-conversation'
            className='py-2.5 px-12 backdrop-blur bg-neutral-300/5 text-white font-medium flex items-center justify-center gap-3 rounded-full hover:bg-neutral-300/10 transition'
            onClick={() => setConfirmOpen(true)}
          >
            <span>Delete</span>
            <IconTrash />
          </button>
          <button
            className='text-white absolute top-8 right-8'
            type='button'
            onClick={onClose}
          >
            <IconClose />
          </button>
        </motion.div>
      </motion.section>
    </>
  )
}
export default ProfileDrawer
