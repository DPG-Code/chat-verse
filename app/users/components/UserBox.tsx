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
        className='p-4 w-full min-w-[220px] cursor-pointer flex items-center justify-start rounded-full backdrop-blur hover:bg-white/5 gap-6 transition relative lg:w-96'
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
        <p className='text-xl text-white font-normal truncate lg:text-2xl'>{data.name}</p>
      </div>
    </>
  )
}
export default UserBox
