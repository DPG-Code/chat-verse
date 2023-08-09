'use client'

import { User } from "@prisma/client"
import Image from "next/image"

interface AvatarProps {
  user?: User
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div className='relative'>
      <div className='w-6 h-6 rounded-full overflow-hidden relative'>
        <Image
          alt='Avatar'
          src={user?.image || '/images/no-profile-picture.png'}
          fill
        />
      </div>
      <span className='w-2 h-2 bg-green-500 ring-2 ring-white rounded-full absolute block top-0 right-0'></span>
    </div>
  )
}
export default Avatar
