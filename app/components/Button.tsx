'use client'

import clsx from "clsx"

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined
  fullWidth?: boolean
  children?: React.ReactNode
  onClick?: () => void
  secondary?: boolean
  danger?: boolean
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'py-2.5 px-8 border-0 outline-0 font-medium flex items-center justify-center gap-2 rounded-xl lg:text-xl lg:px-12 lg:gap-3',
        disabled && 'opacity-50 cursor-default',
        fullWidth && 'w-full',
        secondary && 'border-2 border-neutral-900 text-white hover:bg-neutral-900 transition',
        danger && 'bg-red-800 text-white hover:bg-red-700 transition',
        !secondary && !danger && 'bg-fuchsia-800 text-lg text-white hover:bg-fuchsia-600 transition'
      )}
    >
      {children}
    </button>
  )
}
export default Button
