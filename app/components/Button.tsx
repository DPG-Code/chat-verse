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
  test?: string
}

const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
  test
}) => {
  return (
    <button
      data-test-id={`${test && test}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'py-2 px-10 border-0 outline-0 font-medium flex items-center justify-center gap-2 rounded-full lg:text-xl lg:py-3 lg:px-16 lg:gap-3',
        disabled && 'opacity-50 cursor-default',
        fullWidth && 'w-full',
        secondary && 'border-2 border-neutral-900 text-white hover:bg-neutral-900 transition',
        danger && 'bg-red-800 text-white hover:bg-red-700 transition',
        !secondary && !danger && 'bg-violet-900 shadow-[0px_0px_32px_#4c1d95] text-lg text-white transition'
      )}
    >
      {children}
    </button>
  )
}
export default Button
