'use client'

import { useMemo,Fragment,useState } from 'react'
import { Conversation,User } from "@prisma/client"
import useOtherUser from "@/app/hooks/useOtherUser"
import { format } from 'date-fns'
import { Transition,Dialog } from '@headlessui/react'

import Avatar from '@/app/components/Avatar'
import ConfirmModal from './ConfirmModal'

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
      return `${data.users.length} members`
    }

    return 'Active'
  },[data.isGroup,data.users.length])

  return (
    <>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      />
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-500'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-out duration-500'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-40' />
          </Transition.Child>
          <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
            <Transition.Child
              as={Fragment}
              enter='transform transition ease-in-out duration-500'
              enterFrom='translate-x-full'
              enterTo='translate-x-0'
              leave='transform transition ease-in-out duration-500'
              leaveTo='translate-x-full'
            >
              <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                <div className='flex flex-col items-center justify-center h-full overflow-y-scroll bg-white py-6 shadow-xl'>
                  <button
                    type='button'
                    onClick={onClose}
                  >
                    Close panel
                  </button>
                  <Avatar user={otherUser} />
                  <strong>{title}</strong>
                  <p>{statusText}</p>
                  <div className="cursor-pointer" onClick={() => setConfirmOpen(true)}>
                    <div>delete conversation</div>
                  </div>
                  {!data.isGroup && (
                    <div>
                      <dt className='text-sm sm:w-40 sm:flex-shrink-0'>Email</dt>
                      <dd className='mt-2 text-sm sm:col-span-2'>{otherUser.email}</dd>
                    </div>
                  )}
                  {!data.isGroup && (
                    <>
                      <hr />
                      <dt className='text-sm sm:w-40 sm:flex-shrink-0'>Joined</dt>
                      <dd className='mt-2 text-sm sm:col-span-2'>
                        <time dateTime={joinedData}>{joinedData}</time>
                      </dd>
                    </>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
export default ProfileDrawer
