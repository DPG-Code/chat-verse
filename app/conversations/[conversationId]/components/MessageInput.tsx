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
      className='p-2 w-full'
      id={id}
      type={type}
      {...register(id,{ required })}
      placeholder={placeholder}
    />
  )
}
export default MessageInput
