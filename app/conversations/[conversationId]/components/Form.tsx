'use client'

import axios from "axios"
import { FieldValues,SubmitHandler,useForm } from "react-hook-form"
import useConversation from "@/app/hooks/useConversation"
import { CldUploadButton } from "next-cloudinary"

import MessageInput from "./MessageInput"

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
    <div className="w-full flex">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="xfby10x8"
      >
        <p>photo</p>
      </CldUploadButton>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MessageInput
          id='message'
          register={register}
          errors={errors}
          required
          placeholder='Write a message'
        />
        <button type="submit">
          send
        </button>
      </form>
    </div>
  )
}
export default Form