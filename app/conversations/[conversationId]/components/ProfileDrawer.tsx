'use client'

import { useMemo,useState } from 'react'
import useOtherUser from "@/app/hooks/useOtherUser"
import { Conversation,User } from "@prisma/client"
import { format } from 'date-fns'
// import { Transition,Dialog } from '@headlessui/react'
import useActiveList from '@/app/hooks/useActiveList'

import ConfirmModal from './ConfirmModal'
import Avatar from '@/app/components/Avatar'
import AvatarGroup from '@/app/components/AvatarGroup'
import { IconClose,IconTrash } from '@/app/components/Icons'

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
      return `${data.users.length} members`
    }

    return isActive ? 'Active' : 'Offline'
  },[data.isGroup,data.users.length,isActive])

  return (
    <>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      />
      <section className={`${isOpen ? 'block' : 'hidden'} w-full h-full backdrop-blur flex justify-end absolute z-30 lg:-ml-32`}>
        <div className='px-12 h-full bg-neutral-950 shadow-2xl flex flex-col items-center justify-center overflow-y-scroll gap-8 lg:px-16'>
          <header className='flex flex-col items-center justify-center gap-4 lg:gap-6'>
            {data.isGroup ? (
              <AvatarGroup users={data.users} />
            ) : (
              <Avatar user={otherUser} />
            )
            }
            <h3 className='text-white text-2xl font-semibold lg:text-4xl'>{title}</h3>
            <p className='-mt-4 text-base font-medium text-neutral-400 lg:text-lg lg:-mt-6'>{statusText}</p>
            <button
              className='py-2.5 px-12 bg-neutral-900 text-white font-bold flex items-center justify-center gap-2 rounded-xl hover:bg-neutral-800 transition'
              onClick={() => setConfirmOpen(true)}
            >
              <span>Delete</span>
              <IconTrash />
            </button>
          </header>
          {/* Information members group */}
          {data.isGroup && (
            <article className='w-full flex flex-col gap-1'>
              <h5 className='text-white text-base font-semibold sm:flex-shrink-0 lg:text-lg'>Emails</h5>
              <div className='w-full flex flex-col'>
                {data.users.map((user,i) => <p key={i} className='text-neutral-500 text-sm font-semibold lg:text-base'>{user.email}</p>)}
              </div>
            </article>
          )}
          {/* Information no group */}
          {!data.isGroup && (
            <article className='w-full flex flex-col gap-1'>
              <h5 className='text-white text-base font-semibold sm:flex-shrink-0 lg:text-lg'>Email</h5>
              <p className='text-neutral-500 text-sm font-semibold lg:text-base'>{otherUser.email}</p>
            </article>
          )}
          {!data.isGroup && (
            <article className='w-full flex flex-col gap-1'>
              <h5 className='text-white text-base font-semibold sm:flex-shrink-0 lg:text-lg'>Joined</h5>
              <time className='text-neutral-500 text-sm font-semibold lg:text-base' dateTime={joinedData}>{joinedData}</time>
            </article>
          )}
          <button
            className='text-white'
            type='button'
            onClick={onClose}
          >
            <IconClose />
          </button>
        </div>
      </section>
    </>
  )

  // return (
  //   <>
  //     <ConfirmModal
  //       isOpen={confirmOpen}
  //       onClose={() => setConfirmOpen(false)}
  //     />
  //     <Transition.Root show={isOpen} as={Fragment}>
  //       <Dialog as='div' className='relative z-50' onClose={onClose}>
  //         <Transition.Child
  //           as={Fragment}
  //           enter='ease-out duration-500'
  //           enterFrom='opacity-0'
  //           enterTo='opacity-100'
  //           leave='ease-out duration-500'
  //           leaveFrom='opacity-100'
  //           leaveTo='opacity-0'
  //         >
  //           <div className='fixed inset-0 bg-black bg-opacity-40' />
  //         </Transition.Child>
  //         <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
  //           <Transition.Child
  //             as={Fragment}
  //             enter='transform transition ease-in-out duration-500'
  //             enterFrom='translate-x-full'
  //             enterTo='translate-x-0'
  //             leave='transform transition ease-in-out duration-500'
  //             leaveTo='translate-x-full'
  //           >
  //             <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
  //               <div className='flex flex-col items-center justify-center h-full overflow-y-scroll bg-white py-6 shadow-xl'>
  //                 <button
  //                   type='button'
  //                   onClick={onClose}
  //                 >
  //                   Close panel
  //                 </button>
  //                 {data.isGroup ? (
  //                   <AvatarGroup users={data.users} />
  //                 ) : (
  //                   <Avatar user={otherUser} />
  //                 )
  //                 }
  //                 <strong>{title}</strong>
  //                 <p>{statusText}</p>
  //                 <div className='cursor-pointer' onClick={() => setConfirmOpen(true)}>
  //                   <div>delete conversation</div>
  //                 </div>
  //                 {/* Information members group */}
  //                 {data.isGroup && (
  //                   <div>
  //                     <dt className='text-sm sm:w-40 sm:flex-shrink-0'>Emails</dt>
  //                     <dd className='mt-2 text-sm sm:col-span-2'>
  //                       {data.users.map((user) => user.email).join(', ')}
  //                     </dd>
  //                   </div>
  //                 )}
  //                 {/* Information no group */}
  //                 {!data.isGroup && (
  //                   <div>
  //                     <dt className='text-sm sm:w-40 sm:flex-shrink-0'>Email</dt>
  //                     <dd className='mt-2 text-sm sm:col-span-2'>{otherUser.email}</dd>
  //                   </div>
  //                 )}
  //                 {!data.isGroup && (
  //                   <>
  //                     <hr />
  //                     <dt className='text-sm sm:w-40 sm:flex-shrink-0'>Joined</dt>
  //                     <dd className='mt-2 text-sm sm:col-span-2'>
  //                       <time dateTime={joinedData}>{joinedData}</time>
  //                     </dd>
  //                   </>
  //                 )}
  //               </div>
  //             </Dialog.Panel>
  //           </Transition.Child>
  //         </div>
  //       </Dialog>
  //     </Transition.Root>
  //   </>
  // )
}
export default ProfileDrawer
