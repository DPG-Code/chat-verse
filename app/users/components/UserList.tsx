'use client'

import { User } from "@prisma/client"

import UserBox from "./UserBox"

interface UserListProps {
  items: User[]
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  return (
    <div className='p-12 flex flex-col gap-10'>
      <h3 className='text-2xl font-bold lg:text-4xl'>People</h3>
      <section className='w-full flex flex-col gap-6'>
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
