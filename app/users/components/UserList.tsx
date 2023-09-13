'use client'

import { User } from "@prisma/client"

import UserBox from "./UserBox"

interface UserListProps {
  items: User[]
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  return (
    <div className='p-4 flex flex-col items-center gap-4'>
      <h3 className='text-xl font-bold'>People</h3>
      <section className='flex flex-col gap-3'>
        {
          items.map((item) => (
            <UserBox
              key={item.id}
              data={item}
            />
          ))
        }
      </section>
    </div>
  )
}
export default UserList
