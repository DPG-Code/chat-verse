'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User } from "@prisma/client"
import axios from "axios"
import { FieldValues,SubmitHandler,useForm } from "react-hook-form"
import { toast } from "react-hot-toast"

import Modal from "@/app/components/Modal"
import Input from "@/app/components/inputs/Input"
import Select from "@/app/components/inputs/Select"
import Button from "@/app/components/Button"
import { IconPlus } from "@/app/components/Icons"

interface GroupChatModalProps {
  users: User[]
  isOpen?: boolean
  onClose: () => void
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({ users,isOpen,onClose }) => {
  const router = useRouter()
  const [isLoading,setIsLoading] = useState(false)

  // Initialize useForm hook for form handling
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: []
    }
  })

  // Get the selected members from the form
  const members = watch('members')

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    // Send a POST request to create a group chat
    axios.post('/api/conversations',{
      ...data,
      isGroup: true
    })
      .then(() => {
        // Refresh the router and close the modal
        router.refresh()
        onClose()
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false))
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <form
        className='py-12 px-6 max-w-[320px] text-center flex flex-col items-center justify-center gap-6 z-20 relative lg:p-16 lg:max-w-[560px] lg:gap-8'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className='text-center text-white text-3xl font-bold leading-7 lg:text-5xl'>Create a chat group</h2>
        <p className='text-center text-base text-neutral-400 font-medium max-w-[220px] lg:text-xl lg:max-w-none'>Create a chat with more than 2 people</p>
        <Input
          register={register}
          placeholder='Group name'
          id='name'
          disabled={isLoading}
          required
          errors={errors}
        />
        <Select
          label='Members'
          disabled={isLoading}
          options={users.map((user) => ({
            value: user.id,
            label: user.name
          }))}
          onChange={(value) => setValue('members',value,{
            shouldValidate: true
          })}
          value={members}
        />
        <footer className='flex items-center justify-center gap-2 lg:gap-6'>
          <Button
            type='button'
            disabled={isLoading}
            secondary
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            disabled={isLoading}
          >
            Create
            <IconPlus />
          </Button>
        </footer>
      </form>
    </Modal>
  )
}
export default GroupChatModal

