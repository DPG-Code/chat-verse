'use client'

import { FieldErrors,FieldValues,UseFormRegister } from "react-hook-form"

interface MessageInputProps {
  id: string
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  type?: string
  required?: boolean
  placeholder?: string
}

const MessageInput: React.FC<MessageInputProps> = ({
  id,
  register,
  errors,
  type,
  required,
  placeholder
}) => {
  return (
    <input
      className='py-2 px-6 border-0 outline-0 w-full text-lg font-medium backdrop-blur bg-neutral-300/5 text-white placeholder:text-neutral-400 rounded-full lg:text-xl lg:py-3 lg:px-8 xl:py-4'
      id={id}
      type={type}
      {...register(id,{ required })}
      placeholder={placeholder}
    />
  )
}
export default MessageInput
