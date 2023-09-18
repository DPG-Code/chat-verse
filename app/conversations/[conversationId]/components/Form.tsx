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
    <footer className='mt-auto py-4 px-6 w-full text-white flex gap-6 lg:p-12 lg:gap-12'>
      <CldUploadButton
        options={{
          maxFiles: 1,
          styles: {
            palette: {
              window: "#0A0A0A",
              windowBorder: "#525252",
              tabIcon: "#FFFFFF",
              menuIcons: "#FFFFFF",
              textDark: "#000000",
              textLight: "#FFFFFF",
              link: "#FFFFFF",
              action: "#FFFFFF",
              inactiveTabIcon: "#525252",
              error: "#ED4344",
              inProgress: "#7E22CE",
              complete: "#22C55E",
              sourceBg: "#0A0A0A"
            },
            fonts: {
              default: null,
              "'Outfit', sans-serif": {
                url: "https://fonts.googleapis.com/css?family=Outfit",
                active: true
              }
            }
          }
        }}
        onUpload={handleUpload}
        uploadPreset='xfby10x8'
      >
        <IconPhoto />
      </CldUploadButton>
      <form className='w-full flex gap-6 lg:gap-12' onSubmit={handleSubmit(onSubmit)}>
        <MessageInput
          id='message'
          register={register}
          errors={errors}
          required
          placeholder='Write a message'
        />
        <button className='text-white' type='submit'>
          <IconSend />
        </button>
      </form>
    </footer>
  )
}
export default Form
