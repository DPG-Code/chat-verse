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
      <div className='w-72 h-72 grid place-content-center lg:w-[420px] lg:h-[420px]'>
        <Image
          className='w-auto h-auto object-contain'
          width='420'
          height='420'
          alt='chat'
          src={src}
        />
      </div>
    </Modal>
  )
}
export default ImageModal
