'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User } from "@prisma/client"
import { FieldValues,SubmitHandler,useForm } from "react-hook-form"
import axios from "axios"
import { toast } from "react-hot-toast"

import { CldUploadButton } from "next-cloudinary"
import Image from "next/image"

import Modal from "../Modal"
import Input from "../inputs/Input"
import Button from "../Button"

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center">
          <h2>Profile</h2>
          <p>Edit your public information</p>
          <Input
            disabled={isLoading}
            label="name"
            id="name"
            errors={errors}
            register={register}
            required
          />
          <div className="flex flex-col gap-2">
            <label>Photo</label>
            <Image
              width='48'
              height='48'
              alt="Avatar"
              src={image || currentUser.image || '/images/no-profile-picture.png'}
            />
            <CldUploadButton
              options={{ maxFiles: 1 }}
              onUpload={handleUpload}
              uploadPreset="xfby10x8"
            >
              <Button
                disabled={isLoading}
                secondary
                type="button"
              >
                Change
              </Button>
            </CldUploadButton>
          </div>
          <div className="flex gap-2">
            <Button
              disabled={isLoading}
              secondary
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              type="submit"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
export default SettingsModal
