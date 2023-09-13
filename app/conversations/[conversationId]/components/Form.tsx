'use client'

import axios from "axios"
import { FieldValues,SubmitHandler,useForm } from "react-hook-form"
import useConversation from "@/app/hooks/useConversation"
import { CldUploadButton } from "next-cloudinary"

import MessageInput from "./MessageInput"
import { IconPhoto,IconSend } from "@/app/components/Icons"

const Form = () => {
  const { conversationId } = useConversation()

  const { register,handleSubmit,setValue,formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  })

  // Submit handler for sending a message
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message','',{ shouldValidate: true })
    axios.post('/api/messages',{
      ...data,
      conversationId: conversationId
    })
  }

  // Upload handler for uploading an image
  const handleUpload = (result: any) => {
    axios.post('/api/messages',{
      image: result?.info?.secure_url,
      conversationId
    })
  }

  return (
    <footer className='p-4 w-full flex gap-4'>
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset='xfby10x8'
      >
        <IconPhoto />
      </CldUploadButton>
      <form className='w-full flex gap-2' onSubmit={handleSubmit(onSubmit)}>
        <MessageInput
          id='message'
          register={register}
          errors={errors}
          required
          placeholder='Write a message'
        />
        <button type='submit'>
          <IconSend />
        </button>
      </form>
    </footer>
  )
}
export default Form
