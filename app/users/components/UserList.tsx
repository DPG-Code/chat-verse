'use client'

import { User } from "@prisma/client"

import UserBox from "./UserBox"

interface UserListProps {
  items: User[]
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  return (
    <div className='h-full p-12 flex flex-col gap-6 lg:gap-10'>
      <h3 className='text-white text-2xl font-bold lg:text-4xl'>People</h3>
      <section className='h-full w-full flex flex-col overflow-y-scroll'>
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
