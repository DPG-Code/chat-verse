'use client'

import { motion } from "framer-motion"

import { IconClose } from "./Icons"

interface ModalProps {
  isOpen?: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen,onClose,children }) => {
  const variantsContainer = {
    open: { display: 'grid' },
    closed: { display: 'none' },
  }

  const variantsModal = {
    open: { scale: 1 },
    closed: { scale: 0 },
  }

  return (
    <motion.div
      className={`${isOpen ? 'grid' : 'hidden'} w-full h-full min-h-[560px] backdrop-blur grid place-content-center fixed top-0 right-0 z-40 lg:min-h-[620px]`}
      animate={isOpen ? "open" : "closed"}
      variants={variantsContainer}
    >
      <motion.div
        id='modal'
        className='bg-neutral-950 rounded-2xl shadow-2xl flex items-center justify-center relative'
        animate={isOpen ? "open" : "closed"}
        variants={variantsModal}
      >
        <button
          type='button'
          className='text-white absolute top-6 right-6 z-50'
          onClick={onClose}
        >
          <IconClose />
        </button>
        {children}
      </motion.div>
    </motion.div>
  )
}
export default Modal
