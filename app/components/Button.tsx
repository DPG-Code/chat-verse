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
        'py-2 px-8 outline-0 font-medium flex items-center justify-center gap-2 rounded-lg lg:text-xl lg:py-3 lg:px-16 lg:gap-3 xl:rounded-xl',
        disabled && 'opacity-50 cursor-default',
        fullWidth && 'w-full',
        secondary && 'border border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800 transition',
        danger && 'border border-red-800 bg-red-800 text-white hover:bg-red-700 transition',
        !secondary && !danger && 'border border-white bg-white hover:shadow-[0px_0px_14px_#ffffff] text-neutral-950 transition'
      )}
    >
      {children}
    </button>
  )
}
export default Button
