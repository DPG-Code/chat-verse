'use client'

import clsx from "clsx"
import { FieldErrors,FieldValues,UseFormRegister } from "react-hook-form"

interface InputProps {
  label?: string
  placeholder?: string
  id: string
  type?: string
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  disabled?: boolean
  test?: string
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  id,
  type,
  required,
  register,
  errors,
  disabled,
  test
}) => {
  return (
    <div className='flex flex-col'>
      {
        label && <label className='mb-1 text-neutral-400 font-semibold' htmlFor={id}>
          {label}
        </label>
      }
      <input
        data-test-id={`${test && test}`}
        id={id}
        type={type}
        autoComplete={id}
        disabled={disabled}
        {...register(id,{ required })}
        placeholder={placeholder}
        className={clsx(
          'py-2 px-6 border-0	outline-0 w-full min-w-[260px] text-lg font-medium bg-neutral-900 text-white placeholder:text-neutral-400 rounded-xl lg:w-[420px]',
          errors[id] && 'focus:ring-offset-2 focus:ring-offset-red-800',
          disabled && 'opacity-50 cursor-default'
        )}
      />
    </div>
  )
}
export default Input
