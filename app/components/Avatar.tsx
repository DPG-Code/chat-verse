'use client'

import { User } from "@prisma/client"
import Image from "next/image"
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
      <div className='w-7 h-7 rounded-full overflow-hidden relative lg:w-12 lg:h-12'>
        <Image
          alt='Avatar'
          src={user?.image || '/images/no-profile-picture.png'}
          fill
        />
      </div>
      {
        isActive && (
          <span className='w-2 h-2 bg-green-500 ring-2 ring-white rounded-full absolute block top-0 right-0 lg:w-3 lg:h-3'></span>
        )
      }
    </div>
  )
}
export default Avatar
