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
      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <h2>Create a chat group</h2>
        <p>Create a chat with more than 2 people</p>
        <Input
          register={register}
          label='name'
          id='name'
          disabled={isLoading}
          required
          errors={errors}
        />
        <Select
          label='members'
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
        <div>
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
          </Button>
        </div>
      </form>
    </Modal>
  )
}
export default GroupChatModal

