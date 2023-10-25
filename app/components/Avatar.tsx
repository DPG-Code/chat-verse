'use client'

import { User } from "@prisma/client"
import useActiveList from "../hooks/useActiveList"

interface AvatarProps {
  user?: User
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  // Get the members list from the useActiveList store
  const { members } = useActiveList()
  // Check if the user is active (in the members list)
  const isActive = members.indexOf(user?.email!) !== -1

  return (
    <div className='relative'>
      <div className='w-8 h-8 rounded-full overflow-hidden relative lg:w-12 lg:h-12'>
        <img
          className='w-full h-full'
          width='48'
          height='48'
          alt='Avatar'
          src={user?.image || '/images/no-profile-picture.png'}
        />
      </div>
      {
        isActive && (
          <span className='w-2 h-2 bg-green-500 ring-2 ring-neutral-950 rounded-full absolute block top-0 right-0 lg:w-3 lg:h-3'></span>
        )
      }
    </div>
  )
}
export default Avatar
