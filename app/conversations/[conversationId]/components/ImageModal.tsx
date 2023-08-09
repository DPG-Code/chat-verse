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
      <div className='w-80 h-80'>
        <Image
          fill
          alt='chat'
          src={src}
          className='object-cover'
        />
      </div>
    </Modal>
  )
}
export default ImageModal
