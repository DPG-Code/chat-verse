'use client'

import { useCallback,useState } from "react"
import { useRouter } from "next/navigation"
import useConversation from "@/app/hooks/useConversation"
import axios from "axios"
import { toast } from "react-hot-toast"
// import { Dialog } from "@headlessui/react"

import Modal from "@/app/components/Modal"
import Button from "@/app/components/Button"

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
      <section className='flex flex-col items-center justify-center gap-4'>
        <h5 className='text-2xl font-semibold'>Delete conversation</h5>
        <p className='text-sm text-gray-500'>Are you sure you want to delete this conversation? This action cannot be undone.</p>
        <footer className='w-full flex items-center justify-center gap-4'>
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
          </Button>
        </footer>
      </section>
    </Modal>
  )
}
export default ConfirmModal
