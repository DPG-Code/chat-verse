'use client'

import { User } from "@prisma/client"

import UserBox from "./UserBox"

interface UserListProps {
  items: User[]
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  return (
    <div id='user-list' data-test-id='test-user-list' className='h-full w-full px-6 pt-12 flex flex-col gap-6 lg:px-12 lg:w-auto lg:gap-10'>
      <h3 className='text-white text-2xl font-bold flex gap-4 z-20 lg:text-4xl'>
        People <span className='text-neutral-500'>{items.length > 99 ? '(+99)' : `(${items.length})`}</span>
      </h3>
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
