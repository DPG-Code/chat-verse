'use client'

import clsx from "clsx"
import { FieldErrors,FieldValues,UseFormRegister } from "react-hook-form"

interface InputProps {
  label: string
  id: string
  type?: string
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  disabled?: boolean
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={id}
        disabled={disabled}
        {...register(id,{ required })}
        className={clsx(
          'w-full ring-1 ring-inset ring-gray-300 focus:ring-black',
          errors[id] && 'focus:ring-rose-500',
          disabled && 'opacity-50 cursor-default'
        )}
      />
    </div>
  )
}
export default Input
