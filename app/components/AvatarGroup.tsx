'use client'

import { User } from "@prisma/client"
import Image from "next/image"

interface AvatarGoupProps {
  users: User[]
}

const AvatarGroup: React.FC<AvatarGoupProps> = ({ users = [] }) => {
  const slicedMembers = users.slice(0,4)

  return (
    <div className='w-7 h-7 grid grid-cols-2 grid-rows-2 rounded-full overflow-hidden lg:w-12 lg:h-12'>
      {
        slicedMembers.map((member) => (
          <div key={member.id} className='w-full h-full relative'>
            <Image
              className='w-full h-full'
              width='48'
              height='48'
              alt='group avatar'
              src={member?.image || '/images/no-profile-picture.png'}
            />
          </div>
        ))
      }
    </div>
  )
}
export default AvatarGroup
