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
      className='w-full text-lg font-normal bg-transparent outline-0 text-white placeholder:text-neutral-500 2xl:text-2xl'
      id={id}
      type={type}
      {...register(id,{ required })}
      placeholder={placeholder}
    />
  )
}
export default MessageInput
