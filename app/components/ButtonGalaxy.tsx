'use client'

import clsx from "clsx"

interface ButtonGalaxyProps {
  type?: 'button' | 'submit' | 'reset' | undefined
  fullWidth?: boolean
  children?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  test?: string
}

const ButtonGalaxy: React.FC<ButtonGalaxyProps> = ({
  type,
  fullWidth,
  children,
  onClick,
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
        'button-galaxy shadow-[0px_0px_32px_#4c1d95] py-1.5 px-10 border-2 border-violet-700 outline-0 font-medium text-lg text-white flex items-center justify-center gap-2 rounded-full lg:text-xl lg:py-3 lg:px-16 lg:gap-3 xl:border-4',
        disabled && 'opacity-50 cursor-default',
        fullWidth && 'w-full'
      )}
    >
      {children}
    </button>
  )
}
export default ButtonGalaxy
