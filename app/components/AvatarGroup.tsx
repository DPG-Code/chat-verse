'use client'

import { User } from "@prisma/client"

interface AvatarGoupProps {
  users: User[]
}

const AvatarGroup: React.FC<AvatarGoupProps> = ({ users = [] }) => {
  const slicedMembers = users.slice(0,4)

  return (
    <div className={`w-8 h-8 grid grid-cols-2 grid-rows-${slicedMembers.length === 3 ? '1' : '2'} rounded-full overflow-hidden lg:w-12 lg:h-12`}>
      {
        slicedMembers.map((member,index) => (
          <div key={member.id} className={`w-full h-full ${index === 2 && slicedMembers.length === 3 ? 'col-span-2 row-span-2' : ''}`}>
            <img
              className='w-full h-full object-cover'
              width='48'
              height='48'
              alt='group avatar'
              src={member?.image || '/images/no-profile-picture.webp'}
            />
          </div>
        ))
      }
    </div>
  )
}
export default AvatarGroup
