'use client'

import { User } from "@prisma/client"

import UserBox from "./UserBox"

interface UserListProps {
  items: User[]
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  return (
    <div id='user-list' className='h-full w-full px-6 pt-12 flex flex-col gap-6 lg:px-12 lg:w-auto lg:gap-10'>
      <h3 className='text-white text-2xl font-bold lg:text-4xl'>People</h3>
      <section className='h-full w-full flex flex-col overflow-y-scroll gap-4 z-20'>
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
