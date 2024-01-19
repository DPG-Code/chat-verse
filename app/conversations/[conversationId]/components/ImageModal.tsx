'use client'

import Modal from "@/app/components/Modal"

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
      <div className='p-6 w-72 h-72 flex items-center justify-center lg:w-[560px] lg:h-[560px]'>
        <img
          className='w-auto h-full object-contain rounded-xl z-50'
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
