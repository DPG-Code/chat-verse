'use client'

import { useCallback,useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { User } from "@prisma/client"

import Avatar from "@/app/components/Avatar"
import { IconLoader } from "@/app/components/Icons"

interface UserBoxProps {
  data: User
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter()
  const [isLoading,setIsLoading] = useState(false)

  // Handle click event to create a conversation with the user
  const handleClick = useCallback(() => {
    setIsLoading(true)

    axios.post('/api/conversations',{ userId: data.id })
      .then((data) => router.push(`/conversations/${data.data.id}`))
      .finally(() => setIsLoading(false))
  },[data.id,router])

  return (
    <>
      <div
        className='p-4 w-full min-w-[220px] border-l-[6px] border-transparent hover:border-white cursor-pointer flex items-center justify-start hover:bg-white/5 gap-6 transition relative 2xl:px-6 2xl:py-5'
        onClick={handleClick}
      >
        {isLoading && (
          <div
            className='text-fuchsia-700 absolute right-4 z-30'
          >
            <IconLoader />
          </div>
        )}
        <Avatar user={data} />
        <p className='text-lg text-white font-normal truncate'>{data.name}</p>
      </div>
    </>
  )
}
export default UserBox
