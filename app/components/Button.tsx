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
        'py-2.5 px-8 border-0 outline-0 font-semibold flex items-center justify-center gap-2 rounded-xl lg:text-xl lg:px-12',
        disabled && 'opacity-50 cursor-default',
        fullWidth && 'w-full',
        secondary && 'bg-neutral-800 text-white',
        danger && 'bg-red-800 text-white',
        !secondary && !danger && 'bg-white text-lg text-black'
      )}
    >
      {children}
    </button>
  )
}
export default Button
