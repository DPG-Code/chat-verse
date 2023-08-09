'use client'

import { User } from "@prisma/client"
import Image from "next/image"

interface AvatarGoupProps {
  users: User[]
}

const AvatarGroup: React.FC<AvatarGoupProps> = ({ users = [] }) => {
  const slicedMembers = users.slice(0,4)

  return (
    <div className='w-6 h-6 grid grid-cols-2 grid-rows-2 rounded-full overflow-hidden'>
      {
        slicedMembers.map((member) => (
          <div key={member.id} className='w-full h-full relative'>
            <Image
              fill
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
