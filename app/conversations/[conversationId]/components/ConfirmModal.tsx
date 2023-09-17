'use client'

import { useCallback,useState } from "react"
import { useRouter } from "next/navigation"
import useConversation from "@/app/hooks/useConversation"
import axios from "axios"
import { toast } from "react-hot-toast"
// import { Dialog } from "@headlessui/react"

import Modal from "@/app/components/Modal"
import Button from "@/app/components/Button"
import { IconTrash } from "@/app/components/Icons"

interface ConfirmModalProps {
  isOpen?: boolean
  onClose: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen,onClose }) => {
  const router = useRouter()
  const { conversationId } = useConversation()
  const [isLoading,setIsLoading] = useState(false)

  // Function to handle deletion of conversation
  const onDelete = useCallback(() => {
    setIsLoading(true)
    // Send delete request to the server
    axios.delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose()
        router.push('/conversations') // Redirect to conversations list
        router.refresh()// Refresh the router to update the UI
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false))
  },[conversationId,onClose,router])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <section className='py-12 px-6 max-w-[320px] flex flex-col items-center justify-center gap-3 z-20 relative lg:p-16 lg:max-w-[560px] lg:gap-4'>
        <h5 className='text-white text-2xl text-center font-semibold lg:text-5xl'>Delete conversation</h5>
        <p className='text-center text-xs text-neutral-400 lg:text-xl'>Are you sure you want to delete this conversation? This action cannot be undone.</p>
        <footer className='mt-2 w-full text-white flex items-center justify-center gap-2 lg:mt-4 lg:gap-6'>
          <Button
            disabled={isLoading}
            secondary
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            danger
            onClick={onDelete}
          >
            Delete
            <IconTrash />
          </Button>
        </footer>
      </section>
    </Modal>
  )
}
export default ConfirmModal
