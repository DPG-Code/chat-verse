'use client'

import { IconClose } from "./Icons"

interface ModalProps {
  isOpen?: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen,onClose,children }) => {
  return (
    <div
      className={`${isOpen ? 'block' : 'hidden'} w-full h-full min-h-[560px] backdrop-blur grid place-content-center fixed top-0 right-0 z-40 lg:min-h-[620px]`}
    >
      <div id='modal' className='bg-neutral-950 rounded-2xl shadow-2xl relative overflow-hidden'>
        <button
          type='button'
          className='text-white absolute top-6 right-6 z-50'
          onClick={onClose}
        >
          <IconClose />
        </button>
        {children}
      </div>
    </div>
  )
}
export default Modal
