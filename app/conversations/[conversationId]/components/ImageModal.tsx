'use client'

import Modal from "@/app/components/Modal"
import Image from "next/image"

interface ImageModalProps {
  isOpen?: boolean
  src?: string | null
  onClose: () => void
}

// Image full view
const ImageModal: React.FC<ImageModalProps> = ({ isOpen,src,onClose }) => {
  if (!src) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='w-72 h-72 lg:w-[420px] lg:h-[420px]'>
        <Image
          fill
          alt='chat'
          src={src}
          className='w-full object-contain'
        />
      </div>
    </Modal>
  )
}
export default ImageModal
