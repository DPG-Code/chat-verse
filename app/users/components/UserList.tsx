'use client'

import { useState } from "react"
import { User } from "@prisma/client"

import UserBox from "./UserBox"
import { IconSearch } from "@/app/components/Icons"

interface UserListProps {
  items: User[]
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  const [filteredUsers,setFilteredUsers] = useState<User[]>(items)

  const filterUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase()
    const filtered = items.filter(user => user.name?.toLocaleLowerCase().includes(searchTerm))
    setFilteredUsers(filtered)
  }

  return (
    <div id='user-list' data-test-id='test-user-list' className='h-full w-full flex flex-col gap-6 lg:w-auto lg:gap-6 2xl:gap-10'>
      <header className='px-6 pt-6 w-full flex flex-col gap-6 2xl:px-8 2xl:pt-10 2xl:gap-10'>
        <div className='flex relative items-center'>
          <input
            className='py-2 px-6 border border-neutral-700 outline-0 w-full text-lg bg-neutral-900 text-white placeholder:text-neutral-500 rounded-xl 2xl:py-3 2xl:px-7 2xl:text-xl'
            type='text'
            placeholder='Search people...'
            onChange={filterUsers}
          />
          <IconSearch size='w-6 h-6 text-neutral-500 absolute right-6 2xl:right-7' />
        </div>
        <h3 className='text-white text-2xl font-semibold flex gap-4 z-20 lg:text-2xl 2xl:text-3xl'>
          People <span className='text-neutral-500'>{filteredUsers.length > 99 ? '(+99)' : `(${filteredUsers.length})`}</span>
        </h3>
      </header>
      <section className='h-full w-full flex flex-col overflow-y-scroll z-20 lg:w-96 2xl:w-[520px]'>
        {
          filteredUsers.map((item) => (
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
