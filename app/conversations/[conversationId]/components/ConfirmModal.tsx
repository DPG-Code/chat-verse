'use client'

import { useCallback,useState } from "react"
import { useRouter } from "next/navigation"
import useConversation from "@/app/hooks/useConversation"
import axios from "axios"
import { toast } from "react-hot-toast"
import { Dialog } from "@headlessui/react"

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
      <div className="sm:flex sm:items-start">
        <div className="flex flex-col">
          <Dialog.Title as="h3">
            Delete conversation
          </Dialog.Title>
          <p>Are you sure you want to delete this conversation? This action cannot be undone.</p>
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
        </div>
      </div>
    </Modal>
  )
}
export default ConfirmModal
