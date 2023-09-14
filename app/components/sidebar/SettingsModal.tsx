'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { FieldValues,SubmitHandler,useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import Image from "next/image"
import { CldUploadButton } from "next-cloudinary"
import { User } from "@prisma/client"

import Modal from "../Modal"
import Input from "../inputs/Input"
import Button from "../Button"
import { IconEdit } from "../Icons"

interface SettingsModalProps {
  isOpen?: boolean
  onClose: () => void
  currentUser: User
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen,onClose,currentUser }) => {
  const [isLoading,setIsLoading] = useState(false)
  const router = useRouter()

  // Form setup using the react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    // Initialize the form fields with the current user's data
    defaultValues: {
      name: currentUser.name,
      image: currentUser.image
    }
  })

  // Watch for changes in the 'image' field
  const image = watch('image')

  // Function to handle image upload and update the form field value
  const handleUpload = (result: any) => {
    setValue('image',result?.info?.secure_url,{
      shouldValidate: true
    })
  }

  // Function to handle form submission
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    // Send a request to the server to update the user's settings
    axios.post('/api/settings',data)
      .then(() => {
        router.refresh() // Refresh the router to reflect the updated user information
        onClose() // Close the modal after successful update
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className='text-center flex flex-col items-center justify-center gap-6' onSubmit={handleSubmit(onSubmit)}>
        <header className='text-center flex flex-col items-center justify-center gap-2'>
          <h2 className='text-3xl font-bold'>Profile</h2>
          <p className='text-lg text-gray-500 font-medium'>Edit your public information</p>
          <Input
            disabled={isLoading}
            label='Name'
            id='name'
            errors={errors}
            register={register}
            required
          />
        </header>
        <section className='flex flex-col items-center justify-center gap-4'>
          <label className='text-2xl font-semibold'>Photo</label>
          <Image
            className='rounded-full object-cover'
            width='96'
            height='96'
            alt='Avatar'
            src={image || currentUser.image || '/images/no-profile-picture.png'}
          />
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={handleUpload}
            uploadPreset='xfby10x8'
          >
            <IconEdit />
          </CldUploadButton>
        </section>
        <footer className='flex items-center justify-center gap-2'>
          <Button
            disabled={isLoading}
            secondary
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            type='submit'
          >
            Save
          </Button>
        </footer>
      </form>
    </Modal>
  )
}
export default SettingsModal
