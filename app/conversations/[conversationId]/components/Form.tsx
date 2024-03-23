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
    <footer className='mt-auto py-4 px-6 w-full text-white flex items-center relative lg:py-6 lg:px-12 2xl:py-8 2xl:p-12'>
      <form className='py-2 px-3 w-full flex items-center border border-neutral-700 outline-0 bg-neutral-900 rounded-xl gap-4 lg:gap-6 lg:py-3 lg:px-6' onSubmit={handleSubmit(onSubmit)}>
        <MessageInput
          id='message'
          register={register}
          errors={errors}
          required
          placeholder='Write a message'
        />
        <aside className='flex items-center gap-4 lg:gap-6'>
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
          <button data-test-id='message-form-button' className='py-2 px-4 bg-white text-neutral-900 rounded-lg lg:px-6' type='submit'>
            <IconSend size='w-4 h-4 lg:w-6 lg:h-6 xl:w-7 xl:h-7' />
          </button>
        </aside>
      </form>
    </footer>
  )
}
export default Form
