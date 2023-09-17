'use client'

import { useCallback,useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { User } from "@prisma/client"

import Avatar from "@/app/components/Avatar"

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
      {isLoading && (
        <p>loading...</p>
      )}
      <div
        className='p-4 w-full min-w-[220px] cursor-pointer border-2 border-neutral-900 flex items-center justify-start rounded-xl hover:bg-neutral-900 gap-6 transition lg:w-96'
        onClick={handleClick}
      >
        <Avatar user={data} />
        <p className='text-xl text-white font-medium truncate lg:text-2xl'>{data.name}</p>
      </div>
    </>
  )
}
export default UserBox
